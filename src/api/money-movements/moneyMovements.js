import axios from "axios";

export default {
  getMovements() {
    const response = axios.get("http://localhost:8081/money-movements");
    return response;
  },
  addMovement(data) {
    const response = axios.post("http://localhost:8081/money-movements", data);
    return response;
  },
  deleteMovement(movementId) {
    const response = axios.delete(
      `http://localhost:8081/money-movements/${movementId}`
    );
    return response;
  },
  editMovement(movementId, data){
    const response = axios.put(`http://localhost:8081/money-movements/${movementId}`, data)
    return response
  }
};
