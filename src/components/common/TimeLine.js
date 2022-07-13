import forWardImg from "../.././assests/img/Vector.svg";
import backWardImg from "../.././assests/img/Vector2.svg";
import pauseIcon from "../.././assests/img/pause-button.svg";
import playIcon from "../.././assests/img/play-button.svg";
import volumeIcon from "../.././assests/img/volumeIcon.svg";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { isInteger } from "formik";

function TimeLine({ audioRef, isPlay, setIsPlay }) {
  const [currentTimeAudio, setCurrentTimeAudio] = useState({
    second: 0,
    minute: 0,
  });
  const [durationAudio, setDurationAudio] = useState(0);
  const [isShowChangeSound, setIsShowChangeSound] = useState(false);
  const [intervalState, setIntervalState] = useState(null);

  useEffect(() => {
    getDurationAudio();
  }, [audioRef.current && audioRef.current.duration, audioRef]);

  const getDurationAudio = () => {
    if (audioRef.current) {
      var minutes = "0" + parseInt(audioRef.current.duration / 60, 10);
      var seconds = "0" + parseInt(audioRef.current.duration % 60);
      setDurationAudio(minutes + ":" + seconds.slice(-2));
    }
  };

  const playMusicWithKeyboard = () => {
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 32) {
        setIsPlay(!isPlay);
      }
    });

    if (isPlay) {
      audioRef.current.play();
      getCurrentTimeAudio();
    } else if (!isPlay) {
      audioRef.current.pause();
      clearInterval(intervalState);
    }
  };

  const getCurrentTimeAudio = () => {
    setIntervalState(
      setInterval(() => {
        setCurrentTimeAudio({
          minute: Math.floor(audioRef.current.currentTime / 60),
          second:
            audioRef.current.currentTime <= 10
              ? "0" + parseInt(audioRef.current.currentTime % 60)
              : parseInt(audioRef.current.currentTime % 60),
        });
      }, 1000)
    );
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0  z-10 w-[92vw] bufferAudio flex justify-between items-center flex-row-reverse py-4 px-4 rounded-tr-2xl rounded-tl-2xl`}
      id="buffer"
      onLoad={playMusicWithKeyboard}
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
        <div className="w-[40%] text-center text-[#dcdcdf] text-sm flex items-center justify-center gap-3">
          {durationAudio.length < 7 ? durationAudio : "00:00"}

          <Slider
            style={{
              direction: "ltr",
              color: "#dcdcdf",
              width: "70%",
              height: "5px",
            }}
            classes={{ thumb: "thumb" }}
            aria-label="Small"
            max={audioRef.current.duration}
            value={audioRef.current.currentTime}
            step="0.1"
          />
          <p className="mr-2 flex" style={{ direction: "ltr" }}>
            {currentTimeAudio.minute}:{currentTimeAudio.second}
          </p>
        </div>
      )}

      <div className="flex items-center gap-7 flex-row-reverse">
        <button
          className="bg-[#2e313e] p-[11px] rounded-full relative"
          onClick={() => setIsShowChangeSound(!isShowChangeSound)}
        >
          <img src={volumeIcon} className="w-[20px]" alt="volumeIcon" />
        </button>

        {isShowChangeSound && (
          <div className="absolute top-[22px] right-36">
            <Slider
              style={{
                direction: "ltr",
                color: "#dcdcdf",
                width: "100px",
                height: "5px",
              }}
              classes={{ thumb: "thumb" }}
              valueLabelDisplay={() => audioRef.current.volume}
              type="range"
              min={0}
              max={1}
              defaultValue={1}
              step={0.1}
              onChange={(e) =>
                (audioRef.current.volume = Number(e.target.value))
              }
            />
          </div>
        )}

        {isPlay ? (
          <button
            className="bg-[#2e313e] p-[11px] rounded-full"
            onClick={() => {
              // audioRef.current.pause();
              // clearInterval(intervalState);
              setIsPlay(false);
            }}
          >
            <img src={pauseIcon} className="w-[20px]" />
          </button>
        ) : (
          <button
            className="bg-[#2e313e] p-[11px] rounded-full"
            onClick={() => {
              // audioRef.current.play();
              // getCurrentTimeAudio();
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
