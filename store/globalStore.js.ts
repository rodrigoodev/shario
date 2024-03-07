import { defineStore } from "pinia";

interface User {
  id: string | undefined;
  email: string | undefined;
}

export const useGlobalStore = defineStore("globalStore", () => {
  const user = ref<User | null>(null);

  const setUser = (newUser: User) => {
    user.value = newUser;
  };

  return {
    user,
    setUser,
  };
});
