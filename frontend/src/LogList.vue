<template>
  <div>
    <DataTable :value="logs">
      <Column field="day" header="Day"></Column>
      <Column field="time" header="Time"></Column>
      <Column field="tutor" header="Tutor"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import axios from "axios";
import { ref, onMounted } from "vue";

const logs = ref({});

onMounted(() => {
  console.log(process.env.VUE_APP_BACKEND_URL)
  console.log("adding");
  axios.get(process.env.VUE_APP_BACKEND_URL+"sessions").then(
    (response) => {
      console.log(response.data);
      logs.value = response.data;
      logs.value.forEach((element, i) => {
        let d = new Date(logs.value[i].date);
        logs.value[i].date = d;
        logs.value[i].day = d.getMonth() + "-" + d.getDate()
        logs.value[i].time = d.getHours() + ":" + d.getMinutes()
      });
      console.log(logs.value);
    },
    (error) => {
      console.log(error);
    }
  );
});
</script>
