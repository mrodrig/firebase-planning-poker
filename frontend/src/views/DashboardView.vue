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
  <div id="dashboard">
    <SectionHeader title="Dashboard" />

    <DashboardDisplay />

    <!-- <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-medium text-gray-900">Card Title</h2>
        <p class="text-gray-700 text-sm">Some additional content</p>
      </div>
    </div> -->
  </div>
</template>

<style>

</style>
