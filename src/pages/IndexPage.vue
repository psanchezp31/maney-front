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
    <Records @onRecordAdded="onRecordAdded" />
  </q-page>
</template>
<script>
import Transactions from "src/components/Transactions/Transactions.vue";
import Totals from "../components/Totals/Totals.vue";
import Records from "src/components/Records/Records.vue";
import useMoneyMovements from "../composables/useMoneyMovements";
import { ref, onMounted } from "vue";

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
    const root = ref(null);
    const container = ref(null);
    transactionRows.value = movements;
    getMovements();

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(root.value); // this is your $el
      container.value = root.value.$el.querySelector("#main-container");
      container.scrollTop = 855;
    });
    return {
      root,
      container,
      movements,
      transactionRows,
      onRecordAdded() {
        transactionRows.value = getMovements();
      },
      scrollToBottom() {
        container.scrollTop = 855;
      },
    };
  },
};
</script>
