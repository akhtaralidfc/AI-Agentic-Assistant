import axios from "axios";

const API_URL="http://localhost:8080/api/ask";

export const fetchChatResponse=async(question)=>{
    try{
        const response=await axios.post(API_URL,{question})
        console.log(response.data)
        return response.data;
    }catch(error){
        console.error(error);
        throw error;
    }
}