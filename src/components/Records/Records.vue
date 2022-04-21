<template>
  <div class="q-pa-md">
    <q-form @submit="addNewRecord" class="q-gutter-md">
      <div class="flex justify-center items-center form-wrapper flex flex-col">
        <h2 class="font-bold">New Record</h2>
        <div class="flex justify-center items-center inputs-wrapper gap-7">
          <q-input
            v-model="category"
            label="Enter category"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="amount"
            label="Enter amount"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </div>
        <div class="date-wrapper">
          <div class="q-pa-md" style="max-width: 300px">
            <q-input v-model="date" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" today-btn>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
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
    </q-form>
  </div>
</template>
<script>
import { ref } from "vue";
import useMoneyMovements from "../../composables/useMoneyMovements";
export default {
  setup() {
    const { addMovement } = useMoneyMovements();
    const category = ref(null);
    const type = ref(null);
    const amount = ref(null);
    const date = ref("2019/02/01");

    return {
      category,
      amount,
      date,
      type: ref("line"),

      addNewRecord() {
        addMovement({
          category:category.value,
          type:type.value
        });
      },
    };
  },
};
</script>
