<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-virtscroll-table my-sticky-header-table auto-width"
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
      table-style="max-height: 400px"
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
            @click="
              deleteRow(transactionRows[props.rowIndex].id, props.rowIndex)
            "
          />
          <q-btn
            color="primary"
            icon-right="edit"
            no-caps
            flat
            dense
            @click="editRow(transactionRows[props.rowIndex].id, props)"
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
    transactionRows: Object,
  },
  emits: ["scrollToBottom"],
  setup(props, context) {
    const { movements, deleteMovement, editMovement } = useMoneyMovements();
    const loading = ref(false);
    const transactionRows = props.transactionRows;

    return {
      transactionRows,
      movements,
      deleteMovement,
      columns,
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
      deleteRow(transactionId, rowId) {
        loading.value = true;
        setTimeout(() => {
          deleteMovement(transactionId);
          transactionRows.value.splice(rowId, 1);
          loading.value = false;
        }, 1000);
      },
      editRow(transactionId, rowId) {
        // console.log("transactionId :>> ", transactionId);
        // console.log("transactionInfo :>> ", rowId);
        // editMovement(transactionId)
        context.emit("scrollToBottom", rowId.row);


      },
    };
  },
};
</script>
<style scoped>
/deep/.scroll {
  overflow-x: hidden;
}
</style>
