<script>
import { Disclosure, DisclosureButton } from '@headlessui/vue';
import { useAuthStore } from '@/stores/authentication';
import SectionHeader from '@/components/SectionHeader.vue';
import DashboardDisplay from '@/components/DashboardDisplay.vue';
import Firebase from '@/services/firebase';

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
  async created() {
    try {
      this.myRooms = await Firebase.getMyRooms();
    } catch (error) {
      console.error('Error fetching list of my rooms', error);
      this.myRoomsError = error;
    }
  },
  computed: {
    user() {
      const authStore = useAuthStore();
      return JSON.stringify(authStore.user, null, 4);
    }
  },
  methods: {
    generateLink(room) {
      return `/room/${room.id}`;
    }
  }
}
</script>

<template>
  <div>
    <SectionHeader title="My Planning Poker Rooms" />

    <div>
      <div v-if="myRoomsError">
        Unable to fetch your rooms. Please try again later.
      </div>

      <div v-else>
        <Disclosure v-for="room in myRooms" :key="room.id" class="px-8">
          <DisclosureButton
            as="a"
            :href="generateLink(room)"
            class="text-gray-300 text-xl hover:bg-gray-700 hover:text-cyan-500 block rounded-md px-3 py-2 text-base font-medium">
              <div>
                {{ room.name }}
              </div>
              <div class="text-sm">
                <div>Created by: {{ room.createdBy }}</div>
                <div>Room ID: {{ room.id }}</div>
              </div>
            </DisclosureButton>
        </Disclosure>
      </div>
    </div>

    <!-- <SectionHeader title="Previously Joined Rooms" /> -->

  </div>
</template>

<style>

</style>
