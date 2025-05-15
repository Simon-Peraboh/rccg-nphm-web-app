
import { Footer, Header } from "../../components";
import {
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
} from "./index";

const sectionData = [
  {
    title: "The Disturbing Statistics From Nigeria Correctional Service",
    message: "Bringing hope and support to incarcerated individuals.",
    images: [pic4, pic5, pic1],
  },
  {
    title: "Health Section in Nigeria ",
    message: "Providing comfort and care to patients in need.",
    images: [pic1, pic2, pic3],
  },
];

export default function HopOnboard() {
  return (
    <div className="bg-blue-200">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="p-2"> {/* Add padding here */}
          <img
            src={pic1}
            alt="Hero"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
            Help Us Restore Hope and Dignity
          </h1>
          <p className="text-sm md:text-lg text-white">
            Empowering Lives in Nigeria's Prisons, Hospitals, and Police
            Stations
          </p>
        </div>
      </section>

        {/* Hospital and Prison Sections */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto space-y-8 md:space-y-0 md:grid md:grid-cols-2 gap-8">
          {sectionData.map((section, index) => (
            <div key={index} className="flex flex-col md:flex-row"> {/* Removed items-center and flex-col-reverse */}
              <div className="md:w-1/2 p-1">
                <img
                  src={index === 0 ? pic2 : pic4}
                  alt={section.title}
                  className="w-full h-full rounded-lg shadow-md mb-4 md:mb-0"
                />
              </div>
              <div className="md:w-1/2 p-8 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-700">{section.message}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 md:py-12 bg-blue-200">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">
            Why Hop Onboard?
          </h2>
          <p className="text-gray-700 mb-8 md:mb-12">
            Your involvement can create a ripple effect of positive change.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[pic3, pic4, pic5].map((imageSrc, boxIndex) => (
              <div key={boxIndex} className="relative">
                <img
                  src={imageSrc}
                  alt={`Benefit ${boxIndex + 1}`}
                  className="w-full h-full rounded-lg shadow-md hover:shadow-lg transition-shadow p-1"
                />
                <div className="absolute bottom-4 left-4 p-4 bg-black bg-opacity-50 text-white rounded-md">
                  <h3 className="text-xl font-bold mb-2">
                    Make a Difference
                  </h3>
                  <p>Your kindness and support can transform lives.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hop Onboard Section */}
      <section className="py-8 md:py-12 bg-blue-200">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">
            Hop Onboard Today
          </h2>
          <p className="text-gray-700 mb-8 md:mb-12">
            Join us in making a positive impact on the lives of those who need it
            most.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[pic2, pic3, pic4].map((imageSrc, boxIndex) => (
              <div key={boxIndex} className="p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {boxIndex === 0
                    ? "Volunteer Your Time"
                    : boxIndex === 1
                      ? "Donate to the Cause"
                      : "Spread the Word"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {boxIndex === 0
                    ? "Share your skills and compassion by volunteering your time."
                    : boxIndex === 1
                      ? "Your financial contributions can make a real difference."
                      : "Share our mission with your friends, family, and community."}
                </p>
                <img
                  src={imageSrc}
                  alt={`Hop Onboard ${boxIndex + 1}`}
                  className="w-full rounded-lg h-80"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
