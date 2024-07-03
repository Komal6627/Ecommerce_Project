import styled from "@emotion/styled";
import { AlertTitle } from '@mui/material';
import { grey } from "@mui/material/colors";

const StyleAlert = styled(AlertTitle)(({theme, variant}) =>({
    backgroundColor: "white",
    color: "black",
    fontWeight:"bold"
}))

const Message = ({variant, children}) =>{
    return(
        <StyleAlert variant={variant} serverity={variant}>
            Message:
           {children}
        </StyleAlert>
    )
}

export default Message

