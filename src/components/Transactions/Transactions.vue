<template>
  <div class="q-pa-md">
    <q-table :rows="rows" :columns="columns" row-key="name" hide-bottom />
  </div>
</template>
<script>
const columns = [
  {
    name: "category",
    required: true,
    label: "Category (Count)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "total",
    align: "center",
    label: "Total (COP)",
    field: "total",
    sortable: true,
  },
];
const rows = [
  {
    name: "Salary (1)",
    total: 10000000,
  },
  {
    name: "Market (3)",
    total: 150000,
  },
  {
    name: "Health (1)",
    total: 45000,
  },
  {
    name: "Pet (3)",
    total: 500000,
  },
  {
    name: "House (3)",
    total: 150000,
  },
  {
    name: "Shopping (1)",
    total: 10000,
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
