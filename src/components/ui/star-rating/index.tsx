import { Star } from "lucide-react";
import Wrapper from "../../other/Wrapper";
import { useState } from "react";

type StarRatingProps = {
  length?: number;
};

const StarRating = ({ length = 5 }: StarRatingProps) => {
  const [ratedIndex, setRatedIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const handleStarClick = (currentIndex: number) => {
    setRatedIndex(currentIndex);
  };

  const handleMouseEnter = (currentIndex: number) => {
    setHoveredIndex(currentIndex);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(0);
  };

  return (
    <Wrapper bgColor="bg-purple-300" heading="Star Rating" isFlex>
      <div className="flex gap-5 flex-col items-center justify-center">
        <p className="text-lg font-semibold">Hover to Fill, Click to Lock</p>

        <div className="flex gap-1 bg-white p-4 rounded-lg">
          {Array.from({ length }).map((_, index) => {
            const starNumber = index + 1;

            const isFilled = starNumber <= (hoveredIndex || ratedIndex);

            return (
              <Star
                key={starNumber}
                fill={isFilled ? "#FFB62D" : "#FFB62D00"}
                className={`w-10 h-10 cursor-pointer ${isFilled ? "text-[#FFB62D]" : "text-black"} transition-all`}
                onClick={() => handleStarClick(starNumber)}
                onMouseEnter={() => handleMouseEnter(starNumber)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default StarRating;
