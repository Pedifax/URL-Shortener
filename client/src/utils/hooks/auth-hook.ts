import { useState } from "react";
import api from "../../utils/api";

export const useAuth = () => {
  const [username, setUsername] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
  const [userLevel, setUserLevel] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userCredential, setUserCredential] = useState<string>("");

  const login = async (cred: string) => {
    const payload = {
      credential: cred
    };

    try {
      const response = await api.post("/user/login", payload);
      console.log(response);
      setUserLevel(response.data.level);
      setUserImage(response.data.image);
      setUsername(response.data.username);
      setUserCredential(cred);

      setIsLoggedIn(true);
    } catch (err) {
      console.log("login failed!");
      throw err;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserLevel(0);
    setUsername("");
    setUserCredential("");
  };

  return {
    isLoggedIn,
    username,
    userImage,
    userLevel,
    userCredential,
    login,
    logout,
    setUserLevel,
    setUsername
  };
};
