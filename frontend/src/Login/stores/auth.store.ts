import { toast } from "sonner";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

interface IloginResponse {
  user: IUser;
  token: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
//Guardamos estados
interface authState {
  user: undefined | IUser;
  token: undefined | string;
  authStatus: "pending" | "auth" | "not-auth";
}

//Guardamos las funciones que cambian el estado
interface Actions {
  login: (email: string, password: string) => Promise<void>;
}

const storeApi: StateCreator<authState & Actions> = (set) => ({
  user: undefined,
  token: undefined,
  authStatus: "pending",

  login: async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data: IloginResponse = await response.json();
      set(() => ({
        user: data.user,
        token: data.token,
        authStatus: "auth",
      }));
      toast.success("Bienvenido " + data.user.name);
    } catch (error) {
      set(() => ({
        user: undefined,
        token: undefined,
        authStatus: "not-auth",
      }));
      console.log(error);
    }
  },
});

export const useAuthStore = create<authState & Actions>()(
  persist(storeApi, {
    name: "auth-store",
  })
);
