import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./components/auth/AuthContext";

const ProtectedRoute = ({ element, requiredRole }) => {
  const { user } = useAuth(); // Giả định bạn có hook để lấy thông tin người dùng

  // Đảm bảo requiredRole là một mảng
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  // Kiểm tra quyền truy cập
  const hasAccess = roles.some((role) => user?.roles.includes(role));

  useEffect(() => {
    // Nếu không có quyền thì hiển thị thông báo lỗi
    if (!hasAccess) {
      toast.error("You don’t have permission to access this page.");
    }
  }, [hasAccess]);

  // Nếu có quyền, trả về phần tử
  if (hasAccess) {
    return element;
  }

  // Nếu không có quyền, trả về null hoặc có thể hiển thị một thông báo tùy chỉnh thay vì điều hướng
  return (
    <div className="text-center py-10">
      <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
      <p className="text-gray-600">
        You don’t have permission to access this page.
      </p>
    </div>
  );
};

export default ProtectedRoute;
