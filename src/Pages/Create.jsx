/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/db";
import { List } from "../../utils/schema";

const Create = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [description, setDescription] = useState();
  const [detail, setDetail] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState();
  const [save, setSave] = useState();
  const navigate = useNavigate();
  const createData = async () => {
    const result = await db
      .insert(List)
      .values({
        title: title,
        content: content,
        description: description,
        detail: detail,
        price: price,
        img: img,
      })
      .returning({ id: List.id });
    setSave(result);
    navigate("/list");
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
              onChange={(e) => setTitle(e.target.value)}
              name="title"
            />
          </div>
          <div className="p-2 g-col-6">
            <input
              className="p-2"
              type="text"
              name="content"
              placeholder="content"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="p-2 g-col-6">
            <textarea
              className="p-2"
              type="text"
              name="description"
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="p-2 g-col-6">
            <input
              className="p-2"
              type="text"
              name="detail"
              placeholder="detail"
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
          <div className="p-2 g-col-6">
            <input
              className="p-2"
              type="text"
              name="price"
              placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="p-2 g-col-6">
            <input
              className="p-2"
              type="text"
              name="img"
              placeholder="content"
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={createData}>
          update
        </button>
      </div>
    </>
  );
};

export default Create;
