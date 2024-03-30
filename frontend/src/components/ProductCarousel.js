import { useDispatch, useSelector } from "react-redux"
import {fetchTopRatedProducts} from "../redux/slices/productSlice"
import Loader from "./Loader";
import Message from "./Message";
import {Carousel, Image} from "react-bootstrap"
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ProductCarousel=()=>{
    const dispatch = useDispatch();
    const topRatedProducts = useSelector((state) => state.product.topRatedProducts)
    const {error, loading, product } = topRatedProducts;
    console.log(topRatedProducts);

 

    useEffect(() => {
       dispatch(fetchTopRatedProducts()); 
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Carousel style={{height: "300px" }} pause="hover" className="bg-dark" interval={5000}>
            {product.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} style={{height:"250", width: "250"}}/>
                        <Carousel.Caption className="carousel-caption">
                            <h4>{product.name} (₹{product.price})</h4>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )

}   

export default ProductCarousel