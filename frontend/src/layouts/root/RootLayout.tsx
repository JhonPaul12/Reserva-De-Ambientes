import { SideMenu } from "../../components/SideMenu";
import { sideMenuOptions } from "../../lib";
export const RootLayout = () => {
  return (
    <div className="w-full h-screen ">
      <SideMenu sideMenuOptions={sideMenuOptions} />
    </div>
  );
};
