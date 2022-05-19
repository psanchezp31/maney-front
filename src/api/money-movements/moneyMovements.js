import axios from "axios";

export default {
  getMovements() {
    const resp = axios.get("http://localhost:8081/money-movements");
    return resp;
  },
  addMovement(data) {
    const resp = axios.post("http://localhost:8081/money-movements", data);
    return resp;
  },
  deleteMovement(movementId) {
    const resp = axios.delete(
      `http://localhost:8081/money-movements/${movementId}`
    );
    return resp;
  },
};
