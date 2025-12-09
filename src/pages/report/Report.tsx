//import { Link } from "react-router-dom";
import { Footer, Header } from "../../components";
import QuarterlyReportTable2 from "../../dashboard/quarterlyreport/QuarterlyReportTable2";



export default function Report() {

    // const handleLinkClick = (): void => {
    // };

  return (
    <div className="p-2">
       <Header />
       <h1 className="text-4xl text-center text">Quarterly Report</h1>
       <QuarterlyReportTable2 />
{/* 
       {<button>
        <button>
        <Link to="/dashboard/conferenceTable" className="flex items-center ml-2 space-x-2 bg-gray-400 hover:bg-green-500 p-2 rounded" onClick={handleLinkClick}>Registered Users</Link>
        </button>
        <br></br>
        <button>
        <Link to="/dashboard/attendanceAdmin" className="flex items-center ml-2 space-x-2 bg-yellow-300 hover:bg-green-500 p-2 rounded" onClick={handleLinkClick}>Attendance Admin</Link>
        </button>
       </button> } */}

       <Footer />
    </div>
  )
}
