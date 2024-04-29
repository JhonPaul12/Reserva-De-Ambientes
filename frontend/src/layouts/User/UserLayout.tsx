import { SideMenu } from "../../components/SideMenu";
import { sideMenuOptionsUser } from "../../lib/constants";

export const UserLayout = () => {
  return (
    <div>
      <SideMenu sideMenuOptions={sideMenuOptionsUser} />
    </div>
  );
};
