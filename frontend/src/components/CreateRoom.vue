<script>
import { v4 as uuidv4 } from 'uuid'
import firebase from '@/services/firebase'

export default {
  name: 'create-room',
  components: {},
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
      this.room = {
        name: '',
        metadata: {
          // TODO: update this to pull from the authStore
          // creator: <authStore...>,
          mode: 'Sizing',
          sizes: '0,1,2,3,5,8,13,?',
          sizesRevealed: false
        },
        participants: {}
      }
    },
    createRoom() {
      this.room.id = uuidv4()
      firebase.createRoom(this.room)
      this.initializeRoom()

      // TODO: Load the room
      // this.$router.push(`/room/${this.room.id}`)
    }
  }
}
</script>

<template>
  <div>
    <div>
      <div>
        <label>
          Room Name

          <div>
            <input 
              v-model="room.name"
              type="text"
              placeholder="Room Name"
              aria-label="Room Name"
            />
          </div>
        </label>
      </div>

      <div class="row">
        <label>
          Size Options (comma separated list)
          
          <div>
            <input
              v-model="room.metadata.sizes"
              type="text"
              placeholder="Sizes (e.g. 1,3,5,8,13,?)"
              aria-label="Sizes (e.g. 1,3,5,8,13,?)"
            />
          </div>
        </label>
      </div>

      <div>
        <button v-on:click="createRoom()">Create</button>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
