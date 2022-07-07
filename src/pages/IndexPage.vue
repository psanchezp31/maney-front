<template>
  <q-page
    class="flex flex-col justify-center items-center w-2/3"
    id="main-container"
    ref="root"
  >
    <Totals />
    <Transactions
      :transactionRows="transactionRows"
      @scrollToBottom="scrollToBottom"
    />
    <Records @onRecordAdded="onRecordAdded" :rowToEdit="rowToEdit" />
  </q-page>
</template>
<script>
import Transactions from "src/components/Transactions/Transactions.vue";
import Totals from "../components/Totals/Totals.vue";
import Records from "src/components/Records/Records.vue";
import useMoneyMovements from "../composables/useMoneyMovements";
import { ref, computed, watchEffect } from "vue";

export default {
  components: {
    Totals,
    Transactions,
    Records,
  },
  name: "IndexPage",
  setup() {
    const { movements, getMovements } = useMoneyMovements();
    const transactionRows = ref(null);
    transactionRows.value = movements;
    const rowToEdit = ref(null);
    getMovements();

    return {
      rowToEdit,
      movements,
      transactionRows,
      onRecordAdded() {
        transactionRows.value = getMovements();
        console.log('transactionRows onRecordAdded :>> ', transactionRows.value);
      },
      scrollToBottom(row) {
        if (row !== null) {
          rowToEdit.value = row;
        }
        console.log(rowToEdit.value);
        window.scrollTo(0, 855);
      },
    };
  },
};
</script>
