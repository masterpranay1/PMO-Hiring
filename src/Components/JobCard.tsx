import { useNavigate } from "react-router-dom";

const JobCard = ({
  title,
  desc,
  link,
}: {
  title: string;
  desc: string;
  link: string;
}) => {
  const navigate = useNavigate();
  console.log(link);
  return (
    <div className="w-full md:w-1/4 h-72 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <a href="#">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h3>
      </a>
      <p className="mb-3 font-normal text-xl h-24 md:h-32 text-gray-700 dark:text-gray-400">
        {desc}
      </p>
      <a
        href="#"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-auto w-fit"
        onClick={(e) => {
          e.preventDefault();
          navigate("/hiring-form?type=" + title);
        }}
      >
        Apply now
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
};

export default JobCard;
