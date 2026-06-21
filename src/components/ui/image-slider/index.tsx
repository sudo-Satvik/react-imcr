import { useEffect, useState } from "react";
import Wrapper from "../../other/Wrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlider = ({ url, page, limit }) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${`https://picsum.photos/v2/list`}?page=${page}&limit=${limit}`,
        );
        const data = await response.json();
        setImages(data);
      } catch (e) {
        setError(e?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [url, page, limit]);

  const handlePrevious = () =>
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <Wrapper heading="Image Carousel" bgColor="bg-green-100" isFlex>
      {loading ? (
        <div className="w-200 h-100 text-gray-500 font-bold text-2xl flex justify-center item-center">
          Loading Slider...
        </div>
      ) : error ? (
        <div className="w-200 h-100 text-red-500 font-bold text-2xl flex justify-center item-center">
          Error Loading Slider
        </div>
      ) : (
        <div className="w-200 h-100 object-cover rounded-2xl relative">
          {/* Navigation buttons */}
          <button
            className="shadow-2xl w-10 h-10 bg-gray-500 text-white absolute rounded-full flex justify-center items-center cursor-pointer transition-all active:scale-92 -left-5 translate-y-[-50%] top-[50%] z-1000"
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            className="shadow-2xl w-10 h-10 bg-gray-500 text-white absolute rounded-full flex justify-center items-center cursor-pointer transition-all active:scale-92 -right-5 translate-y-[-50%] top-[50%] z-1000"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="relative w-full h-full overflow-hidden">
            {images.map((image, index) => (
              <img
                key={image.id}
                src={image.download_url}
                alt={image.author}
                className={`
                  absolute inset-0 w-full h-full object-cover rounded-2xl
                  transition-opacity duration-200
                  ${currentSlide === index ? "opacity-100" : "opacity-0"}
                `}
              />
            ))}
          </div>

          {/* Indicators */}
          <ul className="flex gap-1 items-center justify-center absolute -bottom-5 translate-x-[-50%] left-[50%]">
            {images &&
              images.length > 0 &&
              images.map((_, index) => (
                <li
                  key={index}
                  className={`h-2 bg-gray-600 rounded-full cursor-pointer transition-all ${currentSlide === index ? "w-5" : "w-2"}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
          </ul>
        </div>
      )}
    </Wrapper>
  );
};

export default ImageSlider;
