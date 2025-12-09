import React, { useState } from "react";
import { Footer, Header } from "../../components";
import Pic from "../../assets/Images/benefits.jpg";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your logic here to handle form submission (e.g., send email, etc.)
    console.log(formData); // Replace with your actual submission logic
  };

  return (
    <div className="bg-blue-200">
      <Header />

       {/* Banner Section with Padding */}
       <section className="relative py-16 md:py-24"> {/* Added padding to the section */}
        <div
          className="container mx-auto bg-cover bg-center bg-origin-padding"
          style={{ 
            backgroundImage: `url(${Pic})`,
            padding: "2rem" // Add padding for all screen sizes
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="text-center relative"> {/* Made content relative to container */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 md:mb-4 drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-base md:text-lg lg:text-2xl text-white drop-shadow-md">
              Contact Information Address: National Office, Redemption Camp, KM 46
              Ibadan Express Way Ogun State Phone: + 2348034914638, 2348034886673,
              2348037225687, WhatsApp Line 2347084222323 Email:
              prisonandhosp@rccgph.org, nphministry@yahoo.com
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-8 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-bold mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
