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
      :loading="loading"
      no-data-label="I didn't find anything for you"
      hide-bottom
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            color="negative"
            icon-right="delete"
            no-caps
            flat
            dense
            @click="deleteRow(movements[props.rowIndex].id, props.rowIndex)"
          />
          <q-btn
            color="primary"
            icon-right="edit"
            no-caps
            flat
            dense
            @click="deleteRow(movements[props.rowIndex].id, props.rowIndex)"
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

import { ref, watch, onMounted } from "vue";
import useMoneyMovements from "../../composables/useMoneyMovements";
export default {
  setup() {
    const { movements, rows, deleteMovement, getMovements } =
      useMoneyMovements();

    watch(
      () => rows.value,
      () => {
        console.log("hola from watch");
        // getMovements();
      }
    );

    onMounted(() => {
      getMovements();
    });

    const loading = ref(false);
    return {
      movements,
      deleteMovement,
      columns,
      rows,
      loading,
      pagination: ref({
        rowsPerPage: 0,
      }),
      onRowClick(evt, row) {
        console.log("clicked on", row);
      },
      btnclick() {
        console.log("Button Click");
      },
      deleteRow(movementId, rowId) {
        loading.value = true;
        deleteMovement(movementId);
        rows.value.splice(rowId, 1);
        loading.value = false;
      },
    };
  },
};
</script>
