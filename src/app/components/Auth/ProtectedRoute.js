import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useRequireAuth = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (user === null) {
      router.push("/auth/sign-in"); 
    }
  }, [user, router]);

  return user;
};

const ProtectedRoute = ({ children }) => {
  const user = useRequireAuth();

  return user ? children : null;
};

export default ProtectedRoute;
