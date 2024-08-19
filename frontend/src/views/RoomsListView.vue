<script>
import { useAuthStore } from '@/stores/authentication';
import SectionHeader from '@/components/SectionHeader.vue';
import DashboardDisplay from '@/components/DashboardDisplay.vue';

export default {
  components: {
    SectionHeader,
    DashboardDisplay,
  },
  computed: {
    user() {
      const authStore = useAuthStore();
      return JSON.stringify(authStore.user, null, 4);
    }
  }
}
</script>

<template>
  <div>
    <SectionHeader title="My Planning Poker Rooms" />

    <SectionHeader title="Previously Joined Rooms" />

  </div>
</template>

<style>

</style>
