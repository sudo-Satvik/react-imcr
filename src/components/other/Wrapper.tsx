import type React from "react";

interface WrapperProps {
  bgColor?: string;
  bgColorCSS?: string;
  children: React.ReactNode;
  isFlex?: boolean;
  heading?: string;
}

const Wrapper: React.FC<WrapperProps> = ({
  bgColor,
  bgColorCSS,
  isFlex = true,
  children,
  heading,
}) => {
  return (
    <div
      style={
        bgColorCSS && {
          backgroundColor: bgColorCSS,
        }
      }
      className={`min-h-screen w-full ${bgColor} ${isFlex && "flex flex-col gap-20 justify-center items-center"}`}
    >
      {heading && <h1 className="text-8xl font-semibold">{heading}</h1>}
      {children}
    </div>
  );
};

export default Wrapper;
