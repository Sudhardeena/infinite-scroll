import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import "./App.css";
import ProductItem from "./components/ProductItem/ProductItem";

function App() {
  const [productList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialFetch, setInitialFetch] = useState(true);
  const [pageNo, setPageNo] = useState(1);

  const fetchProductsList = async () => {
    // if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://fakestoreapi.in/api/products?page=${pageNo}&limit=8`
      );
      const jsonResponse = await response.json();
      const productList = jsonResponse.products;
      // console.log(productList);
      setProductsList((prev) => {
        // console.log(prev);
        return [...prev, ...productList];
      });
      if (initialFetch) {
        setInitialFetch(false);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e.message);
    }
  };

  console.log(productList);
  useEffect(() => {
    fetchProductsList();
  }, [pageNo]);

  const handleInfiniteLoading = () => {
    //height of the entire webpage
    const webpageHeight = document.documentElement.scrollHeight;
    //height of the viewport
    const viewportHeight = window.innerHeight;
    //height of page content we scrolled till now
    const scrolledContentHeight = document.documentElement.scrollTop;
    try {
      if (viewportHeight + scrolledContentHeight + 1 >= webpageHeight) {
        setPageNo((prev) => prev + 1);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteLoading);
    return () => window.removeEventListener("scroll", handleInfiniteLoading);
  }, []);

  return (
    <div className="page-container">
      <>
        {initialFetch && (
          <ThreeDots
            className="three-dots-loader"
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50% -50%)",
            }}
            wrapperClass=""
          />
        )}
        <ul className="product-list">
          {productList.map((each) => (
            <ProductItem productDetails={each} />
          ))}
        </ul>
        {!initialFetch && isLoading ? (
          <ThreeDots
            className="three-dots-loader"
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ position: "absolute", left: "50%", bottom: "50px" }}
            wrapperClass=""
          />
        ) : null}
      </>
    </div>
  );
}

export default App;

{
  /* <ThreeDots
          className="three-dots-loader"
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        /> */
}
