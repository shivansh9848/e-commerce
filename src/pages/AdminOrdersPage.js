import AdminOrders from "../features/Admin/components/AdminOrders";
import Navbar from "../features/navbar/navbar";

function AdminOrdersPage() {
  return (
    <div>
      <Navbar>
        <AdminOrders />
      </Navbar>
    </div>
  );
}

export default AdminOrdersPage;
