import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <footer className="font-sans bg-blue-200 text-gray-600">
      {/* Social top bar */}
      <div className="flex flex-col items-center justify-between px-6 py-6 border-b border-gray-300 lg:flex-row">
        <span className="text-center text-sm font-semibold mb-4 lg:mb-0">
          Get connected with us on social networks:
        </span>
        <div className="flex gap-5 text-lg">
          <a href="https://facebook.com/rccgphm" title="Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com/rccgphm" title="Twitter" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com/company/rccgphm" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
            <FaLinkedinIn />
          </a>
          <a href="https://youtube.com/@rccgphm" title="YouTube" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition">
            <FaYoutube />
          </a>
          <a href="https://instagram.com/rccgphm" title="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Footer body */}
      <div className="grid grid-cols-1 gap-8 px-6 py-10 text-center md:grid-cols-2 lg:grid-cols-4 md:text-left">
        <div>
          <h6 className="mb-4 font-bold uppercase">RCCG NPHM</h6>
          <p>
            Arm of RCCG in charge of outreach to inmates in Prisons, Police Stations, Hospitals, and Old People’s Homes across Nigeria.
          </p>
        </div>

        {/* More Info Section */}
        <div>
          <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
            More Info
          </h6>
          {['Love', 'Grace', 'Peace', 'Anointing'].map((text) => (
            <p key={text} className="mb-2">
              <a className="text-gray-500 hover:underline hover:text-blue-700 transition duration-200 cursor-pointer">
                {text}
              </a>
            </p>
          ))}
        </div>

        {/* Useful Links Section */}
        <div>
          <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
            Useful Links
          </h6>
          <p className="mb-2">
            <a
              href="https://www.rccgphm.org/"
              className="text-gray-500 hover:underline hover:text-blue-700 transition duration-200 cursor-pointer"
            >
              Website
            </a>
          </p>
          {['Settings', 'Orders', 'Help'].map((text) => (
            <p key={text} className="mb-2">
              <a className="text-gray-500 hover:underline hover:text-blue-700 transition duration-200 cursor-pointer">
                {text}
              </a>
            </p>
          ))}
        </div>


        <div>
          <h6 className="mb-4 font-bold uppercase">Contact</h6>
          <p className="mb-2">Redemption City, Lagos-Ibadan Expressway</p>
          <p className="mb-2">prisonandhosp@rccgph.org</p>
          <p className="mb-2">+234 803 491 4638</p>
          <p className="mb-2">WhatsApp: +234 708 422 2323</p>
        </div>


      </div>

      {/* Copyright */}
      <div className="bg-blue-200 py-4 text-center text-sm">
        <span className="text-gray-600">&copy; {year} RCCG NPHM. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
