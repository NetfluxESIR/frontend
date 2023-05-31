<script setup>
// import { v4 as uuidv4 } from 'uuid'

definePageMeta({
  middleware: 'auth',
})

const router = useRouter()
const backend = useBackend()
const { files, open, onChange } = useFileDialog()
const fileContent = ref(null)
const title = ref('')
const description = ref('')

onChange((file) => {
  const reader = new FileReader()
  reader.onload = (evt) => {
    fileContent.value = evt.target.result
  }
  reader.readAsArrayBuffer(file[0])
})

/*
function addLabel() {
  labels[uuidv4()] = {
    name: '',
    value: '',
  }
}
*/

async function create() {
  if (!fileContent.value)
    return
  const cfg = useRuntimeConfig()
  const { id } = await backend('/videos', {
    method: 'POST',
    body: {
      title: title.value,
      description: description.value,
      // labels: Object.fromEntries(Object.entries(labels).map(([id, value]) => [value.name, value.value])),
    },
  })
  await backend(`/videos/${id}`, {
    method: 'PUT',
    body: {
      title: title.value,
      description: description.value,
      videoUrl: `https://${cfg.public.bucketName}.s3.${cfg.public.bucketRegion}.eu-west-3.amazonaws.com/${id}.mp4`,
      captionUrl: `https://${cfg.public.bucketName}.s3.${cfg.public.bucketRegion}.amazonaws.com/${id}.vtt`,
    },
  })
  const { url: presignedUrl } = await backend(`/presignedurl/${id}.mp4`)
  await $fetch(presignedUrl, {
    method: 'PUT',
    body: fileContent.value,
  })
  await router.push(`/videos/${id}`)
}
</script>

<template>
  <div class="bg-black p-6 rounded-md shadow-md flex flex-col min-h-screen">
    <div class="justify-left">
      <button class="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-500 transition duration-300 focus:outline-none" @click="router.push('/')">
        Back</button>
    </div>
    <div class="mb-4 min-w-screen flex justify-center">
      <input v-model="title" type="text" placeholder="Title" required="true" class="bg-transparent border-b border-white text-white mb-4 placeholder-gray-400 focus:outline-none text-2xl">
    </div>
    <div class="mb-4 min-w-screen flex justify-center">
      <textarea v-model="description" placeholder="Description" class="bg-transparent border-b border-white text-white h-20 mb-4 placeholder-gray-400 resize-none focus:outline-none"/>
    </div>
    <div class="flex justify-center">
      <button type="button" class="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-500 transition duration-300 focus:outline-none" @click="open">Choose video</button>
      <button class="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-500 transition duration-300 focus:outline-none" @click="create">Create</button>
    </div>
    <!--
    <div v-for="(value, id) in labels" :key="id" class="bg-gray-100 p-4 rounded-md shadow-md">
      <input v-model="value.name" type="text">
      <input v-model="value.value" type="text">
    </div>
    <button @click="addLabel" class="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-500 transition duration-300 focus:outline-none">Add label</button>
    -->
  </div>
</template>
