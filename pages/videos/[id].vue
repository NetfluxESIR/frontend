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
  <div>
    <div v-if="pending">
      Loading...
    </div>
    <div v-if="error">
      Error: {{ error }}
    </div>
    <div v-if="data">
      <div class="bg-grey rounded-lg shadow-lg p-4 b-4">
        <div>
          <label>Title:</label>
          {{ data.title }}
        </div>
        <div>
          <label>Description:</label>
          {{ data.description }}
        </div>
      </div>
      <video id="my-video" class="video-js" controls preload="auto" width="640" height="264" data-setup="{}">
        <source :src="data.videoUrl" type="video/mp4">
        <track :src="data.captionUrl" kind="captions" srclang="fr" label="French">
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
        </p>
      </video>
    </div>
  </div>
</template>
