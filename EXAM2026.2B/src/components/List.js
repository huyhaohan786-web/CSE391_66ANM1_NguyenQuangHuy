import Item from "./Item";

function List({ danhSach }) {
  return (
    <div className="mt-4">
      {danhSach.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;