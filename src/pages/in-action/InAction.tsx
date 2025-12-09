
import { Footer, Header } from "../../components";
import {
  conf1,
  conf2,
  conf3,
  conf4,
  conf5,
  conf6,
  conf7,
  conf8,
} from "./index";

const sectionData = [
  {
    title: "Correctional Center Visitations",
    message: "Bringing hope and support to incarcerated individuals.",
    images: [conf6, conf7, conf8, conf1],
    bannerImage: conf3,
  },
  {
    title: "Hospital Visitation",
    message: "Providing comfort and care to patients in need.",
    images: [conf1, conf2, conf3, conf4],
    bannerImage: conf5,
  },
  {
    title: "Police Station Visitation",
    message: "Nurturing and empowering vulnerable children.",
    images: [conf5, conf6, conf7, conf8],
    bannerImage: conf7,
  },
  {
    title: "Old People's Home Visitation",
    message: "Engaging with and uplifting local communities.",
    images: [conf1, conf2, conf3, conf4],
    bannerImage: conf8,
  },
];

export default function InAction() {
  return (
    <div className="bg-blue-200 relative">
      <Header />

      {/* Banner Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={conf4}
          alt="Background Image"
          className="w-full h-full object-cover"
        />
        {/* Inner Image */}
          <div className="absolute top-20 right-10 w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 z-10">
            <img
              src={conf3}
              alt="Overlay Image"
              className="w-72 h-56 shadow-xl object-cover transition-opacity duration-1000 opacity-0"
              onLoad={(e) => { e.currentTarget.classList.add("opacity-100"); }} 
            />
          </div>
        <div className="absolute top-1/4 left-16 max-w-md">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-md">
            Welcome NPHM In Action
          </h1>
          <p className="text-lg text-white drop-shadow-md">
            We lead from the front, like soldiers we're in the saving lives through
            the power of Christ 
          </p>
        </div>
      </div>

      {/* Section Blocks */}
      {sectionData.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image Block */}
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4 p-8">
              {section.images.map((imageSrc, boxIndex) => (
                <div key={boxIndex} className="w-full h-full">
                  <img
                    src={imageSrc}
                    alt={`Box ${boxIndex + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text Block */}
          <div className="md:w-1/2 flex items-center p-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{section.title}</h1>
              <p className="text-gray-600">{section.message}</p>
            </div>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
}
