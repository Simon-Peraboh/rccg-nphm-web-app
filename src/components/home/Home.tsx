
import Banner from '../banner/Banner';
import Visitation from '../visitation/Visitation';
import Conference from '../conference/Conference';
import Leadership from '../leadership/Leadership';
import Header from '../header/Header';
import Footer from '../footer/Footer'
<<<<<<< HEAD
import SpecialProjectsCarousel from '../carousel/SpecialProjectsCarousel';
=======
import SpecialProjectsCarousel from '../carousel/Carousel';
import CoreActivityRealities from './CoreActivityRealities';
import UpcomingProgram from '../upcoming/UpcomingProgram';
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f


const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <Banner />
<<<<<<< HEAD
=======
      <CoreActivityRealities />
      <UpcomingProgram />
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
      <SpecialProjectsCarousel />
      <Visitation />
      <Conference />
      <Leadership />
      <Footer />
    </div>
  );
};

export default HomePage;
