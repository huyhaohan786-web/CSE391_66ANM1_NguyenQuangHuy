function Item({ item }) {
  return (
    <div className="card mb-2 border-0 shadow-sm border-start border-primary border-4">
      <div className="card-body py-2 px-3 d-flex justify-content-between align-items-center">
        <div>
          <strong className="text-dark">{item.ten}</strong>
          <span className="text-muted ms-2">| {item.donvitt}</span>
        </div>
        <div className="text-end">
          <span className="badge bg-light text-primary border me-2">
            {Number(item.soTien).toLocaleString()} VNĐ
          </span>
          <small className="text-secondary">📅 {item.hanNop || "N/A"}</small>
        </div>
      </div>
    </div>
  );
}

export default Item;