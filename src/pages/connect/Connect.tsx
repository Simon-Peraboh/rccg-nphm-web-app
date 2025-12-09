import { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Footer, Header } from "../../components";
import { pic6, pic5 } from './index'

interface Coordinator {
  id: number;
  full_name: string;
  province: string;
  state: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  image_path?: string;
}

export default function Connect() {
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://app.rccgphm.org/api/stateCoordinators/getAll")
      .then((res) => {
        setCoordinators(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading coordinators", err);
        setLoading(false);
      });
  }, []);

  const grouped = coordinators.reduce((acc: Record<string, Coordinator[]>, user) => {
    if (!acc[user.state]) acc[user.state] = [];
    acc[user.state].push(user);
    return acc;
  }, {});

  return (
    <div className="bg-blue-200">
      <Header />

      <section className="py-8 md:py-12">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Connect with Us In Every State</h1>
            <p className="text-gray-700">
              Join our network of dedicated volunteers and partners across Nigeria.
            </p>
          </div>
          <div className="md:w-1/2 p-1">
            <img
              src={pic6}
              alt="Connect Hero"
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>


      {/* Coordinators by state */}
      <section className="py-8 md:py-12 bg-blue-200">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-blue-600 font-semibold">Loading coordinators...</p>
            </div>
          ) : Object.keys(grouped).length === 0 ? (
            <div className="text-center py-12 text-gray-600">No Data From Server Found.</div>
          ) : (
            Object.entries(grouped)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([state, group]) => (
                <div key={state} className="mb-10">
                  <h2 className="text-3xl font-semibold text-center mb-6 text-blue-700">
                    {state} State Coordinators
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {group.map((coordinator) => (
                      <div key={coordinator.id} className="text-center bg-white p-4 rounded-lg shadow-md">
                        <img
                          src={`https://app.rccgphm.org/storage/${coordinator.image_path}`}
                          onError={(e) => (e.currentTarget.src = pic5)}
                          alt={coordinator.full_name}
                          className="w-24 h-32 object-cover rounded-lg mx-auto mb-2"
                        />
                        <h3 className="text-lg font-semibold">{coordinator.full_name}</h3>
                        <p className="text-gray-600">{coordinator.province}</p>
                        <div className="mt-2 flex justify-center space-x-2 text-blue-600">
                          {coordinator.facebook && (
                            <a href={coordinator.facebook} target="_blank" rel="noopener noreferrer">
                              <FaFacebook />
                            </a>
                          )}
                          {coordinator.twitter && (
                            <a href={coordinator.twitter} target="_blank" rel="noopener noreferrer">
                              <FaTwitter />
                            </a>
                          )}
                          {coordinator.instagram && (
                            <a href={coordinator.instagram} target="_blank" rel="noopener noreferrer">
                              <FaInstagram />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>
        <Footer />
      </section>

    </div>
  )
}
