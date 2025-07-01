import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Women");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [productPrice, setProductPrice] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isBestseller, setIsBestseller] = useState(false);
  const [image1, setImages1] = useState(false);
  const [image2, setImages2] = useState(false);
  const [image3, setImages3] = useState(false);
  const [image4, setImages4] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSizeClick = (size) => {
    setSelectedSizes(
      (prevSelected) =>
        prevSelected.includes(size)
          ? prevSelected.filter((s) => s !== size) // Deselect if already selected
          : [...prevSelected, size] // Add to selection if not selected
    );
  };
 
 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("category", productCategory);
      formData.append("subcategory", subCategory);
      formData.append("price", productPrice);
      formData.append("sizes", JSON.stringify(selectedSizes));
      formData.append("bestseller", isBestseller);
      if (!image1) 
      {
        window.alert("Atleast add 1 Image");
      }
      else{

      
        formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
    
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData
      );
    

      if (response.data.sucess) {
        window.alert("Product added Successfully");
        setImages1(false);
        setImages2(false);
        setImages2(false);
        setImages3(false);
        setIsBestseller(false);
        setProductCategory("women");
        setProductDescription("");
        setProductName("");
        setProductPrice("");
        setSelectedSizes([]);
        setSubCategory("Topwear");
      }
    }
    } catch (error) {
      window.alert("Failed to add Product");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 w-full min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-8  w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <label className="flex flex-col items-center justify-center h-20 bg-gray-200 border rounded cursor-pointer">
            <input
              type="file" 
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setImages1(e.target.files[0]);
              }}
            />
            <span className="text-sm">{image1 ? image1.name : "Upload"}</span>
          </label>
          <label className="flex flex-col items-center justify-center h-20 bg-gray-200 border rounded cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setImages2(e.target.files[0]);
              }}
            />
            <span className="text-sm">{image2 ? image2.name : "Upload"}</span>
          </label>
          <label className="flex flex-col items-center justify-center h-20 bg-gray-200 border rounded cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setImages3(e.target.files[0]);
              }}
            />
            <span className="text-sm">{image3 ? image3.name : "Upload"}</span>
          </label>
          <label className="flex flex-col items-center justify-center h-20 bg-gray-200 border rounded cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setImages4(e.target.files[0]);
              }}
            />
            <span className="text-sm">{image4 ? image4.name : "Upload"}</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            value={productName}
            className="w-full p-2 border rounded"
            placeholder="Type here"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">
            Product Description
          </label>
          <textarea
            value={productDescription}
            className="w-full p-2 border rounded"
            placeholder="Write content here"
            rows="3"
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
            required
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">
              Product Category
            </label>
            <select
              value={productCategory}
              onChange={(e) => {
                setProductCategory(e.target.value);
              }}
              className="w-full p-2 border rounded"
            >
              <option>Women</option>
              <option>Men</option>
              <option>Kids</option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium">Sub Category</label>
            <select
              value={subCategory}
              onChange={(e) => {
                setSubCategory(e.target.value);
              }}
              className="w-full p-2 border rounded"
            >
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear </option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Product Price</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            className="w-full p-2 border rounded"
            placeholder="25"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Product Sizes
          </label>
          <div className="flex gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`px-4 py-2 border rounded ${
                  selectedSizes.includes(size)
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isBestseller}
              className="mr-2"
              onChange={(event) => {
                setIsBestseller(event.target.checked);
              }}
            />
            Add to bestseller
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M4 12h16"
                ></path>
              </svg>
              Adding,Please Wait.....
            </span>
          ) : (
            "ADD"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
