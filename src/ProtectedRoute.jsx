import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./components/auth/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole }) => {
  const { user } = useAuth(); // Hook để lấy thông tin người dùng

  // Đảm bảo requiredRole là một mảng
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  // Kiểm tra quyền truy cập
  const hasAccess = roles.some((role) => user?.roles?.includes(role));

  useEffect(() => {
    // Nếu không có quyền thì hiển thị thông báo lỗi
    if (user && !hasAccess) {
      toast.error("You don’t have permission to access this page.");
    }
  }, [hasAccess, user]);

  // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Nếu có quyền, trả về phần tử
  if (hasAccess) {
    return element;
  }

  // Nếu người dùng đã đăng nhập nhưng không có quyền truy cập (role STAFF)
  if (user.roles.includes("STAFF")) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
        <p className="text-gray-600">
          You don’t have permission to access this page.
        </p>
      </div>
    );
  }

  // Trường hợp không có quyền, chuyển hướng về trang login
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
