import React, { useEffect, useState } from "react";
import { Slider, Spinner } from "../../components";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";

const Home = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
        const querySnap = await getDocs(q);
        let itens = [];
        querySnap.forEach((doc) => {
          itens.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(itens);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <Slider listings={listings && listings} />
    </>
  );
};

export default Home;
