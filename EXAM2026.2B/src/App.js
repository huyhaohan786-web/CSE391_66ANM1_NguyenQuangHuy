import { useEffect, useState } from "react";
import dataMau from "./data/dataMau";
import Form from "./components/Form";
import List from "./components/List";

function App() {
  const [danhSach, setDanhSach] = useState([]);

  useEffect(() => {
    setDanhSach(dataMau);
  }, []);

  const luu = (item) => {
    setDanhSach([...danhSach, { ...item, id: Date.now() }]);
  };

  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      <h3 className="text-center mb-4 fw-bold text-primary">
        DANH SÁCH HỌC BỔNG 2026
      </h3>
      
      <Form luu={luu} />
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 text-secondary">Số lượng: {danhSach.length}</h5>
      </div>
      
      <List danhSach={danhSach} />
    </div>
  );
}

export default App;