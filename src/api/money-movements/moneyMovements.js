import axios from "axios";

export default {
  getMovements() {
    const resp = axios.get("http://localhost:8081/money-movements");
    return resp;
  },
  async addMovement(data){
    const resp = await axios.post("http://localhost:8081/money-movements", data);
    return resp;
  },
  async deleteMovement(movementId){
    const resp = await axios.delete(`http://localhost:8081/money-movements/${movementId}`)
    return resp
  }
};
