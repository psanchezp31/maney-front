<template>
  <q-page class="flex flex-col justify-center items-center w-2/3">
    <Totals />
    <Transactions :transactionRows="transactionRows" />
    <Records @onRecordAdded="onRecordAdded" />
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
    const transactionRows = ref([]);
    transactionRows.value = movements;
    getMovements();
    return {
      movements,
      transactionRows,
      onRecordAdded() {
        transactionRows.value = getMovements();
      },
    };
  },
};
</script>
