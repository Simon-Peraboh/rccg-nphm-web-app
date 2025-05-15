import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  state: string;
  region: string;
  province: string;
  coordinatorName: string;
  prisonVisited: string;
  hospitalVisited: string;
  policeStationVisited: string;
  others: string;
  items: string;
  amountBudgeted: string;
  amountSpent: string;
  teamMembers: string;
  soulsWon: string;
  challenges: string;
  suggestion: string;
  remarks: string;
  activityDate: string;
  createdDate: string;
}

const MonthlyReport: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    state: "",
    region: "",
    province: "",
    coordinatorName: "",
    prisonVisited: "",
    hospitalVisited: "",
    policeStationVisited: "",
    others: "",
    items: "",
    amountBudgeted: "",
    amountSpent: "",
    teamMembers: "",
    soulsWon: "",
    challenges: "",
    suggestion: "",
    remarks: "",
    activityDate: "",
    createdDate: ""
  });

  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {
    state, region, province, coordinatorName, prisonVisited, hospitalVisited, policeStationVisited, others, items, amountBudgeted,
    amountSpent, teamMembers, soulsWon, challenges, suggestion, remarks, activityDate, createdDate
  } = user;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewMode(true);
  };

  const onConfirmSubmit = async () => {
    try {
      await axios.post("http://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/nationalMonthlyReport", user);
      setSubmitted(true);

      // Introduce a short delay before navigating
      setTimeout(() => {
        navigate("/");
      }, 3000); // Display message for 3 seconds
    } catch (error: unknown) {
      console.error("Error submitting the report:", error);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return <div className='container'><h2 className="text-2xl font-bold">Thank you! Your submission has been received.</h2></div>;
  }

  return (
    <div className='container mx-auto mt-10'>
      {reviewMode ? (
        <div className='flex justify-center'>
          <div className='w-full max-w-md p-8 bg-white shadow-md rounded'>
            <h2 className='text-2xl font-bold mb-6'>Review Your Submission</h2>
            <div className='mb-4'><strong>State: </strong>{state}</div>
            <div className='mb-4'><strong>Region: </strong>{region}</div>
            <div className='mb-4'><strong>Province: </strong>{province}</div>
            <div className='mb-4'><strong>Coordinator's Name: </strong>{coordinatorName}</div>
            <div className='mb-4'><strong>Correctional Center Visited: </strong>{prisonVisited}</div>
            <div className='mb-4'><strong>Hospital Visited: </strong>{hospitalVisited}</div>
            <div className='mb-4'><strong>Police Station Visited: </strong>{policeStationVisited}</div>
            <div className='mb-4'><strong>Other Places Not Listed Above: </strong>{others}</div>
            <div className='mb-4'><strong>Items Taken With You: </strong>{items}</div>
            <div className='mb-4'><strong>Amount Budgeted: </strong>{amountBudgeted}</div>
            <div className='mb-4'><strong>Actual Amount Spent: </strong>{amountSpent}</div>
            <div className='mb-4'><strong>How Many People Went: </strong>{teamMembers}</div>
            <div className='mb-4'><strong>Souls Won: </strong>{soulsWon}</div>
            <div className='mb-4'><strong>Challenges Encountered: </strong>{challenges}</div>
            <div className='mb-4'><strong>Any Suggestion: </strong>{suggestion}</div>
            <div className='mb-4'><strong>Date Of Visitation: </strong>{activityDate}</div>
            <div className='mb-4'><strong>Date Of Filing This Report: </strong>{createdDate}</div>
            <div className='mb-4'><strong>Your Remark For This Visit: </strong>{remarks}</div>
            <div className='flex justify-between mt-6'>
              <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={() => setReviewMode(false)}>Edit</button>
              <div>
                <button className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2' onClick={onConfirmSubmit}>Submit</button>
                <Link className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" to="/">Cancel</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center'>
          <div className='w-full max-w-md p-8 bg-white shadow-md rounded'>
            <h2 className='text-2xl font-bold mb-6'>Create Monthly Report</h2>
            <form onSubmit={onSubmit}>
              <div className='mb-4'>
                <label htmlFor="state" className='block text-sm font-medium'>State</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Your State' name='state' value={state} onChange={onInputChange} required />
              </div>
              <div className='mb-4'>
                <label htmlFor="region" className='block text-sm font-medium'>Region</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Your Region' name='region' value={region} onChange={onInputChange} required />
              </div>
              <div className='mb-4'>
                <label htmlFor="province" className='block text-sm font-medium'>Province</label>
                <input type='text' placeholder='Enter Your Province' name='province' value={province} onChange={onInputChange} className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' required />
              </div>
              <div className='mb-4'>
                <label htmlFor="coordinatorName" className='block text-sm font-medium'>Coordination's Name</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Coordinator Name ' name='coordinatorName' value={coordinatorName} onChange={onInputChange} required />
              </div>
              <div className='mb-4'>
                <label htmlFor="prisonVisited" className='block text-sm font-medium'>Correctional Center Visited</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Name Of Prison' name='prisonVisited' value={prisonVisited} onChange={onInputChange} />
              </div>
              <div className='mb-4'>
                <label htmlFor="hospitalVisited" className='block text-sm font-medium'>Name Of Hospital Visited</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Name Of Hospital' name='hospitalVisited' value={hospitalVisited} onChange={onInputChange} />
              </div>
              <div className='mb-4'>
                <label htmlFor="policeStationVisited" className='block text-sm font-medium'>Police Station Visited</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Name Of Police Station' name='policeStationVisited' value={policeStationVisited} onChange={onInputChange} />
              </div>
              <div className='mb-4'>
                <label htmlFor="others" className='block text-sm font-medium'>Other Places Visited</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Other Places Visited e.g Old People Home' name='others' value={others} onChange={onInputChange} />
              </div>
              <div className='mb-4'>
                <label htmlFor="items" className='block text-sm font-medium'>Items Taken Along</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Few Items e.g Rice, Garri' name='items' value={items} onChange={onInputChange} required />
              </div>
              <div className='mb-4'>
                <label htmlFor="amountBudgeted" className='block text-sm font-medium'>Amount Budgeted For Visit</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Amount' name='amountBudgeted' value={amountBudgeted} onChange={onInputChange} required />
              </div>
              <div className='mb-4'>
                <label htmlFor="amountSpent" className='block text-sm font-medium'>Actual Amount Spent</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Amount' name='amountSpent' value={amountSpent} onChange={onInputChange} required />
              </div>
              <div className='mb-4'>
                <label htmlFor="teamMembers" className='block text-sm font-medium'>How People Went For This Visit</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Total Number Of Members' name='teamMembers' value={teamMembers} onChange={onInputChange} required />
              </div>
              <div className='mb-4'>
                <label htmlFor="soulsWon" className='block text-sm font-medium'>How Many Souls Were Saved</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Total Number Of Souls Won e.g 5' name='soulsWon' value={soulsWon} onChange={onInputChange} />
              </div>
              <div className='mb-4'>
                <label htmlFor="challenges" className='block text-sm font-medium'>Challenges Faced On This Trip If Any</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Highlight Your Challenges' name='challenges' value={challenges} onChange={onInputChange} />
              </div>
              <div className='mb-4'>
                <label htmlFor="suggestion" className='block text-sm font-medium'>Give Suggestions If Any</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Your Suggestion' name='suggestion' value={suggestion} onChange={onInputChange} />
              </div>
              <div className='mb-4'>
                <label htmlFor="activityDate" className='block text-sm font-medium'>Date Of Visitation</label>
                <input type="date" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Pick A Date' name='activityDate' value={activityDate} onChange={onInputChange} required />
              </div>
              <div className='mb-4'>
                <label htmlFor="createdDate" className='block text-sm font-medium'>Date Creating This Report</label>
                <input type="date" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Pick A Date' name='createdDate' value={createdDate} onChange={onInputChange} required />
              </div>
              <div className='mb-4'>
                <label htmlFor="remarks" className='block text-sm font-medium'>Final Remarks If Any</label>
                <input type="text" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Enter Your Remark' name='remarks' value={remarks} onChange={onInputChange} />
              </div>
              <div className='flex justify-between mt-6'>
                <button type='submit' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Review</button>
                <Link className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" to="/">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthlyReport;
