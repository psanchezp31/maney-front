<template>
  <q-page class="flex flex-col justify-center items-center w-2/3">
    <Totals />
    <Transactions />
    <Records />
  </q-page>
</template>
<script>
import Transactions from "src/components/Transactions/Transactions.vue";
import Totals from "../components/Totals/Totals.vue";
import Records from "src/components/Records/Records.vue";
export default {
  components: {
    Totals,
    Transactions,
    Records,
  },
  name: "IndexPage",
};
</script>
