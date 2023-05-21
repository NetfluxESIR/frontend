<script setup>
import { useStorage } from '@vueuse/core'

definePageMeta({
  middleware: 'auth',
})
const backend = useBackend()
const router = useRouter()
const { data, error, pending } = await useAsyncData(async () => await backend('/videos'))
async function logout() {
  useStorage('token', null)
  useStorage('role', null)
  await router.push('/login')
}
</script>

<template>
  <div>
    <div class="flex justify-around">
      <NuxtLink class="rounded-full bg-sky-500 hover:bg-sky-700" to="/videos/new/">New video</NuxtLink>
      <NuxtLink class="rounded-full bg-sky-500 hover:bg-sky-700" to="/register">Register a new user</NuxtLink>
      <button class="rounded-full bg-sky-500 hover:bg-sky-700" @click="logout">logout</button>
    </div>
    <div v-if="pending">
      <NuxtLoadingIndicator />
    </div>
    <div v-if="error">
      Error: {{ error }}
    </div>
    <div v-if="data" class="columns-2 flex justify-center">
      <div v-for="video in data" :key="video.id" class="bg-grey rounded-lg shadow-lg flex-auto break-after-auto">
        <div v-if="video.title">
          <NuxtLink :to="`/videos/${video.id}/`">
            {{ video.title }}
          </NuxtLink>
        </div>
        <div>{{ video.description }}</div>
      </div>
    </div>
  </div>
</template>
