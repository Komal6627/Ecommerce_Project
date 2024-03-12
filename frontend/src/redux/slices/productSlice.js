import productAPI from "../../mocks/product";

const intialState = {
    productList : {products : [], loading : false, props : null, page:0, pages: 0},
    productDetails : {product: {reviews: []}, loading: false, error: null},
    createReview : {loading: false, error: null, success: false},
    topRatedProducts : {product: [], loading: false, error: null},
}

const productSlice = createSlice({
    name: "product",
    intialState,
    reducers:{
        productListRequest(state){
            state.productList.loading = true;
            state.productList.error = null;
        },
        productListSucess(state, action){
            state.productList.loading = false;
            state.productList.products = action.payload.products;
            state.productList.page = action.payload.page;
            state.productList.pages = action.payload.pages;
        },
        productListFailure(state, action){
            state.productList.loading = false;
            state.productList.error = action.payload;
        },
        productDetailsRequest(state){
            state.productDetails.loading = true;
            state.productDetails.error = null;
        },
        productDetailsSuccess(state, action){
            state.productDetails.loading = false;
            state.productDetails.product = action.payload;
        },
        productDetailsFailure(state, action){
            state.productDetails.loading = false;
            state.productDetails.error = action.payload;
        },
        createReviewRequest(state){
            state.createReview.loading = true;
            state.createReview.error = null;
            state.createReview.success = false;
        },
        createReviewSuccess(state){
            state.createReview.loading = false;
            state.createReview.success = true;
        },
        createReviewFailure(state, action){
            state.createReview.loading = false;
            state.createReview.error = action.payload;
        },
        productTopRequest(state){
            state.topRatedProducts.loading = true;
            state.topRatedProducts.error = null;
        },
        productTopSuccess(state, action){
            state.topRatedProducts.loading = false;
            state.topRatedProducts.products = action.payload;
        },
        productTopFailure(state, action){
            state.topRatedProducts.loading = false;
            state.topRatedProducts.error = action.payload;
        }
    }
})

export const  {
    productListRequest,
    productListSucess,
    productListFailure,
    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFailure,
    createReviewRequest,
    createReviewFailure,
    productTopRequest,
    productTopSuccess,
    productTopFailure
} = productSlice.action;

export const fetchProductList = (keyword, pageNumber = '') => async(dispatch) => {
    try {
        dispatch(productListRequest());
        const productList = await productAPI.getProductList(keyword, pageNumber);
        dispatch(productListSucess(productList))
    } catch (error) {
        dispatch(productListFailure(error.response ?.data.detail || error.message));
    }
}

export const fetchUserDetails = (id) => async(dispatch) =>{
    try {
        dispatch(productDetailsRequest());
        const productDetails = await productAPI.getProductDetails(id);
        dispatch(productDetailsSuccess(productDetails));
    } catch (error) {
        dispatch(productDetailsFailure(error.response?.data.detail || error.message));
    }
}

export const createReview = (productId, review) => async(dispatch) =>{
    try {
        dispatch(createReviewRequest());

        await productAPI.createProductReview(productId, review);
        dispatch(createReviewSuccess());
    } catch (error) {
        dispatch(createReviewFailure(error.response ?.data.detail || error.message))
    }
};

export const fetchTopRatedProducts = () => async(dispatch) =>{
    try {
        dispatch(productTopRequest());
        const topRatedProducts = await productAPI.getTopRatedProducts();
        dispatch(productTopSuccess(topRatedProducts));
    } catch (error) {
        dispatch(productTopFailure(error.response ?.data.detail || error.message))
    }
}

export const {reducer} =productSlice;
export default productSlice;
