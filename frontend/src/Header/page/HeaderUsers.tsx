import { Toaster } from "sonner";
import { Header } from "../components/Header";
// import User from "../components/User";

export const HeaderUsers = () => {
  return (
    <div>
      <Toaster position="top-right" richColors closeButton />
      <Header />
    </div>
  );
};
