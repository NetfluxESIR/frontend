// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  runtimeConfig: {
    public: {
      backendUrl: process.env.BACKEND_URL || 'http://localhost:3000/api/v1',
      bucketRegion: process.env.BUCKET_REGION || 'eu-west-3',
      bucketName: process.env.BUCKET_NAME || 'mon-superbucket',
    },
  },
  ssr: false,
})
