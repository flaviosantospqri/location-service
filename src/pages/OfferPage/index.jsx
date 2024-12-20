import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { query, startAfter } from "firebase/database";
import { db } from "../../services/firebase";
import { getDocs, limit, orderBy, where, collection } from "firebase/firestore";
import { ListingItem, Spinner } from "../../components";

const Offers = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        
        console.log(lastVisible.data)
        setLastFetchListing(lastVisible.data());

        const listingsData = querySnap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setListings(listingsData);
        setLoading(false);
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    };

    fetchListings();
  }, []);

  const onFetchMoreListing = async () => {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];

      setLastFetchListing(lastVisible);

      const listingsData = querySnap.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setListings((prevListings) => [...prevListings, ...listingsData]);
    } catch (error) {
      console.error("Error in onFetchMoreListing:", error);
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl font-bold text-center mt-6 mb-6">Offers</h1>
      {loading ? (
        <Spinner />
      ) : listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastFetchListing && (
            <div className="flex justify-center items-center">
              <button
                className="bg-white px-3 py-1.5 text-gray-700 border
               border-gray-300 mb-6 mt-6 hover:border-slate-600 
               rounded transition duration-150 ease-in-out"
                onClick={onFetchMoreListing}
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>There are no current Offers</p>
      )}
    </div>
  );
};

export default Offers;
