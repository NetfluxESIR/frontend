import { useStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path === '/login')
    return

  if (to.path === '/register')
    return

  if (to.path === '/forgot-password')
    return

  if (to.path === '/reset-password')
    return

  if (useStorage('token', null).value !== null)
    return

  return navigateTo('/login')
})
