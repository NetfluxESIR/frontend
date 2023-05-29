<script setup>
import { useStorage } from '@vueuse/core'

definePageMeta({
  middleware: 'auth',
})
const backend = useBackend()
const router = useRouter()
const { data, error, pending } = await useAsyncData(async () => await backend('/videos'))
async function retrieveStatus() {
  for (const video of data.value) {
    const { status, currentStep } = await backend(`/processing/${video.id}`)
    video.status = status
    video.currentStep = currentStep
  }
  return data
}
const { data: data2 } = await useAsyncData(retrieveStatus)
async function logout() {
  useStorage('token', null)
  useStorage('role', null)
  await router.push('/login')
}
</script>

<template>
  <div class="netflix-page flex flex-col min-h-screen">
    <div class="netflix-header">
      <div class="netflix-logo">
        <img src="https://loodibee.com/wp-content/uploads/Netflix-N-Symbol-logo.png" alt="Netflux logo" style="width: 100px; height: 100px;">
      </div>
      <div class="netflix-navigation">
        <NuxtLink class="netflix-nav-link" to="/videos/new/">
          New video
        </NuxtLink>
        <button class="netflix-nav-link" @click="logout">
          Logout
        </button>
      </div>
    </div>
    <div class="netflix-content">
      <div v-if="pending" class="netflix-loading">
        <NuxtLoadingIndicator />
      </div>
      <div v-if="error" class="netflix-error">
        Error: {{ error }}
      </div>
      <div v-if="data2" class="netflix-video-list">
        <div v-for="video in data2.value" :key="video.id" class="netflix-video-item">
          <div v-if="video.status === 'PROCESSED'" class="netflix-video-details">
            <NuxtLink :to="`/videos/${video.id}/`" class="netflix-video-title">
              {{ video.title }}
            </NuxtLink>
            <div class="netflix-video-description">
              {{ video.description }}
            </div>
          </div>
          <div v-else class="netflix-video-details">
            <div class="netflix-video-title">
              {{ video.title }}
            </div>
            <div class="netflix-video-description">
              {{ video.description }}
            </div>
            <div class="netflix-video-current-step">
              Current Step: {{ video.currentStep }}
            </div>
            <div class="netflix-video-status">
              Status: {{ video.status }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.netflix-page {
  background-color: #141414;
  color: #fff;
  font-family: Arial, sans-serif;
  padding: 20px;
}

.netflix-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.netflix-logo {
  width: 100px;
  height: 100px;
}

.netflix-navigation {
  display: flex;
  gap: 10px;
}

.netflix-nav-link {
  padding: 10px 20px;
  background-color: #e50914;
  border: none;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.netflix-nav-link:hover {
  background-color: #b20710;
}

.netflix-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.netflix-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.netflix-error {
  background-color: #b20710;
  padding: 20px;
  border-radius: 4px;
}

.netflix-video-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.netflix-video-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #333;
  padding: 20px;
  border-radius: 4px;
}

.netflix-video-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.netflix-video-title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.netflix-video-description {
  font-size: 16px;
  color: #fff;
}

.netflix-video-current-step {
  font-size: 16px;
  color: #fff;
}

.netflix-video-status {
  font-size: 16px;
  color: #fff;
}

@media (max-width: 768px) {
  .netflix-video-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .netflix-video-list {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>
