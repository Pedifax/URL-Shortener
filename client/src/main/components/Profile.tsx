import React, { useContext, useEffect } from "react";
import { AppContext } from "../../utils/context/appContext";
import Button from "./Button";
import ButtonBlue from "./ButtonBlue";

const level = ["Starter", "Basic", "Expert"];

export default function Profile() {
  const { userImage, username, userLevel, logout } = useContext(AppContext);

  return (
    <div className="w-80 max-w-sm rounded-lg border border-gray-200 bg-white shadow">
      <div className="flex flex-col items-center pt-5 pb-5 ">
        <div className="flex flex-row">
          <img
            className="my-auto h-12 w-12 rounded-full shadow-lg"
            src={userImage}
            alt="user image"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col ml-4 items-center">
            <h5 className="text-l font-semibold text-gray-900">
              {username}
            </h5>
            <div className="space-x-3">
              <span className="mb-1 text-l font-light text-gray-900">
                {level[userLevel] ? level[userLevel] : level[0]}{" user"}
              </span>
            </div>
          </div>

        </div>
        <div className="mt-4 flex w-1/3 justify-center">
          <Button className="w-full" onClick={logout} text="Logout" />
        </div>
      </div>
    </div>
  );
}
