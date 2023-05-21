<script setup>
definePageMeta({
  middleware: 'auth',
})
const backend = useBackend()
const email = ref('')
const password = ref('')
const role = ref('')
async function register() {
  const { token } = await backend('/users/register', {
    method: 'POST',
    body: { email: email.value, password: password.value, role: role.value },
    headers: {
      'Content-Type': 'application/json',
    },
  })
  alert(`Token: ${token}`)
}
</script>

<template>
  <div class="bg-gray-100 p-4 rounded-md shadow-md">
    <input v-model="email" type="text" placeholder="email">
    <input v-model="password" type="password" placeholder="password">
    <select v-model="role">
      <option value="ADMIN" selected>
        admin
      </option>
      <option value="USER">
        user
      </option>
    </select>
    <button @click="register">Register</button>
    <div v-if="token">
      Token: {{ token }}
    </div>
  </div>
</template>
