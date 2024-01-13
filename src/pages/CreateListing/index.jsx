import React, { useState } from "react";

const CreateListing = () => {
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
  } = formData;
  const onChange = () => {};
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create listing</h1>
      <form>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            onClick={onChange}
            value="rent"
            id="rent"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            onClick={onChange}
            value="sale"
            id="sale"
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
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
            id="no_parking"
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
            id="no_furnished"
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
        <label htmlFor="Name" className="text-lg mt-6 font-semibold mt-7">
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
            id="no_Offer"
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
