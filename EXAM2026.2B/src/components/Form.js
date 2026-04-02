import { useState } from "react";

function Form({ luu }) {
  const [ten, setTen] = useState("");
  const [donvitt, setDonvitt] = useState("");
  const [soTien, setSoTien] = useState("");
  const [hanNop, setHanNop] = useState("");
  const [email, setEmail] = useState("");
  const [loi, setLoi] = useState({});

  const validate = () => {
    const e = {};
    if (!ten.trim()) e.ten = "Tên không được để trống";
    if (!donvitt.trim()) e.donvitt = "Đơn vị không được để trống";
    if (!soTien || soTien <= 0) e.soTien = "Số tiền phải lớn hơn 0";
    if (!hanNop) e.hanNop = "Vui lòng chọn hạn nộp";
    
    setLoi(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    luu({ ten, donvitt, soTien, email, hanNop });

    // Reset Form sau khi thêm
    setTen(""); setDonvitt(""); setSoTien(""); setHanNop(""); setEmail(""); setLoi({});
  };

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <form onSubmit={submit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input className={`form-control ${loi.ten ? 'is-invalid' : ''}`} placeholder="Tên học bổng" value={ten} onChange={e => setTen(e.target.value)} />
          </div>
          <div className="col-md-6">
            <input className={`form-control ${loi.donvitt ? 'is-invalid' : ''}`} placeholder="Đơn vị tài trợ" value={donvitt} onChange={e => setDonvitt(e.target.value)} />
          </div>
          <div className="col-md-4">
            <input type="number" className={`form-control ${loi.soTien ? 'is-invalid' : ''}`} placeholder="Số tiền (VNĐ)" value={soTien} onChange={e => setSoTien(e.target.value)} />
          </div>
          <div className="col-md-4">
            <input type="date" className={`form-control ${loi.hanNop ? 'is-invalid' : ''}`} value={hanNop} onChange={e => setHanNop(e.target.value)} />
          </div>
          <div className="col-md-4">
            <input type="email" className="form-control" placeholder="Email (không bắt buộc)" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100 fw-bold py-2">THÊM VÀO DANH SÁCH</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;