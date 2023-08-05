import AdminProductDetail from "../features/Admin/components/AdminProductDetail";
import Navbar from "../features/navbar/navbar";
// import ProductDetail from "../features/product/components/ProductDetail";
export default function AdminProductDetailPage() {
  return (
    <>
      <Navbar>
        <AdminProductDetail />
      </Navbar>
    </>
  );
}
