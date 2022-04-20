import axios from "axios";

export default {
  async getMovements() {
    const resp = await axios.get("http://localhost:8081/money-movements");
    return resp;
  },
};
