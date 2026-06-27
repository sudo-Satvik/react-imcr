import { useEffect, useMemo, useState, useCallback } from "react";
import ToggleBtn from "../../other/ToggleBtn";
import Wrapper from "../../other/Wrapper";

const HEX_MAP = "0123456789ABCDEF";

const RandomColor = () => {
  const [isHexColor, setIsHexColor] = useState(true);
  const [color, setColor] = useState("#FFFFFF");
  const [opacity, setOpacity] = useState(100);

  const generateColor = useCallback(() => {
    const random = (max: number) => Math.floor(Math.random() * max);

    if (isHexColor) {
      let generatedColor = "#";
      for (let i = 0; i < 6; i++) {
        generatedColor += HEX_MAP[random(16)];
      }
      setColor(generatedColor);
    } else {
      const red = random(256);
      const green = random(256);
      const blue = random(256);
      setColor(`rgb(${red}, ${green}, ${blue})`);
    }
  }, [isHexColor]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateColor();
  }, [generateColor]);

  const handleColorCodeChange = () => {
    setIsHexColor((prev) => !prev);
  };

  const displayColor = useMemo(() => {
    // HEX
    if (isHexColor) {
      const alpha = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, "0")
        .toUpperCase();

      return `${color}${alpha}`;
    }

    // RGB → RGBA
    const values = color.match(/\d+/g);

    if (!values) return color;

    const [r, g, b] = values;

    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  }, [color, opacity, isHexColor]);

  return (
    <Wrapper bgColorCSS={displayColor} heading="Random Color Generator">
      <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12 flex flex-col gap-8 shadow-xl">
        {/* Toggle */}
        <div className="flex justify-center items-center gap-3">
          <span className="font-medium">RGB</span>

          <ToggleBtn
            condition={isHexColor}
            triggerFunc={handleColorCodeChange}
          />

          <span className="font-medium">HEX</span>
        </div>

        {/* Opacity */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Opacity</span>
            <span>{opacity}%</span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="cursor-pointer"
          />
        </div>

        {/* Button */}
        <button
          onClick={generateColor}
          className="
            rounded-2xl
            py-3
            px-6
            bg-white/70
            border
            border-white/20
            active:scale-95
            transition-all
            font-semibold
            cursor-pointer
          "
        >
          Generate Random Color
        </button>

        {/* Preview */}
        <div className="flex flex-col items-center gap-6">
          <div
            className="w-32 h-32 rounded-3xl border border-white/20 shadow-lg"
            style={{ backgroundColor: displayColor }}
          />

          <p className="text-5xl md:text-7xl font-black tracking-tight text-center break-all">
            {displayColor}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default RandomColor;
