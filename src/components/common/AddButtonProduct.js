import { MdAddBox } from "react-icons/md";
import { Grid, Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { Link } from "react-router-dom";

function AddButtonProduct({ productAddress = "/", toolTipTitle }) {
  return (
    <div>
      <Grid
        justifyContent="center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title={<p className="text-sm tooltip">{toolTipTitle}</p>}>
          <Link to={`/${productAddress}`}>
            <button className=" mr-2 bg-primary-color text-center text-2xl px-4 py-2 rounded flex justify-center items-center">
              <MdAddBox className="text-white" />
            </button>
          </Link>
        </Tooltip>
      </Grid>
    </div>
  );
}

export default AddButtonProduct;
