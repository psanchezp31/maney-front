<template>
  <div class="pt-8">
    <q-layout view="hHh lpR fFf">
      <q-header elevated>
        <Navbar />
      </q-header>
      <q-page-container class="flex flex-col justify-center items-center">
          <router-view />
      </q-page-container>
      <Footer />
    </q-layout>
  </div>
</template>

<script>
import Footer from "src/components/Footer/Footer.vue";
import { defineComponent } from "vue";
import Navbar from "../components/Navbar/Navbar.vue";
export default defineComponent({
  name: "MainLayout",
  components: { Navbar, Footer },
  setup() {
    return {};
  },
});
</script>
