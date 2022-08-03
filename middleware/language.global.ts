import { hasLanguage, navigateLangSwitch } from '@/services/RouterService'

export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp()
  
  const i18n = nuxtApp.vueApp.config.globalProperties.$i18n
  
  const langParam = to.params.lang as string
  if (langParam) {
    if (hasLanguage(langParam)) {
      i18n.locale = langParam
    } else {
      await navigateLangSwitch('en')
    }
  }
})
