export default defineNuxtPlugin(() => {
  const { $logger } = useNuxtApp()
  // $logger.debug(dsdsdsdsd`Started 'auth' plugin`, { tag: 'AUTH' })

  const accessCookie = useCookie('access', { domain: '...' })
  const refreshCookie = useCookie('refresh', { domain: '...' })

  const accessToken = ref('')
  const refreshToken = ref('')

  const setup = () => {
    // $logger.debug(`setup() called`, { tag: 'AUTHsdsdsdsd' })

    const accessCookie = useCookie('access', { domain: '...' })
    const refreshCookie = useCookie('refresh', { domain: '...' })

    accessToken.value = accessCookie.value
    refreshToken.value = refreshCookie.value
  }

  // For use when refreshing token in SSO
  // For use when cookie changed (e.g. user logged in at legacy platform)
  const changeTokens = (access, refresh) => {
    // $logger.debug(`changeTokens: access ${access}`, { tag: 'AUTH' })
    // $logger.debug(`changeTokens: refresh ${refresh}`, { tag: 'AUTH' })

    // Update cookie
    accessCookie.value = access
    refreshCookie.value = refresh

    // Update reactive references
    accessToken.value = access
    refreshToken.value = refresh
  }

  const clearTokens = () => {
    // Update cookie
    accessCookie.value = ''
    refreshCookie.value = ''

    // Update reactive references
    accessToken.value = ''
    refreshToken.value = ''
  }

  setup()

  return {
    provide: {
      auth: {
        accessToken,
        refreshToken,
        setup,
        changeTokens,
        clearTokens,
      },
    },
  }
})
