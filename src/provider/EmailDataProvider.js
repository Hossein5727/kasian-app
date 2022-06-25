import { createContext, useContext, useState } from "react";

const userData = createContext();
const userDataDispatcher = createContext();

function EmailDataProvider({ children }) {
  const [data, setData] = useState({ username: "", password: "" });

  return (
    <userData.Provider value={data}>
      <userDataDispatcher.Provider value={setData}>
        {children}
      </userDataDispatcher.Provider>
    </userData.Provider>
  );
}

export default EmailDataProvider;

export const useUserData = () => useContext(userData);
export const useUserActions = () => {
  const data = useContext(userData);
  const setData = useContext(userDataDispatcher);

  const setNewData = (data) => {
    setData(data);
  };

  return { setNewData };
};
