import { useDispatch, useSelector } from "react-redux"
import {fetchTopRatedProducts} from "../redux/slices/productSlice"
import Loader from "./Loader";
import Message from "./Message";
import Carousel from 'react-bootstrap/Carousel';
import { CarouselCaption, Image} from "react-bootstrap"
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
       
            <Carousel style={{ height:"300px"}} pause="hover" className="bg-dark" interval={5000 } >
            {product.map((product) => (
                <Carousel.Item key={product._id}>
                   <Link to={`/product/${product._id}`} style={{ display: 'flex',flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
              <div style={{ marginBottom: '10px' }}>
                <Image
                  src={product.image}
                  style={{ height: '200px', width: '200px', objectFit: 'cover', borderRadius: '50%',  marginBottom: '10px' }}
                  alt={product.name}
                />
              </div>
              <div style={{ textAlign: 'center', color: "white"}} >
                <h4 >{product.name} (₹{product.price})</h4>
              </div>
            </Link>
                </Carousel.Item>
            ))}
        </Carousel> 
    )

}   

export default ProductCarousel