import { createContext, useContext, useState } from "react";
import MusicSrcProvider from "./MusicSrcProvider";

const userData = createContext();
const userDataDispatcher = createContext();

const token = createContext();
const tokenDispatcher = createContext();

function EmailDataProvider({ children }) {
  const [data, setData] = useState({});
  const [tokenData, setTokenData] = useState("");

  return (
    <userData.Provider value={data}>
      <userDataDispatcher.Provider value={setData}>
        <token.Provider value={tokenData}>
          <tokenDispatcher.Provider value={setTokenData}>
            {/* <MusicSrcProvider> */}
            {children}
            {/* </MusicSrcProvider> */}
          </tokenDispatcher.Provider>
        </token.Provider>
      </userDataDispatcher.Provider>
    </userData.Provider>
  );
}

export default EmailDataProvider;

export const useUserData = () => useContext(userData);
export const useToken = () => useContext(token);

export const useUserActions = () => {
  const data = useContext(userData);
  const setData = useContext(userDataDispatcher);

  const setNewData = (data) => {
    setData(data);
  };

  return { setNewData };
};

export const useTokenActions = () => {
  const setToken = useContext(tokenDispatcher);

  const setNewToken = (token) => {
    setToken(token);
  };

  return { setNewToken };
};
