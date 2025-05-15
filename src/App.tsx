import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="bg-blue-200">
      <Outlet />
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default App;
