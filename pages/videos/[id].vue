<script setup>
definePageMeta({
  middleware: 'auth',
})
const backend = useBackend()
const route = useRoute()
const videoId = route.params.id
const { data, error, pending } = await useAsyncData(async () => await backend(`/videos/${videoId}`))
</script>

<template>
  <div class="bg-black p-6 rounded-md shadow-md flex flex-col min-h-screen">
    <div v-if="pending" class="text-white">
      Loading...
    </div>
    <div v-if="error" class="text-white">
      Error: {{ error }}
    </div>
    <div v-if="data">
      <div class="bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
        <div class="text-white font-bold text-xl mb-2">
          Title:
        </div>
        <div class="text-white mb-4">
          {{ data.title }}
        </div>
        <div class="text-white font-bold text-xl mb-2">
          Description:
        </div>
        <div class="text-white">
          {{ data.description }}
        </div>
        <video id="my-video" class="video-js text-white" controls preload="auto" height="auto" data-setup="{}" crossorigin="anonymous">
          <source :src="data.videoUrl" type="video/mp4">
          <track :src="data.captionUrl" kind="captions" srclang="fr" label="Subtitles">
          <p class="vjs-no-js text-white">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank" class="text-blue-500 underline">supports
              HTML5 video</a>
          </p>
        </video>
      </div>
    </div>
  </div>
</template>
