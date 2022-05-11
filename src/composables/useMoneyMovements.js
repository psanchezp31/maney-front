import { ref } from "vue";
import moneyMovementsApi from "../api/money-movements/moneyMovements";

const useMoneyMovements = () => {
  const movements = ref([]);
  const rows = ref([]);
  const getMovements = () => {
    moneyMovementsApi.getMovements().then((response) => {
      movements.value = response.data._embedded.moneyMovements;
      rows.value = movements.value.map((movement) => {
        return {
          name: movement.category,
          total: movement.amount,
        };
      });
      console.log("rows.value :>> ", JSON.stringify(rows.value));
      return rows.value;
    });
  };
  const addMovement = async (movementInfo) => {
    getMovements();
    await moneyMovementsApi
      .addMovement(movementInfo)
      .then((response) => {
        const newMovement = {
          name: response.data.category,
          total: response.data.amount,
        };
        console.log("newMoment: " + JSON.stringify(newMovement));
        rows.value.push(newMovement);
        console.log("rows.value with added :>> ", JSON.stringify(rows.value));
        getMovements()
      })
      .catch((error) => {
        console.error("There was an error: " + error);
      });
  };
  const deleteMovement = (movementId) => {
    moneyMovementsApi
      .deleteMovement(movementId)
      .then((response) => {})
      .catch((error) => {
        console.error("There was an error: " + error);
      });
  };
  return {
    movements,
    rows,
    addMovement,
    deleteMovement,
    getMovements,
  };
};

export default useMoneyMovements;
