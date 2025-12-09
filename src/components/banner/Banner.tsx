import pic from '../../assets/Images/2025 Confab.jpg';

export default function Banner() {
  return (
    <div className='bg-blue-200'>
      <div className="relative p-2">
        {/* Background Image */}
        <img src={pic} alt="Banner" className="w-full h-80 object-cover" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <h1 className="text-4xl font-bold">Welcome To RCCG National Prison And Hospital Ministry</h1>
        </div>
      </div>
    </div>
  );
}
