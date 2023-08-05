import AdminProductList from "../features/Admin/components/AdminProductList";
import Navbar from "../features/navbar/navbar";
export default function Home() {
  return (
    <>
      <Navbar>
        <AdminProductList />
      </Navbar>
    </>
  );
}
