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
  apellidos: string;
  telefono: string;
  codigo_sis: string;
  email: string;
  email_verified_at: null;
  created_at: string;
  updated_at: string;
  roles: string[];
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
  checkAuthStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

const storeApi: StateCreator<authState & Actions> = (set, get) => ({
  user: undefined,
  token: undefined,
  authStatus: "pending",

  login: async (email, password) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
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
      toast.error("Error al iniciar sesión");
    }
  },

  checkAuthStatus: async () => {
    const token = get().token;
    if (!token) {
      set(() => ({
        user: undefined,
        token: undefined,
        authStatus: "not-auth",
      }));
      return;
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/auth/checkToken",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      set(() => ({
        user: data.user,
        token: token,
        authStatus: "auth",
      }));
    } catch (error) {
      set(() => ({
        user: undefined,
        token: undefined,
        authStatus: "not-auth",
      }));
      return;
    }
  },

  logout: async () => {
    const token = get().token;

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      set(() => ({
        user: undefined,
        token: undefined,
        authStatus: "not-auth",
      }));
      console.log(data);
      toast.success("Sesión cerrada con exito");
    } catch (error) {
      toast.error("Error al cerrar sesión" + error);
    }
  },
});

export const useAuthStore = create<authState & Actions>()(
  persist(storeApi, {
    name: "auth-store",
  })
);
