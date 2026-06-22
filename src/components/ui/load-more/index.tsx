import { useEffect, useState } from "react";
import Wrapper from "../../other/Wrapper";
import Card from "./Card";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
}

const LIMIT = 8;

const LoadMore = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [productData, setProductData] = useState<Product[]>([]);
  const [skipCount, setSkipCount] = useState(0);
  const [disableLoadMoreBtn, setDisableLoadMoreBtn] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${skipCount === 0 ? 0 : skipCount * LIMIT}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (data?.products) {
          setProductData((prev) => [...prev, ...data.products]);
          setError(null);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [skipCount]);

  useEffect(() => {
    if (productData && productData.length >= 100) {
      setDisableLoadMoreBtn(true);
    }
  }, [productData]);

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (loading) {
    return (
      <Wrapper bgColor="bg-indigo-200" isFlex>
        <p className="text-5xl font-semibold mt-10">Loading Module...</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper bgColor="bg-indigo-200" isFlex>
      <p className="text-5xl font-semibold mt-10">Load More Data</p>
      <div className="max-w-360 flex gap-5 flex-wrap justify-center">
        {productData && productData.length > 0 ? (
          productData.map((item) => (
            <Card
              key={item?.id}
              title={item?.title}
              description={truncateText(item?.description, 110)}
              imageUrl={item?.thumbnail}
              price={item?.price}
              discountPercentage={item?.discountPercentage}
            />
          ))
        ) : (
          <p>{error}</p>
        )}
      </div>
      <button
        className={`rounded-2xl py-3 px-6 bg-white/70 border border-white/20 active:scale-95 transition-all font-semibold cursor-pointer -mt-10 mb-10 ${disableLoadMoreBtn ? "opacity-50" : "opacity-100"}`}
        onClick={() => setSkipCount((prev) => prev + 1)}
        disabled={disableLoadMoreBtn || loading}
      >
        Load More
      </button>
      {disableLoadMoreBtn && (
        <p className="text-md mb-10 -mt-10">
          You have reached to end of the page. Total Products{" "}
          {productData.length}
        </p>
      )}
    </Wrapper>
  );
};

export default LoadMore;
