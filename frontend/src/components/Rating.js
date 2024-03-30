import { Box, Typography } from "@mui/material"
import {Star, StarBorder, StarHalf} from '@mui/icons-material';


const Rating =({value, text, color}) =>{
    return(
        <>
            <Box display="flex" alignItems="center">
                <Box mr={1}>
                    {value >= 1 ? (
                        <Star style={{color}} fontSize="small"/>
                    ) : value >= 0.5 ? (
                        <StarHalf style={{color}} fontSize="small"/>
                    ):(
                        <StarBorder style={{color}} fontSize="small"/>
                    )}
                </Box>

                <Box mr={1}>
                    {value >= 2 ? (
                        <Star style={{color}} fontSize="small"/>
                    ) : value >= 1.5 ? (
                        <StarHalf style={{color}} fontSize="small"/>
                    ):(
                        <StarBorder style={{color}} fontSize="small"/>
                    )}
                </Box>

                <Box mr={1}>
                    {value >= 3 ? (
                        <Star style={{color}} fontSize="small"/>
                    ) : value >= 2.5 ? (
                        <StarHalf style={{color}} fontSize="small"/>
                    ):(
                        <StarBorder style={{color}} fontSize="small"/>
                    )}
                </Box>

                <Box mr={1}>
                    {value >= 4 ? (
                        <Star style={{color}} fontSize="small"/>
                    ) : value >= 3.5 ? (
                        <StarHalf style={{color}} fontSize="small"/>
                    ):(
                        <StarBorder style={{color}} fontSize="small"/>
                    )}
                </Box>

                <Box mr={1}>
                    {value >= 5 ? (
                        <Star style={{color}} fontSize="small"/>
                    ) : value >= 4.5 ? (
                        <StarHalf style={{color}} fontSize="small"/>
                    ):(
                        <StarBorder style={{color}} fontSize="small"/>
                    )}
                </Box>    
            </Box>

            <Typography variant= "subtitle2" color="textSecondary">{ text || ""} </Typography>
        </>
    )
}

export default Rating