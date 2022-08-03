import { navigateLangSwitch } from '@/services/RouterService'

export const languages: { slug: string; title: string }[] = [
  {
    slug: 'ru',
    title: 'Русский',
  },
  {
    slug: 'en',
    title: 'English',
  },
]

export const availableLocales: string[] = []
languages.forEach((lang) => {
  availableLocales.push(lang.slug)
})

export function useUserLanguage() {
  // Get from i18n
  const nuxtApp = useNuxtApp()
  const i18n = nuxtApp.vueApp.config.globalProperties.$i18n

  const title = languages.find((lang) => lang.slug === i18n.locale).slug
  const slug = i18n.locale

  //
  const switchLanguage = (lang: string) => {
    navigateLangSwitch(lang)
  }

  return { languages, title, slug, switchLanguage, availableLocales }
}
