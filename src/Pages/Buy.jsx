import { useEffect, useState } from "react";
import { db } from "../../utils/db";
import { List } from "../../utils/schema";
import { Link, useParams } from "react-router-dom";
import { eq } from "drizzle-orm";

const Buy = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (id) {
      getContent(id);
    }
  }, [id]);

  const getContent = async (id) => {
    try {
      const result = await db
        .select()
        .from(List)
        .where(eq(List.id, Number(id)));
      if (result.length > 0) {
        setContent(result[0]);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  return (
    <>
      {content ? (
        <>
          <div className="d-flex justify-content-center">
            <h1>{content.title}</h1>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <div className="card" style={{ width: "18rem" }}>
              <img src={content.img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{content.title}</h5>
                <p className="card-text">{content.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{content.detail}</li>
                <li className="list-group-item">price {content.price}</li>
              </ul>
              <div className="card-body">
                <Link to={"#"} className="card-link">
                  <button className="btn btn-success">payment</button>
                </Link>
                <Link to={"/list"} className="card-link">
                  <button className="btn btn-danger">back to list</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Buy;
