import React from "react";

const ListingItem = ({ listing, id }) => {
  return (
    <div>
      <h2>{listing.name}</h2>
    </div>
  );
};

export default ListingItem;
