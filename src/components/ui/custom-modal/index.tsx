import { useEffect, useState } from "react";
import Wrapper from "../../other/Wrapper";
import Modal from "./modal";
import { createPortal } from "react-dom";

const ModalContent = () => {
  return <p>Modal Content</p>;
};

const ModalParent = () => {
  const [renderModal, setRenderModal] = useState<boolean>(false);

  useEffect(() => {
    if (renderModal) {
      document.documentElement.classList.add("bodyFixed");
    } else {
      document.documentElement.classList.remove("bodyFixed");
    }

    return () => {
      document.documentElement.classList.remove("bodyFixed");
    };
  }, [renderModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setRenderModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Wrapper heading="Modal Pop-up">
        <button
          className="bg-black text-white py-3 px-6 rounded-lg cursor-pointer transition-all active:scale-95"
          onClick={() => setRenderModal(true)}
        >
          Click to Open Modal
        </button>
      </Wrapper>
      {renderModal &&
        createPortal(
          <Modal
            onCrossClick={() => setRenderModal(false)}
            header={"Modal Header"}
            footer={"Modal Footer"}
          >
            <ModalContent />
            <p>Hello</p>
          </Modal>,
          document.body,
        )}
    </>
  );
};

export default ModalParent;
