import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../utils/db";
import { List } from "../../utils/schema";
import { eq } from "drizzle-orm";

const Update = () => {
  const { id } = useParams();
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    description: "",
    detail: "",
    price: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await db
          .select()
          .from(List)
          .where(eq(List.id, Number.id));
        if (result.length > 0) {
          setEditData({
            title: result[0].title,
            content: result[0].content,
            description: result[0].description,
            detail: result[0].detail,
            price: result[0].price,
          });
        }
      } catch (error) {
        console.error("error loading data : ", error);
      }
    };
    loadData();
  }, [id]);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };
  const updateData = async (id, newData) => {
    try {
      await db
        .update(List)
        .set(newData)
        .where(eq(List.id, Number(id)));
      navigate("/list");
    } catch (error) {
      console.error("error updating data: ", error);
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center mt-5 ">
        <div className="grid gap-3">
          <div className="p-2 g-col-6">
            <input
              className="p-2"
              type="text"
              placeholder="title"
              onChange={handleEdit}
              name="title"
            />
          </div>
          <div className="p-2 g-col-6">
            <input
              className="p-2"
              type="text"
              name="content"
              placeholder="content"
              onChange={handleEdit}
            />
          </div>
          <div className="p-2 g-col-6">
            <input
              className="p-2"
              type="text"
              name="description"
              placeholder="description"
              onChange={handleEdit}
            />
          </div>
          <div className="p-2 g-col-6">
            <input
              className="p-2"
              type="text"
              name="detail"
              placeholder="detail"
              onChange={handleEdit}
            />
          </div>
          <div className="p-2 g-col-6">
            <input
              className="p-2"
              type="text"
              name="price"
              placeholder="price"
              onChange={handleEdit}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary"
          onClick={() => updateData(id, editData)}
        >
          update
        </button>
      </div>
    </>
  );
};

export default Update;
