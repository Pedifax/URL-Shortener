import { useContext } from "react";

import api from "../../utils/api";
import { AppContext } from "../../utils/context/appContext";

type InputType = {
  longURL: string;
  alias: string;
  setReturnedURL: (value: string) => void;
  setShouldShowResult: (value: boolean) => void;
};

const ShortenButton = ({
  longURL,
  alias,
  setReturnedURL,
  setShouldShowResult,
  updateList
}: InputType | any) => {
  const { isLoggedIn, userCredential, userLevel } = useContext(AppContext);

  const handleClick = async () => {
    console.log('clicked')
    if (longURL.length === 0) return;
    if (longURL.length === 0 && alias.length === 0) return;
    if (longURL.includes(" ") || alias.includes(" ")) return;
    if (longURL.includes("localhost")) return;


    // normal shorten without logging in
    if (!isLoggedIn && alias.length === 0) {
      const payload = {
        longURL: longURL,
      };

      try {
        const response = await api.post("/shorten", payload);
        setReturnedURL(response.data.shortURL);
        setShouldShowResult(true);
      } catch (err: any) {
        throw err;
      }
    }

    // normal shorten request for logged-in users
    else if (isLoggedIn && alias.length === 0) {
      const payload = {
        credential: userCredential,
        longURL: longURL,
        userLevel: userLevel,
      };

      try {
        const response = await api.post("/shorten", payload);
        setReturnedURL(response.data.shortURL);
        setShouldShowResult(true);
      } catch (err: any) {
        throw err;
      }
    }

    // premium shorten request with custom alias
    else if (isLoggedIn && alias.length > 0) {
      const payload = {
        credential: userCredential,
        longURL: longURL,
        alias: alias,
        userLevel: userLevel,
      };

      try {
        const response = await api.post("/alias", payload);
        setReturnedURL(response.data.shortURL);
        setShouldShowResult(true);
      } catch (err: any) {
        throw err;
      }
    }
    updateList();
  };

  return (
    <button
      onClick={handleClick}
      className="text-md w-full rounded-lg border border-cyan-400 py-2 text-center font-light 
      text-cyan-500 ring-cyan-400 hover:bg-cyan-50 focus:outline-none"
    >
      {"Shorten!"}
    </button>
  );
};

export default ShortenButton;
