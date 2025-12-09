


interface ConferenceCardProps {
    title: string;
    img: string;
    number: string;
  }
  
  const ConferenceCard: React.FC<ConferenceCardProps> = ({ title, img, number }) => {
    return (
      <div className="flex flex-col items-center">
        <h3 className="text-xl md:text-2xl font-extrabold text-[#0D1F3C] mb-4 text-center">
          {title}
        </h3>
        <div className="relative w-full aspect-[4/3] rounded-lg shadow-lg overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 bg-white text-gray-700 text-3xl font-bold px-4 py-2 shadow-md rounded-bl-lg">
            {number}
          </div>
        </div>
      </div>
    );
  };
  
  export default ConferenceCard;
  