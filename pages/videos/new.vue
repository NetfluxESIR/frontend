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
  const { url: presignedUrl } = await backend(`/presignedurl/${files.value[0].name}`)
  await $fetch(presignedUrl, {
    method: 'PUT',
    body: fileContent.value,
  })
  const cfg = useRuntimeConfig()
  const { id } = await backend('/videos', {
    method: 'POST',
    body: {
      title: title.value,
      description: description.value,
      // labels: Object.fromEntries(Object.entries(labels).map(([id, value]) => [value.name, value.value])),
      videoUrl: `https://${cfg.public.bucketName}.s3.amazonaws.com/${files.value[0].name}`,
      captionUrl: `https://${cfg.public.bucketName}.s3.amazonaws.com/${files.value[0].name}.vtt`,
    },
  })
  await router.push(`/videos/${id}`)
}
</script>

<template>
  <div class="bg-gray-100 p-4 rounded-md shadow-md flex flex-col">
    <input v-model="title" type="text" placeholder="title" required="true">
    <textarea v-model="description" placeholder="description" />
    <button type="button" @click="open">Choose video</button>
    <!--
    <div v-for="(value, id) in labels" :key="id" class="bg-gray-100 p-4 rounded-md shadow-md">
      <input v-model="value.name" type="text">
      <input v-model="value.value" type="text">
    </div>
    -->
    <button @click="addLabel">Add label</button>
    <button @click="create">Create</button>
  </div>
</template>
