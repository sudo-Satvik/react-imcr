import type React from "react";

interface WrapperProps {
  bgColor?: string;
  children: React.ReactNode;
  isFlex?: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({
  bgColor = "bg-sky-100",
  isFlex = false,
  children,
}) => {
  return (
    <div
      className={`min-h-screen w-full ${bgColor} ${isFlex && "flex justify-center items-center"}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
