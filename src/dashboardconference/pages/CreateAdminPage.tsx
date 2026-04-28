import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useCreateAdmin } from "../hooks/useConferenceManagerAuth";
import type { CreateAdminDTO } from "../types/conferenceManager";

const CreateAdminPage: React.FC = () => {
  const createAdminMutation = useCreateAdmin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAdminDTO>({
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: CreateAdminDTO) => {
    try {
      await createAdminMutation.mutateAsync(data);
      reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        if (typeof responseData?.message === "string") {
          toast.error(responseData.message);
          return;
        }

        if (
          responseData?.message &&
          typeof responseData.message === "object"
        ) {
          const messages = Object.values(responseData.message)
            .flat()
            .join(" ");
          toast.error(messages || "Validation failed.");
          return;
        }

        if (
          responseData?.errors &&
          typeof responseData.errors === "object"
        ) {
          const messages = Object.values(responseData.errors)
            .flat()
            .join(" ");
          toast.error(messages || "Validation failed.");
          return;
        }

        toast.error(responseData?.error || "Failed to create admin.");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-2xl bg-white border rounded-3xl p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Conference Manager
        </p>
        <h1 className="text-3xl font-bold mt-2 mb-6">Create Admin</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              {...register("full_name", { required: "Full name is required" })}
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
                {...register("email", { required: "Email is required" })}
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
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                {...register("password_confirmation", {
                  required: "Password confirmation is required",
                })}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Confirm password"
              />
              {errors.password_confirmation && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={createAdminMutation.isPending}
            className="rounded-xl bg-blue-600 text-white px-6 py-3 font-semibold disabled:opacity-50"
          >
            {createAdminMutation.isPending ? "Creating..." : "Create Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminPage;