<script lang="ts" setup>
import { useSupabaseClient } from "#imports";
import { useGlobalStore } from "../store/globalStore.js";

const supabaseClient = useSupabaseClient();
const store = useGlobalStore();

const form = ref({
  email: "",
  password: "",
});

const login = async () => {
  const data = await supabaseClient.auth.signInWithPassword({
    email: form.value.email,
    password: form.value.password,
  });

  store.setUser({
    id: data.data.user?.id,
    email: data.data.user?.email,
  });

  navigateTo("/");
};
</script>

<template>
  <div class="login">
    <input type="text" placeholder="Usuário" v-model="form.email" />
    <input type="password" placeholder="Senha" v-model="form.password" />
    <button @click="login">Entrar</button>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 10px;
  width: 300px;
  margin: 0 auto;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: pointer;
}
button:hover {
  background-color: #e0e0e0;
}
</style>
