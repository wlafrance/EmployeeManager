<template>
  <div id="app">
    <Navbar />
    <!-- <img src="./assets/logo.png"> -->
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>


