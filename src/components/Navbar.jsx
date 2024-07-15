/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../utils/schema";
import { db } from "../../utils/db";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(); // Initial fetch of user data
  }, []);

  const getUser = async () => {
    try {
      const result = await db.select().from(User);
      if (result.length > 0) {
        setUser(result[0]);
      } else {
        setUser(null); // Set user to null if no user is found
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null); // Set user to null on error
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent text-white p-4">
        <div className="container ">
          <Link className="navbar-brand fw-bold text-white" to={"/home"}>
            ZZZ
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse my-auto" id="navbarNav">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to={"/list"}>
                  List course
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
