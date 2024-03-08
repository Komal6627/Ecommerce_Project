import axios from "axios";

class UserAPI {
  async getUserDetails(userId) {
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/user/${userId}`, config);
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

    } catch (error) {}
  }
}
