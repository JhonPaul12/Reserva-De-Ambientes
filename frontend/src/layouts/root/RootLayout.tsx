import { SideMenu } from "../../components/SideMenu";
import { sideMenuOptions } from "../../lib";
export const RootLayout = () => {
  return (
    <div>
      <SideMenu sideMenuOptions={sideMenuOptions} />
    </div>
  );
};
