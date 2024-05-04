import { CardActionArea, CardContent, CardMedia, Paper, Rating, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Product =({product}) =>{
    console.log("Product Images:", product.image); 
    return (
        <Paper sx={{maxWidth: 345, margin: "5px"}}>
            {product && (
            <CardActionArea component={Link} to={`/product/${product._id}`}>
                {product.image ? (
                     <img
                     src={product.image}
                     alt={product.name}
                     style={{ objectFit: "contain", maxHeight: 140, width: "100%" }}
                   />
                ) : (
                <div style={{ height: 140, backgroundColor: "lightgray" }}>
                         No Image Available
                </div>
            )}
                <CardContent style={{textAlign:"center"}}>
                    <Typography gutterBottom variant="h6" component="div">  
                        {product.name}
                    </Typography>

                    <Typography varient="body2" color="text.secondary" sx={{display: 'flex'}}>
                        <Rating value = {product.rating} text = {`${product.numReview} reviews`} color="#f8e825"/>
                        
                    </Typography>

                    <Typography variant="h6" component="div">₹{product.price}</Typography>
                </CardContent>
            </CardActionArea>
            )}
        </Paper>
    )
}

export default Product