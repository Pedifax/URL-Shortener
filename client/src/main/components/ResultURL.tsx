import { useEffect, useState } from "react";
import env from "../../utils/env";

type InputType = {
  shouldShowResult: boolean;
  returnedURL: string;
};

const ResultURL = ({ shouldShowResult, returnedURL }: InputType) => {
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (shouldShowResult) {
      let temp = env.BASE_URL + '/' + returnedURL;
      setResult(temp);
    }
  }, [shouldShowResult, returnedURL]);

  return (
    <div>
      <span className="font-light text-gray-900">Result: </span>
      <a href={result} target="_blank">
        <span className="text-blue-500 underline">{result}</span>
      </a>
    </div>
  );
};

export default ResultURL;
