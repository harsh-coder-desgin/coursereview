import axios from "axios"

const API = "/api/review";

const Review = {

    userwritereview: async (data) => {
        try {
            return await axios.post(`${API}/userwritereview`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcoursereview: async (courseid) => {
        try {
            return await axios.get(`${API}/getcoursereview${courseid}`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcommentofreview: async (data) => {
        console.log(data);
        
        try {
            return await axios.post(`${API}/getcommentofreview`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getuserrating: async (data, courseid) => {
        try {
            return await axios.post(`${API}/getuserrating${courseid}`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcreatorreview: async (data, creatorid) => {
        try {
            return await axios.get(`${API}/getcreatorreview/${creatorid}`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getratingcreator: async (data, creatorid) => {
        try {
            return await axios.post(`${API}/getratingcreator/${creatorid}`, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getlatestrreview: async () => {
        try {
            return await axios.get(`${API}/getlatestrreview`)
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    
};
export default Review;
