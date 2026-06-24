import Wrapper from "../../other/Wrapper";

const QRCodeGenerator = () => {
  return (
    <Wrapper heading="QR Code Generator" bgColor="bg-amber-100">
      <div className="w-100 h-100 bg-gray-600"></div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter Your Value Here..."
          className="flex-1 px-4 py-2 border border-gray-400 rounded-lg outline-none focus:ring-0 focus:ring-gray-500 focus:border-gray-500 transition"
        />

        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 active:scale-95 transition">
          Search
        </button>
      </div>
    </Wrapper>
  );
};

export default QRCodeGenerator;
