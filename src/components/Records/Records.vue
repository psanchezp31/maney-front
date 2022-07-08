<template>
  <div class="q-pa-md">
    <div class="flex justify-center items-center gap-4">
      <label class="font-bold">{{
        isEditing ? "Update Record" : "Add New Record"
      }}</label>
      <q-btn
        unelevated
        round
        color="primary"
        icon="las la-plus"
        @click="visible = !visible"
        size="sm"
      />
    </div>
    <q-slide-transition>
      <div v-show="visible">
        <q-form
          @submit.prevent="addNewRecord"
          class="q-gutter-md"
          ref="formRecords"
          @validation-error="errorValidation"
        >
          <div
            class="flex justify-center items-center form-wrapper flex flex-col"
          >
            <div class="flex justify-center items-center inputs-wrapper gap-7">
              <!-- <q-input
                ref="categoryRef"
                v-model="category"
                label="Enter category"
                lazy-rules
                :rules="categoryRules"
              /> -->
              <q-select
                dense
                ref="categoryRef"
                v-model="category"
                label="Enter category"
                use-input
                input-debounce="0"
                @new-value="createValue"
                :options="filterOptions"
                @filter="filterFn"
                style="width: 220px"
              />
              <q-input
                ref="amountRef"
                v-model="amount"
                label="Amount"
                type="number"
                :rules="amountRules"
                prefix="COP $"
                style="width: 220px"
              />
            </div>
            <div class="flex justify-center items-center inputs-wrapper gap-7">
              <q-input
                v-model="proxyDate"
                label="Date"
                ref="dateRef"
                style="width: 220px"
              >
                <q-popup-proxy
                  @before-show="updateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="proxyDate">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        label="Cancel"
                        color="primary"
                        flat
                        v-close-popup
                      />
                      <q-btn
                        label="OK"
                        color="primary"
                        flat
                        @click="saveDate"
                        v-close-popup
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-input>
              <q-input
                v-model="description"
                label="Description"
                style="width: 220px"
              />
            </div>
            <div class="q-gutter-sm radio-selector-type">
              <q-radio
                v-model="type"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="income"
                label="Income"
                color="green"
              /><q-radio
                v-model="type"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="expense"
                label="Expense"
                color="red"
              />
            </div>
            <div>
              <q-btn
                :label="isEditing ? 'Update' : 'Add record'"
                type="submit"
                color="primary"
              />
            </div>
          </div>
        </q-form>
      </div>
    </q-slide-transition>
  </div>
</template>

<script>
import { ref, watchEffect, computed, watch } from "vue";
import { useQuasar } from "quasar";
import useMoneyMovements from "../../composables/useMoneyMovements";
import useDate from "../../composables/useDate";
import shallowEqual from "../../util/utilFunctions";

const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

export default {
  name: "Records",
  props: {
    rowToEdit: Object,
  },
  setup(props, context) {
    const $q = useQuasar();
    const { addMovement, editMovement } = useMoneyMovements();
    const { todayDateParsed, currentHour, getDateToSend } = useDate();
    const formRecords = ref(null);
    const category = ref(null);
    const categoryRef = ref(null);
    const amount = ref(null);
    const amountRef = ref(null);
    const date = ref(todayDateParsed);
    const dateRef = ref(null);
    const proxyDate = ref(todayDateParsed);
    const description = ref(null);
    const visible = ref(true);
    const type = ref("line");
    const recordToEdit = computed(() =>
      props.rowToEdit ? props.rowToEdit : ""
    );
    const isEditing = ref(false);
    const hasEdited = ref(true);

    const filterOptions = ref(stringOptions);

    watch(recordToEdit, (newValue, oldValue) => {
      if (newValue.id !== oldValue.id) {
        hasEdited.value = true;
      } else {
        if (!shallowEqual(newValue, oldValue)) {
          hasEdited.value = true;
        }
      }
    });

    watchEffect(() => {
      if (recordToEdit.value && hasEdited.value) {
        category.value = recordToEdit.value.category;
        amount.value = recordToEdit.value.amount;
        description.value = recordToEdit.value.description;
        const dateToSend = getDateToSend(ref(recordToEdit.value.creationDate));
        proxyDate.value = dateToSend.value;
        type.value = recordToEdit.value.type;
        isEditing.value = true;
      } else {
        isEditing.value = false;
      }
    });

    function areValidInputs() {
      categoryRef.value.validate();
      amountRef.value.validate();
      dateRef.value.validate();
      if (
        amountRef.value.hasError ||
        categoryRef.value.hasError ||
        dateRef.value.hasError
      ) {
        return false;
      } else {
        return true;
      }
    }

    function initValues() {
      category.value = null;
      type.value = null;
      amount.value = null;
      description.value = null;
      date.value = todayDateParsed.value;
      formRecords.value.reset();
    }

    return {
      formRecords,
      category,
      categoryRef,
      amount,
      amountRef,
      date,
      dateRef,
      type,
      visible,
      proxyDate,
      description,
      areValidInputs,
      initValues,
      recordToEdit,
      isEditing,
      filterOptions,
      amountRules: [
        (val) => (val && val.length > 0) || "Please type a valid amount",
      ],
      categoryRules: [
        (val) => (val && val.length > 0) || "Please type a category",
      ],
      movementInfo: {
        category: category.value,
        type: type.value,
        amount: amount.value,
        description: description.value,
        creationDate: `${date.value}${currentHour.value}`,
        type: type.value,
      },
      errorValidation() {
        $q.notify({
          icon: "warning",
          color: "negative",
          message: "There are empty fields",
        });
      },
      addNewRecord() {
        const dateToSend = getDateToSend(date);
        date.value = dateToSend.value;
        const movementInfo = {
          category: category.value,
          type: type.value,
          amount: amount.value,
          description: description.value,
          creationDate: `${date.value}${currentHour.value}`,
          type: type.value,
        };
        if (areValidInputs()) {
          if (!hasEdited.value || !recordToEdit.value.id) {
            addMovement(movementInfo)
              .then(() => {
                $q.notify({
                  icon: "done",
                  color: "positive",
                  message: "Submitted",
                });
                context.emit("onRecordAdded");
                initValues();
              })
              .catch(() => console.log("Error"));
          } else {
            editMovement(recordToEdit.value.id, movementInfo)
              .then(() => {
                $q.notify({
                  icon: "done",
                  color: "positive",
                  message: "Record updated",
                });
                context.emit("onRecordAdded");
                hasEdited.value = false;
                initValues();
              })
              .catch(() => console.log("Error"));
          }
        }
      },
      updateProxy() {
        proxyDate.value = date.value;
      },
      saveDate() {
        date.value = proxyDate.value;
      },
      createValue(val, done) {
        // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
        // only if is not already set
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
        // (adds to model if not already in the model, removes from model if already has it)
        // and it resets the input textbox to empty string
        // ----
        // If "var" content is undefined/null, then it doesn't tampers with the model
        // and only resets the input textbox to empty string

        if (val.length > 0) {
          if (!stringOptions.includes(val)) {
            stringOptions.push(val);
          }
          done(val, "toggle");
        }
      },

      filterFn(val, update) {
        update(() => {
          if (val === "") {
            filterOptions.value = stringOptions;
          } else {
            const needle = val.toLowerCase();
            filterOptions.value = stringOptions.filter(
              (v) => v.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      },
    };
  },
};
</script>
