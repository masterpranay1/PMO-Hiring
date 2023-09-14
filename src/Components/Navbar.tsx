import { useNavigate } from "react-router-dom";
import { auth } from "../util/firabse";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Loader } from "../Components";

const Navbar = () => {
  const navigate = useNavigate();

  const [loadingSignOut, setLoadingSignOut] = useState(false);

  const { currentUser } = auth;
  const isVerified = currentUser?.emailVerified;
  return (
    <nav className="flex flex-row items-center bg-white px-8 py-4 border-b-2">
      <h2
        className="text-xl cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        PMO Project
      </h2>
      {(!currentUser || !isVerified) && (
        <button
          className="bg-red-700 text-slate-100 p-2 rounded-md ml-auto hover:bg-red-400"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
      )}

      {(!currentUser || !isVerified) && (
        <button
          className="bg-red-700 text-slate-100 p-2 rounded-md ml-4 hover:bg-red-400"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      )}

      {currentUser && isVerified && (
        <button
          className="bg-red-700 text-slate-100 p-2 rounded-md ml-auto hover:bg-red-400 flex flex-row items-center justify-center"
          onClick={async () => {
            setLoadingSignOut(true);
            await signOut(auth);
            setLoadingSignOut(false);
          }}
        >
          {loadingSignOut ? <Loader /> : <p>SignOut</p>}
        </button>
      )}
    </nav>
  );
};

export default Navbar;
