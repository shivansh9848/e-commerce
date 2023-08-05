import AdminProductDetail from "../features/Admin/components/AdminProductDetail";
import Navbar from "../features/navbar/navbar";
import ProductForm from "../features/Admin/components/ProductForm";
export default function AdminProductFormPage() {
  return (
    <>
      <Navbar>
        <ProductForm />
      </Navbar>
    </>
  );
}
