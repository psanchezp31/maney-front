<template>
  <q-page class="flex flex-center">
    <TotalsView />
  </q-page>
</template>
<script>
import TotalsView from "../components/Totals/TotalsView.vue";
export default {
  components: {
    TotalsView,
  },
  name: "IndexPage",
};
</script>
