import { Link } from "react-router-dom";
import { Footer, Header } from "../../components";
import ConferenceCard from './ConferenceCards';
import {cardData} from './data'

function Conference() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-6 py-20">
      <Link to="/dashboard/attendance/AttendanceSheet">
      <button
        className="bg-gray-400 hover:bg-green-500 text-white font-semibold py-2 px-2 rounded shadow-md transition duration-300 ease-in-out"
      >
        Mark Attendance
      </button>
    </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {cardData.map(({ title, img, number }) => (
            <ConferenceCard key={number} title={title} img={img} number={number} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Conference;
