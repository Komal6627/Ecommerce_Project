import axios from "axios"

class ProductAPI{
    async getProductList(keyword = '', pageNumber = ''){
        try {
            const {data} = await axios.get(`/api/products${keyword}`, {
                params : {
                    page : pageNumber
                }
            });
            return data;
        } catch (error) {
            throw error.response && error.response.data.detail ? error.response.data.detail : error.message;
        }
    }

    async getProductDetails(productId){
        try {
            const { data } = await axios.get(`/api/products/${productId}`);
            console.log(data);
            return data;
        } catch (error) {
            throw error.message && error.response.data.detail ? error.response.data.detail : error.message
        }
    }


    async createProductReview(productId, review) {
    try {
        const userInfo = localStorage.getItem("userInfo");
        console.log("userInfo from localStorage:", userInfo);
        if (!userInfo) {
            throw new Error("User not logged in");
        }

        const { token } = JSON.parse(userInfo);
        console.log("Parsed token:", token);
        if (!token) {
            throw new Error("Token not found in user info");
        }

        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        console.log("Token Payload:", tokenPayload);

        const expiryTime = tokenPayload.exp * 1000; // JWT `exp` is in seconds
        const currentTime = Date.now();

        if (currentTime > expiryTime) {
            throw new Error("Token has expired");
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        console.log("Config headers:", config.headers);

        const { data } = await axios.post(`/api/products/${productId}/reviews/`, review, config);
        return data;

    } catch (error) {
        console.error("Error creating product review:", error);

        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            console.error("Request data:", error.request);
        } else {
            console.error("Error message:", error.message);
        }

        throw error.response && error.response.data && error.response.data.detail
            ? error.response.data.detail
            : error.message;
    }
}


    async getTopRatedProducts(){
        try {
            const { data } = await axios.get(`/api/products/top/`);
            return data;
        } catch (error) {
            throw error.message && error.response.data.detail ? error.response.data.detail : error.message
        }
    }
}

const productAPI = new ProductAPI();

export default productAPI;
