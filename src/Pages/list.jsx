/* eslint-disable react/prop-types */
import Table from "../components/Table";

const ListContent = ({ userId }) => {
  const backGround = {
    backgroundImage: "url('/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // Contoh untuk membuat background mengisi seluruh layar
    margin: 0,
    padding: 0,
    overflow: "hidden",
  };
  return (
    <>
      <div>
        <h1 className="text-center mt-2 text-white">course list</h1>
        <Table userId={userId} />
      </div>
    </>
  );
};

export default ListContent;
