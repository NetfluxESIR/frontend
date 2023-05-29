<script setup>
import { useStorage } from '@vueuse/core'

const backend = useBackend()
const router = useRouter()

const email = ref('')
const password = ref('')
const role = ref('')
async function login() {
  const { token } = await backend('/users/login', {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value,
      role: role.value,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
  useStorage('token', token)
  useStorage('role', role.value)
  router.push('/')
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8 bg-black min-h-screen">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto mb-6 w-48" src="https://loodibee.com/wp-content/uploads/Netflix-N-Symbol-logo.png" style="width: 100px; height: 100px;" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Sign in to your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label for="role" class="block text-sm font-medium leading-6 text-gray-200">Role</label>
          <div class="mt-2">
            <select v-model="role" class="block w-full rounded-md border-0 py-2 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="ADMIN" selected="selected">
                Admin
              </option>
              <option value="USER">
                User
              </option>
            </select>
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-200">Email address</label>
          <div class="mt-2">
            <input id="email" v-model="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-2 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-200">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" v-model="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-2 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          </div>
        </div>
        <div>
          <button
            class="flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" @click="login"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:focus,
select:focus {
  outline: none;
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.5);
}
</style>
