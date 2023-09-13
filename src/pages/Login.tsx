import { Navbar, Footer } from "../Components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { auth } from "../util/firabse";
import { signInWithEmailAndPassword, User, sendEmailVerification } from "firebase/auth";

const LoginForm = ({
  setRegistered,
} : {
  setRegistered: any;
}) => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: any) => {
    // TODO : HandleSubmit
    e.preventDefault();
    if(email === "" || password === ""){
      alert("Please fill all the fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser as User;
      if(user.emailVerified){
        navigate("/");
      } else {
        setRegistered(true);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-red-600 dark:border-red-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-red-600 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>

        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-red-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              placeholder="name@company.com"
              required
              onChange={handleChanges}
            />
          </div>

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
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
              onChange={handleChanges}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-red-50 focus:ring-3 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:underline dark:text-gray-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={handleSubmit}
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <a
              href="#"
              className="font-medium text-gray-600 hover:underline dark:text-gray-500"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

const VerifyEmail = () => {
  const [debounce, setDebounce] = useState(false);

  const handleSendVerification = async () => {
    if(debounce){
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
        <p className="text-xl">You are not verified yet. Please verify your email.</p>
        <button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
          onClick={handleSendVerification}
        >
          Send Verification Email
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

const Login = () => {
  const [registered, setRegistered] = useState(false);

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {!registered && <LoginForm setRegistered={setRegistered}/>}
          {registered && <VerifyEmail />}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
