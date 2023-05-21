import { ofetch } from 'ofetch'
import { useStorage } from '@vueuse/core'

export function useBackend() {
  const cfg = useRuntimeConfig()
  return ofetch.create({
    baseURL: cfg.public.backendUrl,
    onRequest: async ({ options }) => {
      options.headers = options.headers || {}
      const token = useStorage('token', null).value
      if (token)
        options.headers = { ...options.headers, Authorization: token }
    },
  })
}
