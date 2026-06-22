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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${skipCount === 0 ? 0 : skipCount * LIMIT}`,
        );

        const data = await response.json();

        if (data && data?.products && data?.products.length) {
          setProductData((prev) => [...prev, ...data.products]);
          setLoading(false);
          setError(null);
        }
      } catch (e) {
        console.error(e?.message);
        setError(e?.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [skipCount]);

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (loading)
    <Wrapper bgColor="bg-indigo-200" isFlex>
      <p className="text-5xl font-semibold mt-10">Loading Module...</p>
    </Wrapper>;

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
        className="rounded-2xl py-3 px-6 bg-white/70 border border-white/20 active:scale-95 transition-all font-semibold cursor-pointer -mt-10 mb-10"
        onClick={() => setSkipCount((prev) => prev + 1)}
      >
        Load More
      </button>
    </Wrapper>
  );
};

export default LoadMore;
