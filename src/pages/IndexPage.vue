<template>
  <q-page class="flex flex-center">
    <Totals />
  </q-page>
</template>
<script>
import Totals from "../components/Totals/Totals.vue";
export default {
  components: {
    Totals,
  },
  name: "IndexPage",
};
</script>
