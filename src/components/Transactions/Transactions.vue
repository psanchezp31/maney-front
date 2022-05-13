<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="3"
      :rows="updatedRows"
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
      <!-- <template v-slot:body-cell-actions="props">
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
      </template> -->
    </q-table>
    rowsvalues in transactions: {{ rowsValues }}
    rows: {{rows}}
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
import { ref, watch, computed, reactive, onMounted, onCreated } from "vue";
import useMoneyMovements from "../../composables/useMoneyMovements";
export default {
  name: "Transactions",
  props: ["rowsValues"],
  setup(props, context) {
    const { movements, deleteMovement, getMovements, rows } = useMoneyMovements();
    const loading = ref(false);
    const rowsValues = reactive(props.rowsValues);
    const updatedRows = computed(()=>{
      console.log(rows.value[0])
      return rows.value
    })
    // watch(
    //   () => rowsValues.value.length,
    //   () => console.log("holaa")
    // );



    console.log("oncreated transactions: " + JSON.stringify(updatedRows.value));

    return {
      movements,
      deleteMovement,
      columns,
      updatedRows,
      rowsValues,
      loading,
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
