<template>
  <q-page class="flex flex-col justify-center items-center w-2/3">
    <Totals />
    <Transactions
      :newRow="newRow"
      :transactionRows="transactionRows"
    />
    <Records @getUpdatedRows="getUpdatedRows" @buttonClicked="buttonClicked" />
  </q-page>
</template>
<script>
import Transactions from "src/components/Transactions/Transactions.vue";
import Totals from "../components/Totals/Totals.vue";
import Records from "src/components/Records/Records.vue";
import useMoneyMovements from "../composables/useMoneyMovements";
import { ref } from "vue";

export default {
  components: {
    Totals,
    Transactions,
    Records,
  },
  name: "IndexPage",
  setup() {
    const { movements, getMovements } = useMoneyMovements();
    // getMovements();
    const transactionRows = ref([]);
    transactionRows.value = movements;

    // console.log("movements = " + JSON.stringify(movements));
    // console.log(
    //   "transactionRows.value = " + JSON.stringify(transactionRows.value)
    // );

    const newRow = ref(null);
    return {
      movements,
      transactionRows,
      buttonClicked: () => {
        // console.log("isSibling1Clicked.value: " + isSibling1Clicked.value);
        transactionRows.value = getMovements();
      },
      getUpdatedRows: (val) => {
        // console.log("emitted value: " + JSON.stringify(val));
        newRow.value = val;
        return newRow;
      },
      onRecordAdded() {
        transactionRows.value = getMovements();
      },
    };
  },
};
</script>
