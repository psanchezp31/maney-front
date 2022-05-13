<template>
  <q-page class="flex flex-col justify-center items-center w-2/3">
    <Totals />
    index: {{ rowsValues }}
    <Transactions :rowsValues="rowsValues" v-if="rowsValues" />
    <!-- <Records :rowsValues="rowsValues" /> -->
  </q-page>
</template>
<script>
import Transactions from "src/components/Transactions/Transactions.vue";
import Totals from "../components/Totals/Totals.vue";
import Records from "src/components/Records/Records.vue";
import useMoneyMovements from "../composables/useMoneyMovements";
import { onMounted, ref } from "vue";
import moneyMovementsApi from "../api/money-movements/moneyMovements";

export default {
  components: {
    Totals,
    Transactions,
    Records,
  },
  name: "IndexPage",
  setup() {
    const { getMovements, getRows, rows } = useMoneyMovements();
    const rowsValues = ref([]);

    // const respt = getMovements();
    // respt.then(function (result) {
    //   rowsValues.value = result;
    //   console.log("rowsValues.value inside then :>> ", rowsValues.value);
    // });
      // moneyMovementsApi.getMovements().then((response) => {
      //   rowsValues.value = response.data._embedded.moneyMovements.map(
      //     (movement) => {
      //       return {
      //         name: movement.category,
      //         total: movement.amount,
      //       };
      //     }
      //   );
      //   console.log('rowsValues.value :>> ', rowsValues.value);
      // });

      rowsValues.value = getMovements()

    return {
      // getMovements,
      rowsValues,
    };
  },
};
</script>
