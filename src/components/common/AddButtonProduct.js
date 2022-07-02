import { MdAddBox } from "react-icons/md";
import { Grid, Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { Link } from "react-router-dom";

function AddButtonProduct({ productAddress = "/", toolTipTitle, onClick }) {
  return (
    <div onClick={onClick}>
      <Grid
        justifyContent="center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip
          title={
            <p className="text-sm tooltip" TransitionComponent={Zoom}>
              {toolTipTitle}
            </p>
          }
        >
          <Link to={`/${productAddress}`}>
            <button className="w-[70px] h-[48px] mr-2 bg-primary-color text-center text-3xl px-4 py-2 rounded flex justify-center items-center">
              <MdAddBox className="text-black" />
            </button>
          </Link>
        </Tooltip>
      </Grid>
    </div>
  );
}

export default AddButtonProduct;