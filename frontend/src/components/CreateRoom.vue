<script>
import { v4 as uuidv4 } from 'uuid'
import { useAuthStore } from '@/stores/authentication';
import Firebase from '@/services/firebase';

export default {
  name: 'create-room',
  data() {
    return {
      room: {}
    }
  },
  created() {
    this.initializeRoom()
  },
  methods: {
    initializeRoom() {
      const authStore = useAuthStore();

      this.room = {
        createdById: authStore?.user?.uid,
        createdBy: authStore?.user?.displayName,
        name: '',
        mode: 'Sizing',
        sizes: '0,1,2,3,5,8,13,?',
        sizesRevealed: false,
      }
    },
    async createRoom() {
      try {
        const roomId = uuidv4();
        this.room.sizes = this.room.sizes.split(',');
        await Firebase.createRoom(roomId, this.room);

        this.initializeRoom();

        this.$router.push(`/room/${roomId}`)
      } catch (error) {
        this.error = true;
        console.error(`Failed to create new room: ${error?.message?.toString()}`, error);
      }
    }
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="createRoom()" class="flex flex-col space-y-4 ml-4">

      <div class="flex flex-col">
        <label class="text-gray-300 font-bold">Room Name</label>
        <input 
              v-model="room.name"
              type="text"
              required="true"
              placeholder="Room Name"
              aria-label="Room Name"
              class="w-1/2 text-gray-800 border rounded px-4 py-2 focus:outline-none focus:border-blue-500">
      </div>
      
      <div class="flex flex-col">
        <label class="text-gray-300 font-bold">Size Options (comma separated list)</label>
        <input 
              v-model="room.sizes"
              type="text"
              required="true"
              placeholder="Sizes (e.g. 1,3,5,8,13,?)"
              aria-label="Sizes (e.g. 1,3,5,8,13,?)"
              class="w-1/2 text-gray-800 border rounded px-4 py-2 focus:outline-none focus:border-blue-500">
      </div>
      
      <div class="flex justify-center items-center">
        <button type="submit" class="bg-blue-500 w-1/4 mt-6 text-white font-bold px-4 py-2 rounded hover:bg-blue-600">Create</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
