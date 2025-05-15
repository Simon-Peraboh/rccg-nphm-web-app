
import Banner from '../banner/Banner';
import Project from '../projects/Projects';
import Visitation from '../visitation/Visitation';
import Conference from '../conference/Conference';
import Leadership from '../leadership/Leadership';
import Header from '../header/Header';
import Footer from '../footer/Footer'

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Project />
      <Visitation />
      <Conference />
      <Leadership />
      <Footer />
    </div>
  );
};

export default HomePage;
