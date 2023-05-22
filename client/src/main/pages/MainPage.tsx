import { useState } from "react";
import { AppContext } from "../../utils/context/appContext";

import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Input from "../components/Input";
import ResultURL from "../components/ResultURL";
import ShortenButton from "../components/ShortenButton";
import CopyButton from "../components/CopyButton";
import Freemium from "../components/Freemium";
import OAuth from "../../utils/components/OAuth";
import Profile from "../../main/components/Profile";
import { useAuth } from "../../utils/hooks/auth-hook";
import UserURLs from "../components/UserURLs";
// import ReactGA from "react-ga";

// ReactGA.pageview("Main Page");

const MainPage = () => {
  const [longURL, setLongURL] = useState<string>("");
  const [returnedURL, setReturnedURL] = useState<string>("default result");
  const [alias, setAlias] = useState<string>("");
  const [shouldShowResult, setShouldShowResult] = useState<boolean>(false);

  const [updateDep, setCount] = useState<number>(0);

  const updateList = () => {
    setCount(prevState => prevState + 1);
  }

  const {
    isLoggedIn,
    username,
    userLevel,
    userCredential,
    login,
    logout,
    userImage,
    setUserLevel,
    setUsername,
  } = useAuth();

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        username: username,
        userLevel: userLevel,
        userImage: userImage,
        userCredential: userCredential,
        login: login,
        logout: logout,
        setUserLevel: setUserLevel,
        setUsername: setUsername,
      }}
    >
      <div>
        <div className="mt-5 mb-10 flex w-full flex-row justify-center">
          <div className="flex w-1/2 flex-col justify-center space-y-5">
            <Title />
            <Subtitle />
            {isLoggedIn ? "" : <OAuth />}
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex w-full flex-row justify-center self-center">
            <div className="flex w-1/2 flex-col justify-center space-y-10">
              {isLoggedIn && username ? (
                <div className="mb-4 flex flex-row justify-center space-x-4">
                  <Profile />
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-row space-x-4">
                {userLevel > 0 ? (
                  <div className="flex w-2/5">
                    <Input
                      onInput={setAlias}
                      placeholder="Customize your URL..."
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="flex w-5/6">
                  <Input
                    onInput={setLongURL}
                    placeholder="Input the original URL..."
                  />
                </div>
                <div className="flex w-1/6 justify-center">
                  <ShortenButton
                    longURL={longURL}
                    alias={alias}
                    setReturnedURL={setReturnedURL}
                    setShouldShowResult={setShouldShowResult}
                    updateList={updateList}
                  />
                </div>
              </div>

              {shouldShowResult ? (
                <div className="flex flex-row justify-between space-x-4">
                  <div className="flex w-5/6">
                    <ResultURL
                      shouldShowResult={shouldShowResult}
                      returnedURL={returnedURL}
                    />
                  </div>
                  <div className="flex w-1/6 justify-center">
                    <CopyButton returnedURL={returnedURL} />
                  </div>
                </div>
              ) : (
                ""
              )}
              {userLevel >= 1 && <UserURLs  credential={userCredential} userLevel={userLevel} updateDep={updateDep} updateList={updateList}/>}
            </div>
          </div>
        </div>


        {userLevel >= 2 ? (
          <div className="mt-24"></div>
        ) : (
          <div className="mt-5 mb-32 flex w-full flex-row justify-center">
            <Freemium />
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default MainPage;
