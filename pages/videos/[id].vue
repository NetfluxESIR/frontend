<script setup>
definePageMeta({
  middleware: 'auth',
})
const backend = useBackend()
const route = useRoute()
const router = useRouter()
const videoId = route.params.id
const { data, error, pending } = await useAsyncData(async () => {
  const [video, processing] = await Promise.all([
    backend(`/videos/${videoId}`),
    backend(`/processing/${videoId}`),
  ])
  return { video, processing }
})
</script>

<template>
  <div class="bg-black p-6 rounded-md shadow-md flex flex-col min-h-screen">
    <div class="justify-left">
      <button
        class="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-500 transition duration-300 focus:outline-none"
        @click="router.push('/')">
        Back</button>
    </div>
    <div v-if="pending" class="text-white">
      Loading...
    </div>
    <div v-if="error" class="text-white">
      Error: {{ error }}
    </div>
    <div v-if="data.video">
      <div class="mb-4 min-w-screen flex justify-center">
        <video id="my-video" class="video-js text-white" controls preload="auto" width="896" height="auto" data-setup="{}"
          crossorigin="anonymous">
          <source :src="data.video.videoUrl" type="video/mp4">
          <track :src="data.video.captionUrl" kind="captions" srclang="fr" label="Subtitles">
          <p class="vjs-no-js text-white">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank" class="text-blue-500 underline">supports
              HTML5 video</a>
          </p>
        </video>
      </div>
      <div class="bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
        <div class="text-white font-bold text-xl mb-2">
          Title:
        </div>
        <div class="text-white">
          {{ data.video.title }}
        </div>
        <div class="text-white font-bold text-xl mb-2">
          Description:
        </div>
        <div class="text-white">
          {{ data.video.description }}
        </div>
        <div class="text-white font-bold text-xl mb-2">
          <div v-for="step in data.processing.steps" :key="step.name">
            <p v-if="step.status === 'FINISHED'" class="text-green-500">
              {{ step.step }}: {{ step.log }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
