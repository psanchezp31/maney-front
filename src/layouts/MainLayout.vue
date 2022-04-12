<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <Navbar />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import Navbar from "./Navbar.vue";

export default defineComponent({
  name: "MainLayout",

  components: {Navbar},

  setup() {
    return {};
  },
});
</script>
