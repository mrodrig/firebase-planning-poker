<script>
import { useAuthStore } from '@/stores/authentication';

export default {
  computed: {
    user() {
      const authStore = useAuthStore();
      return JSON.stringify(authStore.user, null, 4);
    }
  }
}
</script>

<template>
  <div id="reports">
    <h1>Reports</h1>

    
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
