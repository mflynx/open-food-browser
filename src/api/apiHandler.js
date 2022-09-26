import axios from "axios";

const baseURL = "https://world.openfoodfacts.org";

const api = {
  async searchFood(searchTerm, page = 1) {
    try {
      const res = await axios.get(
        `${baseURL}/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&fields=id%2Cproduct_name%2Cimage_front_small_url&json=1&page=${page}&page_size=24`
      );
      return res.data;
    } catch (e) {
      console.error(e);
      return "error"
    }
  },
  async getDetails(productId) {
    try {
      const res = await axios.get(
        `${baseURL}/api/v0/product/${productId}.json?fields=product_name%2Ccategories%2Cimage_front_url%2Callergens_hierarchy%2Cingredients_text`
      );
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
};

export default api;
