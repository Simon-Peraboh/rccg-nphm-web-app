import { Leadership, Header, Conference, Visitation, Project, Footer } from './components/index';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="bg-blue-200"> {/* Apply bg-blue-200 directly to the App component */}
      <Router>
        <Header />
        {/* Other components and routes */}
      </Router>
      <Project />
      <Visitation />
      <Conference />
      <Leadership />
      <Footer />
    </div>
  );
}

export default App;
