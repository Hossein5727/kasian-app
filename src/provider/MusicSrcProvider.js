import { createContext, useContext, useState } from "react";

const musicSrc = createContext();
const musicSrcDispatcher = createContext();

function MusicSrcProvider({ children }) {
  const [src, setSrc] = useState(null);

  return (
    <musicSrc.Provider value={src}>
      <musicSrcDispatcher.Provider value={setSrc}>
        {children}
      </musicSrcDispatcher.Provider>
    </musicSrc.Provider>
  );
}

export default MusicSrcProvider;

export const useMusicSrc = () => useContext(musicSrc);
export const useMusicSrcActions = () => {
  const setMusic = useContext(musicSrcDispatcher);

  const changeSrcMusic = (src) => {
    setMusic(src);
  };

  return { changeSrcMusic };
};
