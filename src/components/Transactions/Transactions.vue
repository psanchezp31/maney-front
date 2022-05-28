<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="3"
      :rows="transactionRows"
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
    field: (row) => row.category,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "total",
    align: "center",
    label: "Total (COP)",
    field: "amount",
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
  name: "Transactions",
  props: {
    transactionRows: ref,
  },
  setup(props) {
    const { movements, deleteMovement } = useMoneyMovements();
    const loading = ref(false);
    const rowNew = ref(props.newRow);
    const transactionRows = props.transactionRows;

    return {
      transactionRows,
      movements,
      deleteMovement,
      columns,
      loading,
      rowNew,
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
        updatedRows.value.splice(rowId, 1);
        loading.value = false;
      },
    };
  },
};
</script>
