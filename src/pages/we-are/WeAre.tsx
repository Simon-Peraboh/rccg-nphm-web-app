
import { Footer, Header } from "../../components";
import { pic1} from "./index"; // Assuming you have these image imports

import {
  FaUserFriends,
  FaHandshake,
  FaPray,
  FaHandsHelping,
  FaChurch,
  FaBible,
} from "react-icons/fa";

const ministryData = [
  {
    name: "State Level",
    description: "There is RCCG in every State in Nigeria, therefore all leaders in that State makes up this level of leadership, though as department, this level of leadership is not constituted yet but by implications of mission leadership structure, this is another level of leadership.",
    icon: FaUserFriends,
  },
  {
    name: "National Level",
    description: "The is the top echelon of the department, overseeing the activities of the department, nationally, a team of five excos comprising Chairman, Vice Chairman, Secretary, Treasurer and Legal supported by Coordinators from each Province ",
    icon: FaHandshake,
  },
  {
    name: "Regional Level",
    description: "In RCCG, there are several Regions in a State made up by Provinces, as a department, all strata of leadership structure is acknowledged and followed, Provincial Coordinators makes the level of leadership.",
    icon: FaPray,
  },
  {
    name: "Provincial Level",
    description: "Every Province belongs to a Region as the mission leadership structure cascade down, this is the most active unit besides national excos because most of the ministry activities are channeled through the Province.",
    icon: FaHandsHelping,
  },
  {
    name: "Zonal Level",
    description: "Just as a Province belongs to a region so also Zones belong to a Province, a Province is made up of several zones, leadership at this level works with the Province.",
    icon: FaChurch,
  },
  {
    name: "Area Level",
    description: "This is another important structure of leadership because it oversees the activities of HODs from parishes which is the base of the pyramid.",
    icon: FaBible,
  },
];

export default function WeAre() {
  return (
    <div className="bg-blue-200">
      <Header />

      {/* Hero Section (Single Image Banner) */}
      <section className="relative">
        <img
          src={pic1} 
          alt="Hero"
          className="w-full h-64 md:h-96 object-cover p-1"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 md:px-0">
          <h1 className="text-xl md:text-4xl font-bold text-white mb-2 md:mb-4">
            Who We Are
          </h1>
          <p className="text-xs md:text-lg text-white">
            The Prison And Hospital Ministry of Redeemed Christian Church of God In-Charge of Outreach to Inmates in Prisons, Police Stations, and Patients in Hospitals in Nigeria.
          </p>
        </div>
      </section>

      {/* About Us Section (Restructured) */}
      <section className="py-12 bg-gradient-to-r from-blue-200 to-blue-200">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-4xl font-bold text-center mb-8 text-blue-700">About Us</h2>

          {/* History */}
          <div className="mb-12">
            <h3 className="text-5xl md:text-3xl font-semibold mb-4 text-center text-blue-700">Our History</h3>
            <p className="text-gray-800 leading-loose text-justify">
              It's an established fact that the Prison and Hospital Ministry of RCCG are in almost all Regions, Provinces, and Zonal Headquarters nationwide. Regrettably, despite their exploits over the years for the Lord, their activities were not harmonized and it never had a national face. Late Pastor Abu first came up with the idea of moving the Ministry to National frontiers. He died without fulfilling this dream. However, after his death, Pastor Rotimi Thomas, the present Vice Chairman of the Coordinators, galvanically moved other Coordinators to write a letter to our daddy in the Lord through Pastor J.F.Odesola. Daddy G.O replied and mandated Pastor J.F.Odesola to inaugurate the Prison and Hospital Ministry. This was done under the unction of the Holy Spirit on the 6th day of March 2016 with a mandate to sensitize and establish a Prison and Hospital Ministry in all RCCG Parishes nationwide, whose primary roles amongst others, will be to heal the sick and spiritually rehabilitate inmates from incarceration.
            </p>
          </div>

          {/* Mission Statement & Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-5xl md:text-3xl font-semibold mb-4 text-blue-700">Vision and Mission Statement</h3>
              <p className="text-gray-800 leading-loose">
                To preach the good news and proclaim freedom to those in captivity, to identify with and share in the burden of those that are bound, and to provide a safe place of refuge outside Prison to ex-Inmates. To be a major channel of blessings to those that are sick and in Prison so that they can experience quality fellowship with God.
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-700">Core Values</h3>
              <ul className="text-gray-800 leading-loose list-disc list-inside">
                <li>To create and show the love of Jesus Christ to those who are sick and in Prison (Matt 25:36).</li>
                <li>To proclaim liberty to those in captivity and freedom to Prisoners (Luke 4:18).</li>
                <li>To go forth and bear fruits and cause the fruits to abide (John 15:16).</li>
                <li>To reach out to the sick and Prisoners with love, care, and compassion of our Lord Jesus (Matt 25:36).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Structure Section */}
      <section className="py-8 md:py-12 bg-blue-200">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8">
            Ministry Structure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {ministryData.map((ministry, index) => (
              <div key={index} className="text-center p-4">
                <ministry.icon className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{ministry.name}</h3>
                <p className="text-gray-700">{ministry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
