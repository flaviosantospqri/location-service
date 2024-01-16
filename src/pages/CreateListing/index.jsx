import { useState } from "react";
import { Spinner } from "../../components";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
const CreateListing = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [geoLocationEnable, setGeoLocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: [],
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;
  const onChange = (e) => {
    let verify = null;
    if (e.target.value === "true") {
      verify = true;
    }
    if (e.target.value === "false") {
      verify = false;
    }

    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: verify ?? e.target.value,
      }));
    }
  };
  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (parseInt(discountedPrice) >= parseInt(regularPrice)) {
      setLoading(false);
      toast.error("The discount can not be this value");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("There must be less than seven images");
      return;
    }
    let geolocation = {};
    let location;
    if (geoLocationEnable) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      console.log(data);

      if (location === undefined) {
        setLoading(false);
        toast.error("Please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing Created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  if (loading) {
    <Spinner />;
  }
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create listing</h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            onClick={onChange}
            value="sale"
            id="type"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-slate-600 text-white"
                : "bg-white text-black"
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            onClick={onChange}
            value="rent"
            id="type"
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-slate-600 text-white"
                : "bg-white text-black"
            }`}
          >
            Rent
          </button>
        </div>
        <label htmlFor="Name" className="text-lg mt-6 font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          onChange={onChange}
          maxLength="32"
          minLength="10"
          required
          className="w-full px-4 py-2 text-xl tex-gray-700
          bg-white border border-gray-300 rounded
          transition duration-150 ease-in-out
          focus:text-gray-700
          focus:bg-white
          focus:border-slate-600 mb-6"
        />
        <div className="flex space-x-6 mb-6 w-full">
          <div className="flex flex-col w-full">
            <p className="text-lg font-semibold mt-6">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150
              ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              onChange={onChange}
              min="1"
              max="10"
              required
            />
          </div>
          <div className="flex flex-col  w-full">
            <p className="text-lg font-semibold mt-6">bathrooms</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150
              ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              onChange={onChange}
              min="1"
              max="10"
              required
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold">Parking spot</p>
        <div className="flex">
          <button
            type="button"
            onClick={onChange}
            value={true}
            id="parking"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={onChange}
            value={false}
            id="parking"
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex">
          <button
            type="button"
            onClick={onChange}
            value={true}
            id="furnished"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={onChange}
            value={false}
            id="furnished"
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <label htmlFor="Name" className="text-lg mt-6 font-semibold">
          Address
        </label>
        <textarea
          type="text"
          id="address"
          value={address}
          placeholder="Address"
          onChange={onChange}
          required
          className="w-full px-4 py-2 text-xl tex-gray-700
          bg-white border border-gray-300 rounded
          transition duration-150 ease-in-out
          focus:text-gray-700
          focus:bg-white
          focus:border-slate-600 mb-6"
        />
        {!geoLocationEnable && (
          <div className="flex space-x-6 justify-start mb-6">
            <div>
              <p className="text-lg font-semibold">Latitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                required
                min="-90"
                max="90"
                className="w-full px-4 py-2 text-xl text-gray-700 
                bg-white border border-gray-300 rounded transition
                duration-150 ease-in-out focus:bg-white focus:text-gray-700
                focus:border-slate-600 text-center"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Longitude</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                required
                min="-90"
                max="90"
                className="w-full px-4 py-2 text-xl text-gray-700 
                bg-white border border-gray-300 rounded transition
                duration-150 ease-in-out focus:bg-white focus:text-gray-700
                focus:border-slate-600 text-center"
              />
            </div>
          </div>
        )}
        <label htmlFor="Name" className="text-lg font-semibold mt-7">
          Description
        </label>
        <textarea
          type="text"
          id="description"
          value={description}
          placeholder="Description"
          onChange={onChange}
          required
          className="w-full px-4 py-2 text-xl tex-gray-700
          bg-white border border-gray-300 rounded
          transition duration-150 ease-in-out
          focus:text-gray-700
          focus:bg-white
          focus:border-slate-600 mb-6"
        />
        <p className="text-lg font-semibold">Offer</p>
        <div className="flex">
          <button
            type="button"
            onClick={onChange}
            value={true}
            id="offer"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={onChange}
            value={false}
            id="offer"
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <div className="flex justify-center items-center w-full mb-6">
          <div className="w-full text-lg font-semibold">
            <p>Regular Price</p>
            <div className="w-full flex justify-center items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className="flex justify-center items-center w-full mb-6">
            <div className="w-full text-lg font-semibold">
              <p>Discount</p>
              <div className="w-full flex justify-center items-center space-x-6">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept="./jpg, jpng, .jpeg"
            multiple
            required
            className="w-full py-1.5 text-gray-700 bg-transparent rounded transition duration-150 ease-in-out focus:border-slate-600"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md
         hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
};

export default CreateListing;
