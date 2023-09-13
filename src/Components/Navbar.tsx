import { useNavigate } from "react-router-dom";
import { auth } from "../util/firabse";

const Navbar = () => {
  const navigate = useNavigate();

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
      {(!currentUser || !isVerified) && <button className="bg-red-700 text-slate-100 p-2 rounded-md ml-auto hover:bg-red-400"
      onClick={() => {
        navigate("/register");
      }}>
        Register
      </button>}

      {(!currentUser || !isVerified) && <button className="bg-red-700 text-slate-100 p-2 rounded-md ml-4 hover:bg-red-400"
      onClick={() => {
        navigate("/login");
      }}>
        Login
      </button>}

      {
        (currentUser && isVerified) && <button className="bg-red-700 text-slate-100 p-2 rounded-md ml-auto hover:bg-red-400"
        onClick={() => {
          navigate("/dashboard");
        }
        }>
          Dashboard
        </button>
      }
    </nav>
  );
};

export default Navbar;
