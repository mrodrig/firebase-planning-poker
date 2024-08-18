import Firebase from '@/services/firebase';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    restoreExistingUser(user) {
      this.user = user;
    },
    async loginWithGoogle() {
      this.isLoading = true;
      this.error = null;

      try {
        const result = await Firebase.signInWithGoogle();
        this.user = result.user;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      return Firebase.signOut()
        .then(() => {
          this.user = null;
        });
    },
  }
});
