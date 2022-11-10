<template>
  <div v-if="tutorName">
    <div class="cursor-pointer hover:text-red-500 absolute right-0 top-0 p-2">
      <p v-on:click="resetTutorStorage()">Signed in as {{ tutorName }}</p>
    </div>
    <div class="fullscreen-center fcg">
      <div>
        <div v-if="submitStatus == 0">
          <p
            class="circle-button pointer-events-auto"
            v-on:click="addSession()"
          >
            Add Session
          </p>
        </div>
        <div v-else-if="submitStatus == 1">
          <p class="circle-button">Loading...</p>
        </div>
        <div v-else>
          <p class="circle-button !bg-green-500">Submitted!</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="fullscreen-center">
      <div class="pointer-events-auto w-72">
        <div class="p-2 text-center">
          <p class="text-xl text-csus">CSUS Helpdesk</p>
          <p class="text-lg">Tutor Portal</p>
        </div>
        <div class="mb-3">
          <label for="name" class="text-sm font-medium text-gray-900 block mb-2"
            >Your name:</label
          >
          <input
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-csus focus:border-csus block w-full p-2.5"
            required=""
            v-model="tutorNameTemp"
          />
        </div>
        <button
          type="submit"
          v-on:click="updateTutorStorage()"
          class="text-white bg-csus hover:bg-csus focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const tutorName = ref("");

const tutorNameTemp = ref("");

// 0 nothing, 1 submitting, 2 successful
const submitStatus = ref(0);

const addSession = () => {
  console.log("adding");
  submitStatus.value = 1;
  axios
    .post(process.env.VUE_APP_BACKEND_URL+"addRecord", {
      tutor: tutorName.value,
    })
    .then(
      (response) => {
        submitStatus.value = 2;
        console.log(response);
        // cooldown on button so no accidental repress
        setTimeout(function () {
          submitStatus.value = 0;
        }, 5000);
      },
      (error) => {
        submitStatus.value = 0;
        console.log(error);
      }
    );
};

const resetTutorStorage = () => {
  console.log("here");
  tutorName.value = "";
  localStorage.setItem("tutorName", tutorName.value);
};

const updateTutorStorage = () => {
  tutorName.value = tutorNameTemp.value;
  tutorNameTemp.value = "";
  localStorage.setItem("tutorName", tutorName.value);
};

onMounted(() => {
  if (localStorage.getItem("tutorName"))
    tutorName.value = localStorage.getItem("tutorName");
});
</script>

<style>
.fcg {
  pointer-events: none;
}
.fcg:hover {
  @apply bg-csus text-white;
}
/* div > a {
  pointer-events: auto;
} */
</style>
