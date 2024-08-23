<script>
import { Disclosure, DisclosureButton } from '@headlessui/vue';
import { useAuthStore } from '@/stores/authentication';
import SectionHeader from '@/components/SectionHeader.vue';
import DashboardDisplay from '@/components/DashboardDisplay.vue';
// import Firebase from '@/services/firebase';

export default {
  components: {
    SectionHeader,
    DashboardDisplay,
    Disclosure,
    DisclosureButton,
  },
  data: () => ({
    myRooms: [],
    myRoomsError: false,
  }),
  computed: {
    user() {
      const authStore = useAuthStore();
      return JSON.stringify(authStore.user, null, 4);
    }
  },
}
</script>

<template>
  <div>
    <SectionHeader title="Room" />

  </div>
</template>

<style>

</style>
