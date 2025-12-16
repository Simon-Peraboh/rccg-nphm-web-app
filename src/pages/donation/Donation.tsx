
import { Footer, Header } from '../../components'
import Carousel from '../../components/carousel/Carousel2';
import {pic7, pic8, pic9, pic10, pic11, pic12, pic14 } from "../../components/carousel/index";
import BankDetails from '../../components/bankdetails/BankDetails';

const projectImages = [
  { src: pic14, caption: 'HALF WAY HOME PROJECT FINANCIAL SUPPORT.' },
  { src: pic11, caption: 'PRISON CHAPEL RENOVATION SUPPORT PROJECT.' },
  { src: pic10, caption: 'MEDICATIONS SUPPORT' },
  { src: pic7, caption: 'NECO, GCE AND OPEN UNIVERSITY EDUCATION FINANCIAL SUPPORT.' },
  { src: pic9, caption: 'RAW FOOD BANK SUPPORT.' },
  { src: pic12, caption: 'CLOTHES - NEW AND FAIRLY USED CLEAN ONES. ' },
  { src: pic8, caption: 'PROBONO LEGAL SUPPORT. ' }
];

function Donation() {
  return (
    <div>
        <Header />
        <h2 className="text-3xl font-bold mb-4 text-center"> Projects That Urgently Needs Your Kind Donations</h2>
         <Carousel images={projectImages} />
          <BankDetails />
        <Footer />
    </div>
  )
}

export default Donation