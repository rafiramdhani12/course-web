import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container d-flex justify-content-center mt-5 flex-column">
        <h1 className="text-center pb-3 text-white">welcome to zzz course </h1>
        <Link to={"/list"} className="text-center" target="_blank">
          <button className="btn btn-primary p-2">start course</button>
        </Link>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <p className="bg-primary p-4 text-light  rounded-4">
          this is my experimental code with drizzle orm neon database postgresql
        </p>
      </div>
    </>
  );
};

export default Home;
