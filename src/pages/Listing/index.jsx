import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { Contact, Spinner } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaShare } from "react-icons/fa6";
import { FaLocationDot, FaSquareParking } from "react-icons/fa6";
import { IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa6";
import { GiSofa } from "react-icons/gi";
import { TbSofaOff } from "react-icons/tb";
import { BsSignNoParkingFill } from "react-icons/bs";

import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { getAuth } from "firebase/auth";

const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopy, setShareLinkCopied] = useState(false);
  const [landlordContact, setLandlordContact] = useState(false);
  const { listingId } = params;
  const auth = getAuth();
  const formatValue = (value) => {
    return new Intl.NumberFormat("en-HOSSDDG", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        navigation
        pagination={{ type: "bullets" }}
        effect="fade"
        autoplay={{ delay: 3000 }}
        slidesPerView={1}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center opacity-80"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopy && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-full z-10 bg-white py-2 px-2">
          Link Copied
        </p>
      )}
      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5 ">
        <div className="w-full">
          <p className="text-xl font-bold mb-3 text-blue-900">
            {listing.name} -{formatValue(listing.regularPrice)}
            {listing.type === "rent" ? " /month" : ""}
          </p>
          <p className="flex items-center space-x-5 mt-6 mb-3 font-semibold">
            <FaLocationDot className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>

            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                {formatValue(
                  parseFloat(listing.regularPrice) -
                    parseFloat(listing.discountedPrice)
                )}{" "}
                Discount
                {!listing.offer && <p>{formatValue(listing.regularPrice)}</p>}
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold"> Description - </span>
            {listing.description}
          </p>
          <ul className="w-full flex items-center space-x-10 font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <IoBedSharp className="text-lg mr-1" />
              {parseInt(listing.bedrooms) > 1
                ? `${listing.bedrooms} Beds`
                : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {parseInt(listing.bathrooms) > 1
                ? `${listing.bathrooms} Baths`
                : "1 Bath"}
            </li>
            {listing.parking ? (
              <li className="flex items-center whitespace-nowrap">
                <FaSquareParking className="text-lg mr-1" />
                Parking
              </li>
            ) : (
              <li className="flex items-center whitespace-nowrap">
                <BsSignNoParkingFill className="text-lg mr-1 text-red-700" />
                No Parking
              </li>
            )}
            {listing.furnished ? (
              <li className="flex items-center whitespace-nowrap">
                <GiSofa className="text-lg mr-1" />
                Furnished
              </li>
            ) : (
              <li className="flex items-center whitespace-nowrap">
                <TbSofaOff className="text-lg mr-1 text-red-700" />
                Not Furnished
              </li>
            )}
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !landlordContact && (
            <div className="mt-6">
              <button
                className="px-7 py-3 bg-blue-600 text-white
           font-medium tex-sm uppercase rounded shadow-md
            hover:bg-blue-700 hover:shadow-lg 
            focus:bg-blue-700 focus:shadow-lg 
            w-full text-center transition duration-150 ease-in-out"
                onClick={() => {
                  setLandlordContact(true);
                }}
              >
                Contact LandLord
              </button>
            </div>
          )}
          {landlordContact && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg-[400px] z-10 overflow-hidden"></div>
      </div>
    </main>
  );
};

export default Listing;
