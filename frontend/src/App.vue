<script>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
import Firebase from '@/services/firebase';
import { useAuthStore } from '@/stores/authentication';

export default {
  components: {
    NavBar,
    RouterView
  },
  mounted() {
    Firebase.onAuthStateChanged((user) => {
      const authStore = useAuthStore();
      if (user) {
        authStore.restoreExistingUser(user);
      }
    });
  }
}
</script>

<template>
  <div>
    <NavBar id="nav" />

    <RouterView id="content" class="overflow-hidden bg-gray-700" />
  </div>

</template>

<style scoped>
#nav {
  min-height: 7vh;
}

#content {
  height: 90vh;
}
</style>
