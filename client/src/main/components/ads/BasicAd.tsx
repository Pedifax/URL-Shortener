import { FC } from "react";
import ButtonBlue from "../ButtonBlue";

interface AdProps {
  onChangeLevel: (level: number) => void;
}

const BasicAd: FC<AdProps> = ({ onChangeLevel }) => {
  return (
    <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow  xl:p-8">
      <h3 className="mb-4 text-2xl font-semibold">Basic</h3>
      <div className="flex h-12 flex-col justify-center">
        <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
          Relevant for multiple users, extended & premium support.
        </p>
      </div>
      <div className="my-8 flex items-baseline justify-center">
        <span className="mr-2 text-5xl font-extrabold">$19</span>
        <span className="text-gray-500 ">/month</span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        <li className="flex items-center space-x-3">
          <svg
            className="h-5 w-5 flex-shrink-0 text-green-500 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>50 links/month</span>
        </li>
        <li className="flex items-center space-x-3">
          <svg
            className="h-5 w-5 flex-shrink-0 text-green-500 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Basic Analytics</span>
        </li>
        <li className="flex items-center space-x-3">
          <svg
            className="h-5 w-5 flex-shrink-0 text-green-500 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Free of Ads</span>
        </li>
        <li className="flex items-center space-x-3">
          <svg
            className="h-5 w-5 flex-shrink-0 text-green-500 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>
            <span className="font-semibold">Customizable </span>Links
          </span>
        </li>
      </ul>
      {/* <a
        className="mt-auto rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 dark:text-white  dark:focus:ring-primary-900"
        onClick={() => onChangeLevel(1)}
      >
        Get started
      </a> */}
      <ButtonBlue className="mt-auto" onClick={() => onChangeLevel(1)} text="Go Basic!"/> 
    </div>
  );
};

export default BasicAd;
