import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"


const Star = () =>{
 

    const StyledDiv = styled('div')({
        backgroundImage :  `url(https://e7.pngegg.com/pngimages/194/912/png-clipart-white-dialogue-box-ring-foam-engraving-speech-bubble-angle-text.png)`,
        backgroundSize : 'cover',
        height: "50px",
        width: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin : '20px'
    })

    const StyledP = styled('p')({
    color: "white",
    backgroundColor: "black",
    padding: "5px",
    })

    return (
        <div>
            <StyledDiv>
                <StyledP>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</StyledP>
            </StyledDiv>
        </div>
    )
} 
export default Star