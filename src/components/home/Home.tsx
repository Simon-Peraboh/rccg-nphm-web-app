
import Banner from '../banner/Banner';
import Visitation from '../visitation/Visitation';
import Conference from '../conference/Conference';
import Leadership from '../leadership/Leadership';
import Header from '../header/Header';
import Footer from '../footer/Footer'
import SpecialProjectsCarousel from '../carousel/SpecialProjectsCarousel';


const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <Banner />
      <SpecialProjectsCarousel />
      <Visitation />
      <Conference />
      <Leadership />
      <Footer />
    </div>
  );
};

export default HomePage;
