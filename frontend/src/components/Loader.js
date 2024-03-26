import { CircularProgress } from "@mui/material"

const Loader = () =>{
    return(
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress size={100}/>
        </div>
    )
}