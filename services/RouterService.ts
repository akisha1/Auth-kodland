import { availableLocales } from '@/components/common/composables/useUserLanguage'

export function hasLanguage(lang: string) {
  const has = availableLocales.includes(lang)
  return has
}

export async function navigateLangSwitch(newLang: string) {
  const route = useRoute()
  const name = route.name
  const params = route.params

  // Just change lang param and redirect
  const newParams = { ...params, lang: newLang }
  const newRoute = { name, params: newParams }

  await navigateTo(newRoute)
}
