import styled from "@emotion/styled";
import { AlertTitle } from '@mui/material';
import { grey } from "@mui/material/colors";

const StyleAlert = styled(AlertTitle)(({theme, variant}) =>({
    backgroundColor: "black",
    color: "white"
}))

const Message = ({variant, children}) =>{
    return(
        <StyleAlert variant={variant} serverity={variant}>
            Message
            {children}
        </StyleAlert>
    )
}

export default Message

