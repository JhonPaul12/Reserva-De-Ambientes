
import { sideMenuOptionsIni } from "../../lib/constants";
import { Barra } from "./components/Barra";
import { HeaderIni } from "./components/HeaderIni";

export const IniLayout = () => {
  //const user = useAuthStore((state) => state.user);


  // if (!user?.roles.includes("Admin")) {
  //   return <Navigate to="/user" />;
  // }

  return (
    <div>
      <HeaderIni />
      <Barra sideMenuOptionsIni={sideMenuOptionsIni} />
    </div>
  );
};