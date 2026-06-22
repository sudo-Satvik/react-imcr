const Card = ({ title, description, imageUrl, price, discountPercentage }) => {
  return (
    <div className="w-80 rounded-md flex flex-col bg-white">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-t-md"
        />
      ) : (
        <div className="w-[320px] h-94 bg-gray-500">.</div>
      )}
      <div className="flex flex-col justify-center p-4 gap-2">
        <p className="font-semibold text-2xl">{title}</p>
        <p className="text-md">{description}</p>
        <div className="flex gap-2 items-end justify-start">
          <p className="text-2xl font-bold">${price}</p>
          <p className="text-md font-semibold line-through text-gray-500">
            ${discountPercentage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
