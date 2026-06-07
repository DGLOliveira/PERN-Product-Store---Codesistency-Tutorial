import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            set({ products: response.data.data, error: null });
        } catch (error) {
            if (error.statusCode === 429) {
                set({ error: "Rate limit exceeded", products: [] });
            } else {
                set({ error: "Something went wrong" });
            }
        } finally {
            set({ loading: false });
        }
    },

    deleteProduct: async () => {
        set({ loading: true });
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set((prev) => ({ products: prev.products.filter((product) => product.id !== id) }));
            toast.success("Product deleted successfully");
        } catch (error) {
            console.log("Error in deleteProduct function", error);
            toast.error("Something went wrong");
        } finally {
            set({ loading: false });
        }
    },

}));