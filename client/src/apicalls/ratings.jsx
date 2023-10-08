import {axiosInstance} from "./axiosInstance";


export const GetRatings = async(id) =>{
    try {
     const response = await axiosInstance.post(`/api/books/${id}}/ratings`, { rating, review });
     return response.data;
    } catch (error) {
        console.log(error);
    }
  }