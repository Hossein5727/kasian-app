import forWardImg from "../.././assests/img/Vector.svg";
import backWardImg from "../.././assests/img/Vector2.svg";
import pauseIcon from "../.././assests/img/pauseIcon.svg";
import volumeIcon from "../.././assests/img/volumeIcon.svg";
function TimeLine() {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0  z-10 w-[92vw] bufferAudio flex justify-between items-center flex-row-reverse py-4 px-4 rounded-tr-2xl rounded-tl-2xl`}
      id="buffer"
    >
      <div className="flex items-center gap-7">
        <button className="bg-[#2e313e] p-[11px] rounded-full">
          <img src={forWardImg} className="w-[20px]" />
        </button>

        <button className="bg-[#2e313e] p-[11px] rounded-full">
          <img src={backWardImg} className="w-[20px]" />
        </button>
      </div>

      <div className="w-[40%] text-center">buffer</div>

      <div className="flex items-center gap-7 flex-row-reverse">
        <button className="bg-[#2e313e] p-[11px] rounded-full">
          <img src={volumeIcon} className="w-[20px]" />
        </button>

        <button className="bg-[#2e313e] p-[11px] rounded-full">
          <img src={pauseIcon} className="w-[20px]" />
        </button>
      </div>
    </div>
  );
}

export default TimeLine;
