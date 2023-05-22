import React, { useContext } from "react";
import { useAuth } from "../../utils/hooks/auth-hook";
import { useState } from "react";
import { AppContext } from "../../utils/context/appContext";
import StarterAd from "./ads/StarterAd";
import BasicAd from "./ads/BasicAd";
import ExpertAd from "./ads/ExpertAd";
import api from "../../utils/api";

interface FreemiumProps {}

type LevelStatus = {
  activated: boolean;
};

const initialLevelStatus: LevelStatus = {
  activated: false,
};

const Freemium: React.FC<FreemiumProps> = ({}) => {
  const { isLoggedIn, userLevel, setUserLevel, userCredential } =
    useContext(AppContext);

  const [basicStatus, setBasicStatus] =
    useState<LevelStatus>(initialLevelStatus);
  const [expertStatus, setExpertStatus] =
    useState<LevelStatus>(initialLevelStatus);

  const onChangeLevel = async (level: number) => {
    if (!isLoggedIn) {
      return;
    }

    const payload = {
      credential: userCredential,
      targetLevel: level,
    };

    try {
      const response = await api.put("/user/level", payload);
      setUserLevel(parseInt(response.data.level));
    } catch (err: any) {
      console.log("Error when changing level");
      throw err;
    }
  };

  return (
    <div className="light">
      <section className="bg-white ">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          {/* Topic */}
          {userLevel >= 2 ? (
            ""
          ) : (
            <div className="mx-auto mb-4 max-w-screen-md text-center lg:mb-12">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
                Go Premium!
              </h2>
              <p className="font-light text-gray-500  sm:text-xl">
                Enjoy all the features Napoleon provides.
              </p>
            </div>
          )}

          {/* <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10"> */}
          <div className="flex flex-row justify-center space-x-5">
            {/* Starter */}
            {userLevel <= 0 ? <StarterAd /> : ""}

            {/* Basic */}
            {userLevel <= 0 ? <BasicAd onChangeLevel={onChangeLevel} /> : ""}

            {/* Expert */}
            {userLevel <= 1 ? <ExpertAd onChangeLevel={onChangeLevel} /> : ""}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Freemium;
