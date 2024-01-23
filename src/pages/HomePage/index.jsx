import React, { useEffect, useState } from "react";
import { ListingItem, Slider, Spinner } from "../../components";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { toast } from "react-toastify";

const Home = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offerListing, setOfferListing] = useState(null);
  const [rentListing, setRentListing] = useState(null);
  const [saleListing, setSaleListing] = useState(null);

  const fetchListings = async (filter, limitValue) => {
    try {
      const docRef = collection(db, "listings");
      const q = query(
        docRef,
        filter,
        orderBy("timestamp", "desc"),
        limit(limitValue)
      );

      const querySnap = await getDocs(q);
      return querySnap.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Failure in load listings");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllListings = async () => {
      const allListings = await fetchListings({}, 5);
      setListings(allListings);
    };

    fetchAllListings();
  }, []);

  useEffect(() => {
    const fetchOfferListings = async () => {
      const offerListings = await fetchListings(where("offer", "==", true), 4);
      setOfferListing(offerListings);
    };

    fetchOfferListings();
  }, []);

  useEffect(() => {
    const fetchRentListings = async () => {
      const rentListings = await fetchListings(where("type", "==", "rent"), 4);
      setRentListing(rentListings);
    };

    fetchRentListings();
  }, []);

  useEffect(() => {
    const fetchRentListings = async () => {
      const saleListing = await fetchListings(where("type", "==", "sale"), 4);
      setSaleListing(saleListing);
    };

    fetchRentListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Slider listings={listings} />
      {offerListing && offerListing.length > 0 && (
        <div className="max-w-6xl mx-auto pt-4 space-x-6">
          <div className="m-2 mb-6 ">
            <h2 className="px-3 text-2xl mt-6">Recent Offers</h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {!loading &&
                offerListing.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
            </ul>
          </div>
        </div>
      )}
      {rentListing && rentListing.length > 0 && (
        <div className="max-w-6xl mx-auto pt-4 space-x-6">
          <div className="m-2 mb-6 ">
            <h2 className="px-3 text-2xl mt-6">Places for Rent</h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {!loading &&
                rentListing.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
            </ul>
          </div>
        </div>
      )}
      {saleListing && saleListing.length > 0 && (
        <div className="max-w-6xl mx-auto pt-4 space-x-6">
          <div className="m-2 mb-6 ">
            <h2 className="px-3 text-2xl mt-6">Places for Sale</h2>
            <Link to="/category/sale">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for sale
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {!loading &&
                saleListing.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
