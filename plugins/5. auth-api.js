export default defineNuxtPlugin(() => {
  const { $logger, $auth, $sso } = useNuxtApp()
  const nuxtApp = useNuxtApp()
  const i18n = nuxtApp.vueApp.config.globalProperties.$i18n
  const config = useRuntimeConfig()
  const SSO_URL = config.public.SSO_URL
  const PLATFORM_API = config.public.PLATFORM_API
  // $logger.debug('Started "auth-api" plugin', { tag: 'AUTH-API' })
  
  const fetchSSO = $fetch.create({
    baseURL: SSO_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  
  const fetch = $fetch.create({
    baseURL: PLATFORM_API,
    headers: {},
    onRequest({ request, options }) {
      // $logger.debug(`onRequest: ${options.baseURL} ${request}`, {
      //   tag: 'AUTH-API',
      // })
      if ($auth.accessToken.value) {
        options.headers.Authorization = `Bearer ${$auth.accessToken.value}`
      }
    },
    onResponse(data) {
      const { status } = data.response
      // $logger.debug(`onResponse: ${data.request} ${status}`, {
      //   tag: 'AUTH-API',
      // })
    },
    onResponseError({ request, options }) {
      $logger.error(`onResponseError: ${options.baseURL} ${request}`, {
        tag: 'AUTH-API',
      })
    },
  })


  const userAuth = reactive({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  })
  

  async function signin() {
    try {
      let formData = new URLSearchParams()
      formData.append('username', userAuth.username)
      formData.append('password', userAuth.password)
      await fetchSSO('/login', { method: 'POST', body: formData })
      .then((tokensResponse) => {
        $auth.changeTokens(tokensResponse.access_token, tokensResponse.refresh_token)
      })
      return true
    } catch (error) {
      return false
    }
  }
  
  async function signup() {
    try {
      const response = await fetch('/users/register/', {
        method: "POST",
        body: {
          first_name: userAuth.firstName,
          last_name: userAuth.lastName,
          email: userAuth.email
        },    
        headers: {
            "Accept-Language": 'en'
          }
      })
      document.cookie = `access=${response.access_token}`;'Domain=.kodland...'
      document.cookie = `refresh=${response.refresh_token}`;'Domain=.kodland...'
      return 'ok';
    } catch (error) {
      console.log(error.response);
      if (error.response.status >= 500) {
        // return i18n.t('apiError.serverError')
        return 'server error'
      } else {
        return error.response._data.user_msg
      }
    }
  }

  async function recoveryPassword() {
    try {
      await fetch('/users/reset_password/', {
        method: "POST",
        body: {
          email: userAuth.email
        },    
        headers: {
            "Accept-Language": 'en'
          }
      })
      return true;
    } catch (error) {
      console.log(error.response);
      return 'error'
    }
  }
  
return {
  provide: {
    userAuth,
    authApi: {
      signin,
      signup,
      recoveryPassword
    }
  },
}
})