import type React from "react";
import { X } from "lucide-react";

interface IModalProps {
  onCrossClick: () => void;
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({
  onCrossClick,
  header,
  children,
  footer,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-lg"
      onClick={onCrossClick}
    >
      <div
        className="relative w-150 max-w-[90vw] rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4" onClick={onCrossClick}>
          <X size={20} />
        </button>

        <h1 className="rounded-t-lg border-b border-gray-300 py-5 text-center text-xl font-semibold">
          {header || "Header"}
        </h1>

        <div className="p-6">
          {children || (
            <div className="flex h-40 items-center justify-center">Content</div>
          )}
        </div>

        <footer className="rounded-b-lg border-t border-gray-300 py-3 text-center font-medium">
          {footer || "Footer"}
        </footer>
      </div>
    </div>
  );
};

export default Modal;
