import { ref } from "vue";
import moneyMovementsApi from "../api/money-movements/moneyMovements";

const useMoneyMovements = () => {
  const movements = ref([]);
  const getMovements = () => {
    moneyMovementsApi.getMovements().then((response) => {
      movements.value = response.data._embedded.moneyMovements;
      return movements;
    });
  };
  const addMovement = async (movementInfo) => {
    moneyMovementsApi.addMovement(movementInfo);
  };
  const deleteMovement = (movementId) => {
    moneyMovementsApi
      .deleteMovement(movementId)
      .then((response) => {})
      .catch((error) => {
        console.error("There was an error: " + error);
      });
  };
  const editMovement = (movementId, movementInfo) => {
    moneyMovementsApi.editMovement(movementId, movementInfo).catch((error) => {
      console.error("There was an error: " + error);
    });
  };
  return {
    movements,
    getMovements,
    addMovement,
    deleteMovement,
    editMovement
  };
};

export default useMoneyMovements;
