import { useDispatch, useSelector } from "react-redux"

const ProductCarousel=()=>{
    const dispatch = useDispatch();
    const topRatedProducts = useSelector((state) => state.product.topRatedProducts)
    const {error, loading, product } = topRatedProducts;
    console.log(topRatedProducts);

    
}   