import { useEffect, useState } from "react";
import Wrapper from "../../other/Wrapper";

const API_ENDPOINT = `https://dummyjson.com/products?limit=100`;

interface IData {
  id: number;
  title: string;
}

const ScrollIndicator = () => {
  const [data, setData] = useState<IData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  useEffect(() => {
    const fetchData = async (getUrl: string) => {
      try {
        setLoading(true);
        const response = await fetch(getUrl);

        if (!response.ok) {
          throw new Error("Invalid response!");
        }

        const resData = await response.json();
        setLoading(false);
        setErrorMsg(null);
        setData(resData?.products);
      } catch (error) {
        console.error(error);
        setErrorMsg(error as string);
      }
    };

    fetchData(API_ENDPOINT);
  }, []);

  // Scroll Logic

  const handleScrollPercentage = () => {
    const howMuchScrolled =
      document.documentElement.scrollTop || document.body.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage(Math.floor((howMuchScrolled / height) * 100));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <Wrapper bgColor="bg-pink-100" isFlex={false}>
      <div className="w-full h-20 bg-green-900 text-white justify-between flex-col items-start text-3xl font-semibold flex sticky top-0">
        <span className="mt-3 self-center">Scroll Indicator</span>
        <div
          className="bg-yellow-500 h-2"
          style={{
            width: `${scrollPercentage}%`,
          }}
        />
      </div>

      <div className="flex flex-col gap-2 py-4 text-center">
        {loading
          ? "Loading data..."
          : errorMsg
            ? errorMsg
            : data &&
              data.length > 0 &&
              data.map((item: IData) => <p key={item?.id}>{item?.title}</p>)}
      </div>
    </Wrapper>
  );
};

export default ScrollIndicator;
