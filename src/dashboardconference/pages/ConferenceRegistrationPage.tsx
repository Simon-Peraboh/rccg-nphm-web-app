import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useActiveConference,
} from "../hooks/useConferenceManagerQueries";
import {
  useRegisterConference,
} from "../hooks/useConferenceManagerAuth";
import type { RegisterConferenceDTO } from "../types/conferenceManager";
import { formatDisplayDate } from "../utils/formatters";
<<<<<<< HEAD
import confereFlyer from '../../assets/Images/conf26.jpeg'
=======
import confereFlyer from '../../assets/Images/nphm conf2026.jpeg'
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f

const schema: yup.ObjectSchema<RegisterConferenceDTO> = yup.object({
  full_name: yup.string().required("Full name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  phone_number: yup.string().required("Phone number is required"),
  state: yup.string().required("State is required"),
  region: yup.string().required("Region is required"),
  province: yup.string().required("Province is required"),
  position: yup.string().required("Position is required"),
  accommodation: yup.boolean().required(),
  arrival_date: yup.string().nullable().when("accommodation", {
    is: true,
    then: (schema) => schema.required("Arrival date is required"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  departure_date: yup.string().nullable().when("accommodation", {
    is: true,
    then: (schema) => schema.required("Departure date is required"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  first_timer: yup.boolean().required(),
});

const ConferenceRegistrationPage: React.FC = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState<null | {
    first_name: string;
    registration_code: string;
    temporary_password?: string | null;
    conference_title?: string;
    conference_theme?: string;
    is_new_user: boolean;
  }>(null);
  //const navigate = useNavigate();

  const {
    data: activeConference,
    isLoading: activeConferenceLoading,
    isError: activeConferenceError,
    error: activeConferenceErrorObj,
  } = useActiveConference();

  const registerMutation = useRegisterConference();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<RegisterConferenceDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
      accommodation: false,
      arrival_date: null,
      departure_date: null,
      first_timer: false,
      email: "",
    },
  });




  const watchAccommodation = watch("accommodation", false);

  const onSubmit: SubmitHandler<RegisterConferenceDTO> = async (data) => {
    try {
      const response = await registerMutation.mutateAsync(data);
      setRegistrationSuccess({
        first_name: response.data.first_name,
        registration_code: response.data.registration_code,
        temporary_password: response.data.temporary_password ?? null,
        conference_title: response.data.conference_title,
        conference_theme: response.data.conference_theme,
        is_new_user: response.data.is_new_user,
      });

      toast.success(response.message);

      if (response.data.already_registered) {
        toast.info(`You are already registered. Code: ${response.data.registration_code}`);
      }

      if (response.data.is_new_user && response.data.temporary_password) {
        toast.info(
          `Temporary Password: ${response.data.temporary_password}`,
          { autoClose: 12000 }
        );
      }




    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        if (error.response?.status === 422 && responseData?.errors) {
          Object.keys(responseData.errors).forEach((field) => {
            const fieldMessages = responseData.errors[field];
            if (Array.isArray(fieldMessages) && fieldMessages.length > 0) {
              setError(field as keyof RegisterConferenceDTO, {
                type: "server",
                message: fieldMessages[0],
              });
            }
          });
        }

        toast.error(
          responseData?.message ||
          responseData?.error ||
          "Conference registration failed."
        );
      } else {
        toast.error("Unexpected error occurred during registration.");
      }
    }
  };

  if (activeConferenceLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 text-lg">Loading conference details...</p>
      </div>
    );
  }

  if (activeConferenceError || !activeConference) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="max-w-xl w-full bg-white border rounded-3xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Conference Not Available</h2>
          <p className="mt-3 text-slate-600">
            {axios.isAxiosError(activeConferenceErrorObj)
              ? activeConferenceErrorObj.response?.data?.message || "Could not load active conference."
              : "Could not load active conference."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] bg-white border border-slate-200 p-8 shadow-sm">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Conference Manager
            </p>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">
              Register for {activeConference.title}
            </h1>
            <p className="text-slate-600 mt-2">
              Register once, Pls keep Password For Future Use.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-8">
            <div className="rounded-2xl bg-slate-50 border p-4">
              <p className="text-xs uppercase text-slate-500">Conference Theme</p>
              <p className="mt-1 font-semibold text-slate-900">{activeConference.theme}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 border p-4">
              <p className="text-xs uppercase text-slate-500">Conference Year</p>
              <p className="mt-1 font-semibold text-slate-900">{activeConference.year}</p>
            </div>
          </div>
          {registrationSuccess && (
            <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5">
              <h3 className="text-xl font-bold text-green-700">Registration Successful</h3>

              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p><strong>First Name:</strong> {registrationSuccess.first_name}</p>
                <p><strong>Conference Code:</strong> {registrationSuccess.registration_code}</p>
                <p><strong>Conference:</strong> {registrationSuccess.conference_title}</p>
                <p><strong>Theme:</strong> {registrationSuccess.conference_theme}</p>

                {registrationSuccess.is_new_user ? (
                  <p><strong>Temporary Password:</strong> {registrationSuccess.temporary_password ?? "-"}</p>
                ) : (
                  <p><strong>Password:</strong> Use your existing password.</p>
                )}
              </div>

              <Link
                to="/dashboardconference/login"
                className="inline-block mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white font-medium"
              >
                Proceed to Login
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                {...register("full_name")}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Enter full name"
              />
              {errors.full_name && (
                <p className="text-sm text-red-500 mt-1">{errors.full_name.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  {...register("phone_number")}
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Enter phone number"
                />
                {errors.phone_number && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone_number.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  {...register("state")}
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Region</label>
                <input
                  {...register("region")}
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Enter region"
                />
                {errors.region && (
                  <p className="text-sm text-red-500 mt-1">{errors.region.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Province</label>
                <input
                  {...register("province")}
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Enter province"
                />
                {errors.province && (
                  <p className="text-sm text-red-500 mt-1">{errors.province.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <input
                  {...register("position")}
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Enter position"
                />
                {errors.position && (
                  <p className="text-sm text-red-500 mt-1">{errors.position.message}</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border p-4">
              <p className="text-sm font-medium mb-3">Do you need accommodation?</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setValue("accommodation", true)}
                  className={`px-4 py-2 rounded-xl border ${watchAccommodation ? "bg-blue-600 text-white border-blue-600" : "bg-white"
                    }`}
                >
                  Yes
                </button>

                <button
                  type="button"
                  onClick={() => setValue("accommodation", false)}
                  className={`px-4 py-2 rounded-xl border ${!watchAccommodation ? "bg-blue-600 text-white border-blue-600" : "bg-white"
                    }`}
                >
                  No
                </button>
              </div>
            </div>

            {watchAccommodation && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Arrival Date</label>
                  <input
                    type="date"
                    {...register("arrival_date")}
                    className="w-full rounded-xl border px-4 py-3"
                  />
                  {errors.arrival_date && (
                    <p className="text-sm text-red-500 mt-1">{errors.arrival_date.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Departure Date</label>
                  <input
                    type="date"
                    {...register("departure_date")}
                    className="w-full rounded-xl border px-4 py-3"
                  />
                  {errors.departure_date && (
                    <p className="text-sm text-red-500 mt-1">{errors.departure_date.message}</p>
                  )}
                </div>
              </div>
            )}

            <div className="rounded-2xl border p-4">
              <p className="text-sm font-medium mb-3">Are you a first-time attendee?</p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={watch("first_timer") === true}
                    onChange={() => setValue("first_timer", true)}
                  />
                  <span>Yes</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={watch("first_timer") === false}
                    onChange={() => setValue("first_timer", false)}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.first_timer && (
                <p className="text-sm text-red-500 mt-1">{errors.first_timer.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="rounded-xl bg-blue-600 text-white px-6 py-3 font-semibold disabled:opacity-50"
              >
                {registerMutation.isPending ? "Submitting..." : "Submit Registration"}
              </button>

              <Link
                to="/"
                className="rounded-xl border px-6 py-3 font-semibold"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div className="rounded-[28px] bg-slate-900 text-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Current Conference</p>
          <h2 className="text-3xl font-bold mt-3">{activeConference.theme}</h2>
          <p className="mt-3 text-slate-300">{activeConference.title}</p>
          <div className="mt-6 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={confereFlyer}
              alt="Conference Flyer"
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-slate-300">Abbreviation</p>
              <p className="font-semibold">{activeConference.abbreviation}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-slate-300">Registration Status</p>
              <p className="font-semibold capitalize">{activeConference.status}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs text-slate-300">Dates</p>
              <p className="font-semibold">
                {formatDisplayDate(activeConference.start_date)} — {formatDisplayDate(activeConference.end_date)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceRegistrationPage;