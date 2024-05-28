import { useEffect } from "react";
import { useAuthStore } from "../../Login/stores/auth.store";
import { SideMenu } from "../../components/SideMenu";
import { sideMenuOptionsUser } from "../../lib/constants";
import { Navigate } from "react-router-dom";

export const UserLayout = () => {
  const authStatus = useAuthStore((state) => state.authStatus);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    if (authStatus === "pending") {
      checkAuthStatus();
    }
  }, [authStatus, checkAuthStatus]);

  if (authStatus === "not-auth") {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <SideMenu sideMenuOptions={sideMenuOptionsUser} />
    </div>
  );
};
