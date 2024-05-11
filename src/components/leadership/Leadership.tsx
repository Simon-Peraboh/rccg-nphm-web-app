import React from 'react';
import { leader1, leader2, leader3, leader4, leader5 } from '../leadership/index';

interface Leader {
  name: string;
  // score: number;
  description: string;
  image: string;
}

const Leadership: React.FC = () => {
  const leadersData: Leader[] = [
    { name: 'Alice', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: leader1 },
    { name: 'Bob',  description: 'Nulla facilisi. Mauris ullamcorper, nisi ac hendrerit volutpat.', image: leader5 },
    { name: 'Charlie', description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', image: leader4 },
    { name: 'David', description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.', image: leader2 },
    { name: 'Eve', description: 'Donec eu semper leo. Integer feugiat elit eget purus tincidunt, sit amet dignissim eros semper.', image: leader3 },
  ];

  return (
    <div className="h-screen bg-blue-200 flex justify-center items-center">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-500">Leadership Structure</h1>
        <div className="flex justify-between w-full">
          {leadersData.map((leader, index) => (
            <div key={index} className="flex flex-col items-center p-8">
              <img className="h-48 w-48 object-cover rounded-full mb-4" src={leader.image} alt="Image" />
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg mb-2">{leader.name}</p>
                {/* <p className="text-green-500 mb-2">{leader.score}</p> */}
                <p className="text-sm text-gray-500">{leader.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
