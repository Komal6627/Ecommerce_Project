import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import {fetchProductList} from "../redux/slices/productSlice"
import ProductCarousel from '../components/ProductCarousel'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product"
import Paginate from "../components/Paginate"
import { useLocation } from "react-router-dom";

const Home = () =>{
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.productList);
    const topRatedProducts = useSelector((state) => state.product.topRatedProducts)

    const {products, loading, error, page, pages} = productList;
    const {pageNumber} = useParams()
    const {products : topProducts, loading: topLoading, error: topError } = topRatedProducts;
    console.log(productList);

    // let keyword = useNavigate();
    // console.log(keyword);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let keyword = searchParams.get('keyword');
    console.log(productList);

    useEffect(() => {
        dispatch(fetchProductList())
    }, [dispatch, keyword, pageNumber])

    return(
        <div>
            {!keyword && (
                <>
                    <div style={{fontWeight: "bold", fontSize: "25px", color: "black", fontFamily: "MozAnimationDelay" }}>
                        TOP-RATED PRODUCTS
                    </div>
                    <ProductCarousel/>
                </>
            )}

            <div style={{fontWeight: "bold", fontSize: "25px", color: "black", fontFamily: "MozAnimationDelay" }}>
                        LATEST PRODUCTS
            </div>

            {loading ? (
                <Loader/>
            ): error ? (
                <Message variant="danger">{error}</Message>
            ): (
                <div>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg= {4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

            <Paginate page={page} pages ={pages} keyword={keyword}/>
        </div>
    )

}

export default Home