import axios from "axios"

const API = "/api/crouses";

const Course = {

    addcourse: async (data) => {        
        try {
            const res = await axios.post(`${API}/addcourse`, data, {
                withCredentials: true,
            });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    addcourseimage: async (data) => {
        try {
            const formData = new FormData();
            formData.append("courseimage", data);

            const res = await axios.post(`${API}/addcourseimage`, formData, { withCredentials: true, })            
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    updatecourse: async (data, courseId) => {        
        try {
            const res =  await axios.patch(`${API}/updatecourse/${courseId}`, data, { withCredentials: true, });
            console.log(res);
            return res
            
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    updatecourseimage: async (data, courseId) => {
        try {
            const formData = new FormData();
            formData.append("courseimage", data);

            const res = await axios.patch(`${API}/updatecourseimage/${courseId}`, formData, { withCredentials: true, })            
            return res

        } catch (error) {
            console.log(error);
            throw error
        }
    },

    allcourses: async () => {
        try {
            return await axios.get(`${API}/allcourses`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcourse: async (courseId) => {
        try {
            return await axios.get(`${API}/getcourse/${courseId}`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    dashboardcreator: async () => {
        try {
            return await axios.get(`${API}/dashboardcreator`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    deletecourse: async (courseId) => {
        try {
            return await axios.get(`${API}/deletecourse/${courseId}`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getlatestreview: async (data) => {
        try {
            return await axios.post(`${API}/getlatestreview`, data,{ withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getcoursereview: async (courseId) => {
        try {
            return await axios.get(`${API}/getcoursereview/${courseId}`, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    coursebytags:async (data) =>{        
        try {
            return await axios.post(`${API}/coursebytags`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    avreageratingdata: async (data) => {
        try {
            return await axios.post(`${API}/avreageratingdata`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    onecourserating: async (data) => {
        try {
            return await axios.post(`${API}/onecourserating`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    searchonecreatorcoruse: async (data) => {
        try {
            return await axios.post(`${API}/searchonecreatorcoruse`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    
    updateprice: async (courseId) => {
        try {
            return await axios.post(`${API}/updateprice${courseId}`, data, { withCredentials: true, })
        } catch (error) {
            console.log(error);
            throw error
        }
    }

};
export default Course;
