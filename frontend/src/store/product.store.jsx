import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const useProductStore = create((set, get) => ({
    products: [],
    loading:false,
    error: null,

    fetchProducts: async () => {
        set({loading: true});
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            set({products: response.data.data, error: null});
        } catch (error) {
            if(error.statusCode === 429){
                set({error: "Rate limit exceeded"});
            }else{
                set({error: "Something went wrong"});
            }
        }finally{
            set({loading: false});
        }
    }
}));