import { createContext } from "react";

export const AppContext = createContext({
  isLoggedIn: false,
  username: "",
  userLevel: 0,
  userImage: "",
  userCredential: "",
  login: (cred: string) => {},
  logout: () => {},
  setUserLevel: (level: number) => {},
  setUsername: (name: string) => {},
});
