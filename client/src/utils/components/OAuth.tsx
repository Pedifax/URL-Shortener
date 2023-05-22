import { useContext } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { AppContext } from "../context/appContext";


const OAuth = () => {
  const appContext = useContext(AppContext);

  const onOAuthSuccess = async (credentialResponse: any) => {
    appContext.login(credentialResponse.credential);
  };

  return (
    <GoogleOAuthProvider clientId="820495376105-b7c472ico6p70rdo5jn8jgbkhpa2fpbh.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={onOAuthSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default OAuth;
