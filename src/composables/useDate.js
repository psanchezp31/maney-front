import { ref } from "vue";

const useDate = () => {
  const todayDateParsed = ref(null);
  const currentHour = ref(null);
  const dateToSend = ref(null);

  const getTodayDateParsed = (today = new Date().toISOString()) => {
    const year = today.substring(0, 4);
    const month = today.substring(5, 7);
    const day = today.substring(8, 10);
    todayDateParsed.value = `${year}/${month}/${day}`;
    return todayDateParsed;
  };
  const getCurrentHour = () => {
    const isoDate = new Date().toISOString();
    currentHour.value = isoDate.substring(10, isoDate.length);
    return currentHour;
  };
  const getDateToSend = (date) => {
    if (date.value) {
      const year = date.value.substring(0, 4);
      const month = date.value.substring(5, 7);
      const day = date.value.substring(8, 10);
      dateToSend.value = `${year}-${month}-${day}`;
      return dateToSend;
    }
  };
  getTodayDateParsed();
  getCurrentHour();
  return {
    todayDateParsed,
    currentHour,
    getDateToSend,
  };
};

export default useDate;
