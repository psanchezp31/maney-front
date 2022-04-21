import { ref } from 'vue';
<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="3"
      :rows="rows"
      :columns="columns"
      row-key="name"
      @row-click="onRowClick"
      hide-bottom
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            color="negative"
            icon-right="delete"
            no-caps
            flat
            dense
            @click="deleteval(rows.indexOf(props.row))"
          />
          <q-btn
            color="primary"
            icon-right="edit"
            no-caps
            flat
            dense
            @click="deleteval(rows.indexOf(props.row))"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
const columns = [
  {
    name: "name",
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
  {
    name: "actions",
    label: "Actions",
    field: "actions",
    align: "center",
  },
];

import { ref } from "vue";
import useMoneyMovements from "../../composables/useMoneyMovements";
export default {
  setup() {
    const { movements, rows } = useMoneyMovements();
    return {
      movements,
      columns,
      rows,
      pagination: ref({
        rowsPerPage: 0,
      }),
      onRowClick(evt, row) {
        console.log("clicked on", row);
      },
      btnclick() {
        console.log("Button Click");
      },
      deleteval(index) {
        console.log(index);
        rows.value.splice(index, 1);
        console.log(rows.value);
      },
    };
  },
};
</script>
