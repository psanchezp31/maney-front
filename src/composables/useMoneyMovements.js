import { ref } from "vue";
import moneyMovementsApi from "../api/money-movements/moneyMovements";

const useMoneyMovements = () => {
  const movements = ref([]);
  const rows = ref();
  // let rows2 = [];
  const getMovements = () => {
    moneyMovementsApi.getMovements().then((response) => {
      movements.value = response.data._embedded.moneyMovements;
      // rows.value = movements.value.map((movement) => {
      //   return {
      //     name: movement.category,
      //     total: movement.amount,
      //   };
      // });
      // rows2 = rows.value;
      // console.log("1: rows2 -> ", JSON.stringify(rows2.length));
      // console.log("1: movements -> ", JSON.stringify(movements.value.length));
    });
    // console.log("2: outside movements fetching");
    // console.log("2: movements -> ", JSON.stringify(movements.value.length));
    // rows.value = [{ name: "x", total: 1 }];
    // rows2 = [{ name: "y", total: 1 }];
    // movements.value = [{ category: "y", amount: 1 }];
    return movements;
  };
  // console.log("running getMovements automatically");
  getMovements();
  const addMovement = async (movementInfo) => {
    moneyMovementsApi.addMovement(movementInfo);
  };
  const deleteMovement = (movementId) => {
    moneyMovementsApi
      .deleteMovement(movementId)
      .then((response) => {
        getMovements();
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
    getMovements,
  };
};

export default useMoneyMovements;
