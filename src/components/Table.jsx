/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { db } from "../../utils/db";
import { List, User } from "../../utils/schema";
import { Link } from "react-router-dom";
import { eq } from "drizzle-orm";

const Table = ({ userId }) => {
  const [contents, setContents] = useState([]);
  const [user, setUser] = useState(null); // Updated to null for initial state

  useEffect(() => {
    getUser(); // Fetch user data when component mounts
    getContents(); // Fetch contents data when component mounts
  }, []);

  const getUser = async () => {
    try {
      const result = await db.select().from(User).where(eq(User.id, userId));
      if (result.length > 0) {
        setUser(result[0]);
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getContents = async () => {
    const result = await db.select().from(List);
    setContents(result);
  };

  const deleteContents = async (id) => {
    await db.delete(List).where(eq(List.id, id));
    getContents(); // Refresh contents after deletion
  };

  // Ensure user data is loaded before rendering
  if (!user) return null;

  const handleLogout = () => {
    setUser(null); // Clear user data locally
    localStorage.clear(); // Clear all items in localStorage
    // Redirect to login page after logout
    window.location.href = "/login"; // Example redirect using window.location
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          {user.role === "admin" && ( // Check user role for conditional rendering
            <Link to={"/create"}>
              <button className="btn btn-primary mb-2">create</button>
            </Link>
          )}
          <button className="btn btn-danger mb-2" onClick={handleLogout}>
            logout
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th> {/* Updated column header */}
              <th scope="col">Content</th> {/* Updated column header */}
              <th scope="col">Action</th> {/* Updated column header */}
            </tr>
          </thead>
          <tbody>
            {contents.map(
              (
                item,
                index // Use index for unique key
              ) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.content}</td>
                  <td className="grid gap-2">
                    {user.role === "admin" && ( // Check user role for conditional rendering
                      <Link to={`/update/${item.id}`}>
                        <button className="btn btn-primary ms-1">update</button>
                      </Link>
                    )}
                    {user.role === "admin" && ( // Check user role for conditional rendering
                      <button
                        className="btn btn-danger ms-1"
                        onClick={() => deleteContents(item.id)}
                      >
                        delete
                      </button>
                    )}
                    <Link to={`/buy/${item.id}`}>
                      <button className="btn btn-success ms-1">buy</button>
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
