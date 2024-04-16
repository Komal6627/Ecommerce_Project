import axios from "axios";

class UserAPI {
  async getUserDetails() {
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/users/`, config);
      return data;
    } catch (error) {
      throw error.respose && error.respose.data.detail
        ? error.respose.data.detail
        : error.message;
    }
  }

  async createUser(name, email, password) {
    try {
      const config = {
        headers: {
          "Content-header": "application/json",
        },
      };

      const {data} = await axios.post(`/api/users/register/`, {name, email, password}, config);

    } catch (error) {
        throw error.respose && error.respose.data.detail
        ? error.respose.data.detail
        : error.message;
    }
  }

  async updateUser(userId, updateData){
    try {
        const {token} = JSON.parse(localStorage.getItem("userInfo"));

       const config = {
        headers : {
            Authorization: `Bearer ${token}`,
        }
       };
    
       const {data} = await axios.put('/api/users/profile/update/', updateData, config);
       return data;

    } catch (error) {
        throw error.respose && error.respose.data.detail
        ? error.respose.data.detail
        : error.message;
    }
  }

  async deleteUser(userId) {
        try {
            const {token} = JSON.parse(localStorage.getItem("userInfo"));

            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };

              await  axios.delete(`/api/users/delete/${userId}/`, config)

        } catch (error) {
            throw error.respose && error.respose.data.detail
            ? error.respose.data.detail
            : error.message;
        }
    }

    async login(email, password){
        try {
          const response = await axios.post('/api/users/login/', { username: email, password: password });
          return response.data;
        } catch (error) {
          if (error.response && error.response.data.detail) {
            throw error.response.data.detail; // Throw the error message from the server response
          } else {
            throw error.message; // Throw the generic error message if response or response.data.detail is undefined
          }
        }
    }

    
}

const userApi = new UserAPI();

export default userApi;




