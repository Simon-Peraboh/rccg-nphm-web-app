
import pic from '../../assets/Images/cover3.jpg'

export default function Banner() {
  return (
    <div className='bg-blue-200'>
         {/* Banner Image */}
       <div className="relative p-2">
        <img src={pic} alt="Banner" className="w-full h-80 object-cover blur: blur(12px);" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <h1 className="text-4xl font-bold">Welcome To RCCG National Prison And Hospital Ministry</h1>
        </div>
      </div>
    </div>
  )
}
