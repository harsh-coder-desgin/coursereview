import axios from "axios"

const API = "/api/creator";

const Creator = {

  register: async (data) => {

    try {
      const formData = new FormData();
      formData.append("profile", data.profile[0]);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("creatorname", data.creatorname);
      formData.append("bio", data.bio);

      const res = await axios.post(`${API}/register`, formData, {
        withCredentials: true,
      });
      return res

    } catch (error) {
      console.log(error);
      throw error
    }
  },

  login: async (data) => {
    try {
      const res = await axios.post(`${API}/login`, data, {
        withCredentials: true,
      });
      return res;
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  emailverfication: async (data) => {
    try {
      return await axios.post(`${API}/emailverfication`, data)
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  newotp: async (data) => {
    try {
      return await axios.post(`${API}/newotp`, data)
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  logout: async (data) => {
    try {
      return await axios.post(`${API}/logout`, data, { withCredentials: true, })
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  refreshtoken: async () => {
    try {
      const newAccessToken = await axios.post(`${API}/refreshtoken`, { withCredentials: true, })
      return newAccessToken

    } catch (error) {
      console.log(error);
      throw error
    }
  },

  changepassword: async (data) => {
    try {
      return await axios.post(`${API}/changepassword`, data, { withCredentials: true, })
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  getuser: async () => {
    try {
      return await axios.get(`${API}/getuser`, { withCredentials: true, })
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  editprofile: async (data) => {
    try {
      const formData = new FormData();
      formData.append("profile", data[0]);

      const res = await axios.patch(`${API}/editprofile`, formData, {
        withCredentials: true,
      });
      return res
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  editcreatornamebio: async (data) => {
    try {
      return await axios.patch(`${API}/editcreatornamebio`, data, {
        withCredentials: true,
      })
    } catch (error) {
      console.log(error);
      throw error

    }
  },

  addsoicalmedia: async (data) => {

    try {
      return await axios.post(`${API}/addsoicalmedia`, data, {
        withCredentials: true,
      })
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  editcreatorprofile: async (data) => {
    try {
      return await axios.patch(`${API}/editcreatorprofile`, data, {
        withCredentials: true,
      })
    } catch (error) {
      console.log(error);
      throw error
    }
  },

  verifyauth: async () => {
    try {
      return await axios.get(`${API}/verifyauth`, { withCredentials: true, })
    } catch (error) {
      throw error
    }
  }

};
export default Creator;
