<template>
  <div class="q-pa-md">
    <q-table :rows="rows" row-key="name" hide-bottom />
  </div>
</template>
<script>
const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: false,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: false },
];
const rows = [
  {
    name: "Total incomes",
    amount: 10000000,
  },
  {
    name: "Total expenses",
    amount: 2000000,
  },
  {
    name: "Total debt",
    amount: 3000000,
  },
];
export default {
  setup() {
    return {
      columns,
      rows,
    };
  },
};
</script>
