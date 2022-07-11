import forWardImg from "../.././assests/img/Vector.svg";
import backWardImg from "../.././assests/img/Vector2.svg";
import pauseIcon from "../.././assests/img/pause-button.svg";
import playIcon from "../.././assests/img/play-button.svg";
import volumeIcon from "../.././assests/img/volumeIcon.svg";
import { useEffect, useState } from "react";
function TimeLine({ audioRef }) {
  const [isPlay, setIsPlay] = useState(false);
  const [currentTimeAudio, setCurrentTimeAudio] = useState({
    second: 0,
    minute: 0,
  });
  const [durationAudio, setDurationAudio] = useState(0);
  const [isShowChangeSound, setIsShowChangeSound] = useState(false);
  const [volumeAudui, setVolumeAudui] = useState(0);

  useEffect(() => {
    // get duration audio
    if (audioRef.current) {
      var minutes = "0" + parseInt(audioRef.current.duration / 60, 10);
      var seconds = "0" + parseInt(audioRef.current.duration % 60);
      setDurationAudio(minutes + ":" + seconds.slice(-2));
    }
  }, [audioRef.current && audioRef.current.duration]);

  const getCurrentTimeAudio = () => {
    setInterval(() => {
      setCurrentTimeAudio({
        ...currentTimeAudio,
        minute: Math.floor(audioRef.current.currentTime / 60),
        second:
          audioRef.current.currentTime <= 10
            ? "0" +
              Math.floor(
                audioRef.current.currentTime - currentTimeAudio.minute * 60
              )
            : Math.floor(
                audioRef.current.currentTime - currentTimeAudio.minute * 60
              ),
      });
    }, 1000);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0  z-10 w-[92vw] bufferAudio flex justify-between items-center flex-row-reverse py-4 px-4 rounded-tr-2xl rounded-tl-2xl`}
      id="buffer"
    >
      <div className="flex items-center gap-7">
        <button
          className="bg-[#2e313e] p-[11px] rounded-full"
          onClick={() => (audioRef.current.currentTime += 5)}
        >
          <img src={forWardImg} className="w-[20px]" alt="forWardImg" />
        </button>

        <button
          className="bg-[#2e313e] p-[11px] rounded-full"
          onClick={() => (audioRef.current.currentTime -= 5)}
        >
          <img src={backWardImg} className="w-[20px]" alt="backWardImg" />
        </button>
      </div>

      {audioRef.current && (
        <div className="w-[40%] text-center text-primary-color text-base flex items-center justify-center gap-3">
          <p>{durationAudio}</p>
          <input
            type="range"
            style={{ direction: "ltr" }}
            max={audioRef.current.duration}
            value={audioRef.current.currentTime}
            step="0.1"
          />
          <p>
            {currentTimeAudio.second} : {currentTimeAudio.minute}
          </p>
        </div>
      )}

      <div className="flex items-center gap-7 flex-row-reverse">
        <button
          className="bg-[#2e313e] p-[11px] rounded-full relative"
          onClick={() => setIsShowChangeSound(!isShowChangeSound)}
        >
          <img src={volumeIcon} className="w-[20px]" />
        </button>

        {isShowChangeSound && (
          <div className="absolute top-7 right-36">
            <input
              style={{ direction: "ltr" }}
              type="range"
              min={0}
              max={1}
              step="0.1"
              onChange={(e) => (audioRef.current.volume = e.target.value)}
              // value={volumeAudui}
            />
            {/* <button onClick={() => (audioRef.current.volume = 2.5)}>
              plus
            </button> */}
          </div>
        )}

        {isPlay ? (
          <button
            className="bg-[#2e313e] p-[11px] rounded-full"
            onClick={() => {
              audioRef.current.pause();
              setIsPlay(false);
            }}
          >
            <img src={pauseIcon} className="w-[20px]" />
          </button>
        ) : (
          <button
            className="bg-[#2e313e] p-[11px] rounded-full"
            onClick={() => {
              audioRef.current.play();
              getCurrentTimeAudio();
              setIsPlay(true);
            }}
          >
            <img src={playIcon} className="w-[18px]" />
          </button>
        )}
      </div>
    </div>
  );
}

export default TimeLine;
