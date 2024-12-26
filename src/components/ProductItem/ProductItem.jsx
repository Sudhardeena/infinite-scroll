import React from "react";
import "./ProductItem.css";

const ProductItem = ({ productDetails }) => {
  const { title, image } = productDetails;
  return (
    <li className="product-item">
      <img className="product-image" src={image} alt={title} />
    </li>
  );
};

export default ProductItem;
