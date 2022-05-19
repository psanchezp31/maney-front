<template>
  <div class="q-pa-md">
    <div class="flex justify-center items-center gap-4">
      <label class="font-bold">Add New Record</label>
      <q-btn
        unelevated
        round
        color="primary"
        icon="las la-plus"
        @click="visible = !visible"
        size="sm"
      />
    </div>
    {{ updatedRows }}
    <q-slide-transition>
      <div v-show="visible">
        <form @submit.prevent.stop="addNewRecord" class="q-gutter-md">
          <div
            class="flex justify-center items-center form-wrapper flex flex-col"
          >
            <div class="flex justify-center items-center inputs-wrapper gap-7">
              <q-input
                ref="categoryRef"
                v-model="category"
                label="Enter category"
                lazy-rules
                :rules="categoryRules"
              />
              <q-input
                ref="amountRef"
                v-model="amount"
                label="Amount"
                type="number"
                :rules="amountRules"
                prefix="COP $"
              />
            </div>
            <div class="flex justify-center items-center inputs-wrapper gap-7">
              <q-input v-model="proxyDate" label="Date" ref="dateRef">
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
              <q-input v-model="description" label="Description" />
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
              <q-btn label="Add record" type="submit" color="primary" />
            </div>
          </div>
        </form>
      </div>
    </q-slide-transition>
    <button @click="$emit('buttonClicked')">click me</button>
  </div>
</template>

<script>
import { ref, computed, emits } from "vue";
import { useQuasar } from "quasar";
import useMoneyMovements from "../../composables/useMoneyMovements";
import useDate from "../../composables/useDate";

export default {
  name: "Records",
  emits: ["getUpdatedRows", "buttonClicked"],
  setup(props, context) {
    console.log("context :>> ", context);
    const $q = useQuasar();
    const { addMovement, getMovements, rows } = useMoneyMovements();
    const { todayDateParsed, currentHour, getDateToSend } = useDate();
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

    const updatedRows = computed({
      get: () => rows.value,
      set: (value) => {
        rows.value = value;
      },
    });

    return {
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
      updatedRows,
      rows,

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
      },
      areValidInputs() {
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
        };
        if (this.areValidInputs()) {
          addMovement(movementInfo)
            .then((response) => {
              $q.notify({
                icon: "done",
                color: "positive",
                message: "Submitted",
              });
              context.emit("buttonClicked");
            })
            .catch(() => console.log("Error"));
          updatedRows.value.push({
            name: movementInfo.category,
            total: movementInfo.amount,
          });
          context.emit("getUpdatedRows", updatedRows.value);
          console.log(updatedRows.value);
          // updatedRows.value = {
          //   ...updatedRows,
          //   name: movementInfo.category,
          //   total: movementInfo.amount,
          // };
        } else {
          $q.notify({
            icon: "done",
            color: "negative",
            message: "No submitted",
          });
        }
      },
      initValues() {
        category.value = null;
        type.value = null;
        amount.value = null;
        description.value = null;
        date.value = todayDateParsed;
      },
      updateProxy() {
        proxyDate.value = date.value;
      },
      saveDate() {
        date.value = proxyDate.value;
      },
    };
  },
};
</script>
