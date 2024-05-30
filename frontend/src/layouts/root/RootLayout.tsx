import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../Login/stores/auth.store";
import { SideMenu } from "../../components/SideMenu";
import { sideMenuOptions } from "../../lib";
import { useEffect } from "react";
export const RootLayout = () => {
  const authStatus = useAuthStore((state) => state.authStatus);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);
  //const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (authStatus === "pending") {
      checkAuthStatus();
    }
  }, [authStatus, checkAuthStatus]);

  if (authStatus === "not-auth") {
    return <Navigate to="/login" />;
  }

  // if (!user?.roles.includes("Admin")) {
  //   return <Navigate to="/user" />;
  // }

  return (
    <div>
      <SideMenu sideMenuOptions={sideMenuOptions} />
    </div>
  );
};
