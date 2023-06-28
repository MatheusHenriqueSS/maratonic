/* eslint-disable react/jsx-no-undef */
"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("from") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const signInResult = await signIn("email", {
      redirect: false,
      email: formValues.email.toLowerCase(),
      callbackUrl,
    });

    setLoading(false);
    //move this to externa component
    if (!signInResult?.ok) {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return toast.info(
      "We sent you a login link via email. Be sure to check spam.",
      {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit}>
        {error && (
          <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
        )}
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to MaratonIC
        </h3>
        <div>
          <label
            htmlFor="email"
            className="mt-2 text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            onChange={handleChange}
            value={formValues.email}
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Email address"
            required
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
          className="mt-10 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
      </form>
      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>
      <button
        disabled={loading}
        onClick={() => signIn("google", { callbackUrl })}
        // style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        className="flex items-center justify-center w-full text-black bg-white-700 hover:bg-gray-100 focus:ring-4 shadow-md border border-gray-200 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <Image
          className="mr-3"
          src="/google.svg"
          width={20}
          height={20}
          alt="Google icon"
        />
        <span>Continue with Google</span>
      </button>
      <button
        disabled={loading}
        onClick={() => {
          signIn("github", { callbackUrl });
        }}
        // style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        className="flex items-center justify-center w-full text-black bg-white-700 hover:bg-gray-100 focus:ring-4 shadow-md border border-gray-200 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <Image
          className="mr-3"
          src="/github.svg"
          width={20}
          height={20}
          alt="Github icon"
        />
        <span>Continue with Github</span>
      </button>
    </div>
  );
};
