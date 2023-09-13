import { Navbar, Footer } from "../Components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { auth } from "../util/firabse";
import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const RegisterForm = ({
  setIsRegistered,
}: {
  setIsRegistered: any;
}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "confirm-password") {
      setConfirmPassword(value);
    }
  };

  const handleTermsChange = () => {
    setTerms(!terms);
  };

  const handleSubmit = async (e: any) => {
    // TODO : HandleSubmit
    e.preventDefault();
    // console.log(email, password, confirmPassword, terms);
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser as User;
      await sendEmailVerification(user);
      alert("Email verification sent");

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setIsRegistered(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-red-600 md:text-2xl dark:text-white">
          Create an account
        </h1>

        {/* Controlled Form */}
        <form className="space-y-4 md:space-y-6" action="#">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="uid@cuchd.in"
              required
              onChange={handleChanges}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChanges}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="confirm-password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handleChanges}
            />
          </div>

          {/* Terms and Condition Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required
                onAbort={handleTermsChange}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          {/* button */}
          <button
            type="submit"
            className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={handleSubmit}
          >
            Create an account
          </button>

          {/* Link to Login */}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

const PostRegister = () => {
  const [debounce, setDebounce] = useState(false);

  const handleSendVerification = async () => {

    if(debounce) {
      alert("Please wait for 10 seconds before resending the verification email.");
      return;
    }

    const user = auth.currentUser as User;
    await sendEmailVerification(user);
    alert("Email verification sent");

    setDebounce(true);
    setTimeout(() => {
      setDebounce(false);
    }, 10000);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col gap-4">
        <p className="text-xl">Verification Email Sent. Please check your email.</p>
        <button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
          onClick={handleSendVerification}
        >
          Resend Verification Email
        </button>
        {debounce && (
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Please wait for 10 seconds before resending the verification email.
          </p>
        )}
      </div>
    </div>
  );
};

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {!isRegistered && (
            <RegisterForm
              setIsRegistered={setIsRegistered}
            />
          )}

          {isRegistered && <PostRegister />}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
