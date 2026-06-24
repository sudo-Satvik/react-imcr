import QRCode from "react-qr-code";
import Wrapper from "../../other/Wrapper";
import { useState } from "react";

const QRCodeGenerator = () => {
  const [qrCodeValue, setQrCodeValue] = useState("");

  return (
    <Wrapper heading="QR Code Generator" bgColor="bg-amber-100">
      <div className="flex flex-col items-center gap-6">
        <div className="bg-gray-600 p-5 rounded-2xl shadow-lg">
          <QRCode
            size={300}
            bgColor="#4a5565"
            fgColor="#ffffff"
            value={qrCodeValue || " "}
          />
        </div>

        <input
          type="text"
          value={qrCodeValue}
          onChange={(e) => setQrCodeValue(e.target.value)}
          placeholder="Enter text or URL..."
          className="
            w-80
            px-4
            py-3
            border
            border-gray-300
            rounded-lg
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      </div>
    </Wrapper>
  );
};

export default QRCodeGenerator;
