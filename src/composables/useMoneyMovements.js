import { ref } from "vue";
import moneyMovementsApi from "../api/money-movements/moneyMovements";

const useMoneyMovements = () => {
  const movements = ref([]);
  const rows = ref([]);
  const getMovements = () => {
    console.log("hola")
    moneyMovementsApi.getMovements().then((response) => {
      movements.value = response.data._embedded.moneyMovements;
      rows.value = movements.value.map((movement) => {
        return {
          name: movement.category,
          total: movement.amount,
        };
      });
    });
  };
  const addMovement = async (movementInfo) => {
    await moneyMovementsApi
      .addMovement(movementInfo)
      .then((response) => {})
      .catch((error) => {
        console.error("There was an error: " + error);
      });
  };
  const deleteMovement = (movementId) => {
    moneyMovementsApi
      .deleteMovement(movementId)
      .then((response) => {
      })
      .catch((error) => {
        console.error("There was an error: " + error);
      });
  };
  return {
    movements,
    rows,
    addMovement,
    deleteMovement,
    getMovements
  };
};

export default useMoneyMovements;
