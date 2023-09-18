import { useRef } from "react";
import { Footer, Navbar, JobCard } from "../Components";

const Hero = ({JobOpeningRef} : {JobOpeningRef:any}) => {

  const handelClick = () => {
    JobOpeningRef.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div
      className="relative overflow-hidden bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')`,
        height: `100vh`,
        backgroundPosition: `50%`,
      }}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
        <div className="flex h-full items-center justify-center">
          <div className="px-6 text-center text-white md:px-12 flex flex-col">
            <h1 className="mt-2 mb-16 text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
              Join the Future with AI: <br />
              <span className="text-red-600">
                Be Part of Our Prime Minister's Vision
              </span>
            </h1>
            <div className="flex flex-row flex-wrap justify-center gap-4 w-fit mx-auto mt-8">
              <button
                type="button"
                className="px-6 py-2 md:px-10 md:py-4 border rounded"
                onClick={handelClick}
              >
                Explore opportunity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobOpenings = ({refEl} : {refEl : any}) => {
  return (
    <section className="w-full min-h-screen p-12" ref={refEl}>
      <h2 className="text-5xl font-bold text-red-700 mx-auto w-fit text-center">Job Openings</h2>

      <div className="flex flex-row flex-wrap justify-center gap-12 w-fit mx-auto mt-32">
        <JobCard title="Tech" desc="Join the Technical team and dive into the world of AI" link="#" />
        <JobCard title="Non-Tech" desc="Join the Non-Technical team" link="#" />
        <JobCard title="Research And Development" desc="Join the Research and Development" link="#" />
      </div>
    </section>
  );
};

const Home = () => {

  const JobOpeniningRef = useRef(null);

  return (
    <section className="w-full min-h-screen">
      <Navbar />
      <Hero JobOpeningRef={JobOpeniningRef}/>
      <JobOpenings refEl={JobOpeniningRef}/>
      <Footer />
    </section>
  );
};

export default Home;
