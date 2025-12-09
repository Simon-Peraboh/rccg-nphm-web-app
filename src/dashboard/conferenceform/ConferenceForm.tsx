
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../apicalls/conference/api';
import  {pics1} from './index';


interface ConferenceFormInputs {
  conference_date: string;
  conference_theme: string;
  full_name: string;
  email: string;
  phone_number: string;
  state: string;
  region: string;
  province: string;
  position: string;
  accommodation: boolean;
  arrival_date?: string | null;
  departure_date?: string | null;
  first_timer: boolean;
}

const schema = yup.object().shape({
  conference_date: yup.string().required('Conference Date is required'),
  conference_theme: yup.string().required('Conference Theme is required'),
  full_name: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone_number: yup.string().required('Phone Number is required'),
  state: yup.string().required('State is required'),
  region: yup.string().required('Region is required'),
  province: yup.string().required('Province is required'),
  position: yup.string().required('Position is required'),
  accommodation: yup.boolean().required('Accommodation selection is required'),
  arrival_date: yup
    .string()
    .nullable()
    .when('accommodation', {
      is: true,
      then: (schema) => schema.required('Arrival Date is required').nullable(),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
  departure_date: yup
    .string()
    .nullable()
    .when('accommodation', {
      is: true,
      then: (schema) => schema.required('Departure Date is required').nullable(),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
    
  first_timer: yup.boolean().required('First Timer is required'),
});

const ConferenceForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    // clearErrors,
    formState: { errors },
  } = useForm<ConferenceFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      accommodation: false,
      arrival_date: null,
      departure_date: null,
      first_timer: false,
    },
  });

  const watchAccommodation = watch('accommodation', false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ConferenceFormInputs> = async (data) => {
    try {

        const response = await axiosInstance.post('/conference/register', data);
        toast.success(response.data.message); // ✅ Display backend success message

        setTimeout(() => {
            navigate('/');
        }, 4000);
    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {
            if (error.response) {

                const { status, data } = error.response; // ✅ Extract status & data

                if (status === 422 && data.errors) {

                    Object.entries(data.errors).forEach(([field, messages]) => {
                      const messageArray = messages as string[]; // ✅ Explicitly cast as string[]
                  
                      if (Array.isArray(messageArray)) {
                          messageArray.forEach((msg) => toast.error(msg)); // ✅ Display each validation error
                      }
                  
                      // ✅ Explicitly use 'field' so ESLint does not flag it
                      setError(field as keyof ConferenceFormInputs, {
                          type: 'server',
                          message: messageArray[0], // ✅ Use first validation message
                      });
                  });
                  

                    // ✅ Set form validation errors (for inline error messages)
                    Object.keys(data.errors).forEach((field) => {
                        setError(field as keyof ConferenceFormInputs, {
                            type: 'server',
                            message: data.errors[field][0], // Show error below input field
                        });
                    });

                    return; // ✅ Stop further processing
                }

                // ✅ Handle other errors
                toast.error(data.message || "Unexpected error occurred.");
            } else {
                toast.error("No response from the server. Check your internet connection.");
            }
        } else {
            toast.error("An unexpected error occurred.");
        }
    }
};

  return (
    <div className="container mx-auto mt-10"
      style={{
        backgroundImage: `url(${pics1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
    
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md p-8 mx-auto bg-white bg-opacity-90 rounded shadow-md">
        <img src={pics1} className='rounded-full w-20 h-20' alt="Form Image" />
        <h2 className="mb-6 text-2xl font-bold">Conference Registration Closes April 30th Hurry Up & Tell Others</h2>

        <div className="mb-4">
          <label htmlFor="conference_date" className="block text-sm font-medium">Conference Date</label>
          <input type="date" id="conference_date" {...register('conference_date')} className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.conference_date && <p className="text-sm text-red-500">{errors.conference_date.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="conference_theme" className="block text-sm font-medium">Conference Theme</label>
          <input type="text" id="conference_theme" {...register('conference_theme')} className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.conference_theme && <p className="text-sm text-red-500">{errors.conference_theme.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
          <input type="text" id="fullName" {...register('full_name')} className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.full_name && <p className="text-sm text-red-500">{errors.full_name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input type="email" id="email" {...register('email')} className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone_number" className="block text-sm font-medium">Phone Number</label>
          <input type="text" id="phoneNumber" {...register('phone_number')} className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.phone_number && <p className="text-sm text-red-500">{errors.phone_number.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-medium">State</label>
          <input type="text" id="state" {...register('state')} className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="region" className="block text-sm font-medium">Region</label>
          <input type="text" id="region" {...register('region')} className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.region && <p className="text-sm text-red-500">{errors.region.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="province" className="block text-sm font-medium">Province</label>
          <input type="text" id="province" {...register('province')} className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.province && <p className="text-sm text-red-500">{errors.province.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="position" className="block text-sm font-medium">Position</label>
          <input type="text" id="position" {...register('position')} className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          {errors.position && <p className="text-sm text-red-500">{errors.position.message}</p>}
        </div>

        <div className="mb-4">
        <label htmlFor='accommodation' className="block text-sm font-medium">Do you need accommodation?</label>
        <div className="flex mt-2 space-x-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${watchAccommodation ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setValue('accommodation', !watchAccommodation)}
          >
            {watchAccommodation ? 'No' : 'Yes'}
          </button>
        </div>
      </div>

      {watchAccommodation && (
        <>
          <div className="mb-4">
            <label htmlFor='arrival_date' className="block text-sm font-medium">Arrival Date</label>
            <input type="date" {...register('arrival_date')} className="w-full p-2 mt-1 border rounded" />
            {errors.arrival_date && <p className="text-sm text-red-500">{errors.arrival_date.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor='departure_date' className="block text-sm font-medium">Departure Date</label>
            <input type="date" {...register('departure_date')} className="w-full p-2 mt-1 border rounded" />
            {errors.departure_date && <p className="text-sm text-red-500">{errors.departure_date.message}</p>}
          </div>
        </>
      )}
        <div className="mb-4">
        <label htmlFor='first_timer' className="block text-sm font-medium">Are you a first-time attendee?</label>
        <div className="flex mt-2 space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              {...register('first_timer')}
              value={"true"}
              checked={watch('first_timer') === true}
              onChange={() => setValue('first_timer', true)}
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              {...register('first_timer')}
              value={"false"}
              checked={watch('first_timer') === false}
              onChange={() => setValue('first_timer', false)}
            />
            <span className="ml-2">No</span>
          </label>
        </div>
        {errors.first_timer && <p className="text-sm text-red-500">{errors.first_timer.message}</p>}
      </div>

        <div className="flex items-center justify-between mt-6">
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none">Submit</button>
          <Link to="/" className="px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default ConferenceForm;
