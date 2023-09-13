const Navbar = () => {
  return (
    <nav className="flex flex-row items-center bg-white px-8 py-4 border-b-2">
      <h2 className="text-xl">PMO Project</h2>
      <button className="bg-red-700 text-slate-100 p-2 rounded-md ml-auto hover:bg-red-400">
        Join us
      </button>
    </nav>
  );
};

export default Navbar;