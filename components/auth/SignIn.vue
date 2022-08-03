<template>
  <div class="login">
    <div class="login-content">
        <span class="login__title">{{$t('auth.login.title')}}</span>
        <div class="login-socials">
          <template v-if="slug === 'ru'">
            <a
              href="https://..."
              class="login-socials__element"
              @click="ymGoal('LoginVK')">
              <img src="~/assets/svg/white-vk.svg"/>
            </a>
            <a
              href="https://..."
              class="login-socials__element"
              @click="ymGoal('LoginYandex')">
              <img src="~/assets/svg/white-yandex.svg"/>
            </a>
          </template>
            <a
              href="https://..."
              class="login-socials__element"
              @click="ymGoal('loginGoogle')">
              <img src="~/assets/svg/white-google.svg"/>
            </a>
        </div>
        <span class="login-or">{{ $t('auth.login.or') }}</span>
        <form @submit.prevent="signin">
          <div class="login-input-container">
            <input
              id="login"
              v-model.trim="userAuth.username"
              :class="['input-text', 'login-input', {'input-text--error': errorLogin}]"
              type="text"
              name="login"
              :placeholder="$t('auth.login.inputs.placeholderLogin')">
          </div>
          <div class="login-input-container">
          <span v-if="errorLogin" class="input-error-text">{{$t('auth.errors.validateLogin')}}</span>
            <input
              id="password"
              v-model.trim="userAuth.password"
              class="input-text login-input"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              :placeholder="$t('auth.login.inputs.placeholderPassword')">
              <img
                v-if="showPassword"
                class="login-input__toggle-password"
                src="~/assets/svg/visibility-password.svg"
                @click="toggleShowPassword"
              />
              <!-- v-tooltip="$t('auth.login.inputs.showPassword')" -->
                <img
                  v-else
                  class="login-input__toggle-password"
                  src="~/assets/svg/hidden-password.svg"
                  @click="toggleShowPassword"
                />
          </div>
            <button
            :disabled="!userAuth.username || !userAuth.password || sendRequestSignin"
            class="kodland-btn kodland-btn--primary kodland-btn--fullwidth login-button-login"
            >
              <span v-if="!sendRequestSignin">{{$t('auth.login.buttons.signin')}}</span>
              <Loader v-else/>
          </button>
        </form>
        <div v-if="responseError" class="message message--error">
          {{$t('auth.errors.wrongLoginOrPassword')}}
        </div>
        <div v-if="socialLoginError" class="message message--error">
          {{$t('auth.errors.socialLoginError')}}
        </div>
        <span class="link login-recovery-password" @click="recoveryPasswordLink">{{$t('auth.login.links.forgotLoginOrPassword')}}</span>
    </div>
    <button
      class="kodland-btn kodland-btn--secondary kodland-btn--fullwidth login-button-login"
      @click="signup">{{$t('auth.login.buttons.signup')}}
    </button>
  </div>
</template>

<script>
    
import validations from '@/helpers/validations'
import Loader from '@/components/shared/GlobalLoader.vue'
import { useUserLanguage } from '@/components/common/composables/useUserLanguage'
export default defineComponent({
  components: {
    Loader
  },
  emits: ['changeTypeAuth'],
  setup(_props, { emit }) {
    
    const {$router, $userAuth} = useNuxtApp()
    const {slug} = useUserLanguage();
    const route = useRoute()
    const loginAttempt = ref(false)
    const showPassword = ref(false)
    const sendRequestSignin = ref(false)
    const errorLogin = ref(false)
    const responseError = ref(false)
    const socialLoginError = computed(() =>{
      if (route.query.socialLoginError) {
        return true
      } else {
        return false
      }
    })

    const ymGoal = (social) => {
      window.ym(3, 'reachGoal', social)
    }
    const toggleShowPassword = () =>{
      showPassword.value = !showPassword.value
    }
     const signin = async() => {
      loginAttempt.value = true;
      responseError.value = false;
      const valid = checkValid();
      if (valid) {
        sendRequestSignin.value = true;
        const response = await $userAuth.signin();
        if (!response) {
          responseError.value = true
        } else {
          if (window.ym) {
            window.ym(2,'reachGoal', 'login')
          }
          const next = route.query.next
          if (next) {
            window.location.replace(next)
          } else {
            $router.push(`courses/`)
          }
        }
        sendRequestSignin.value = false;
      }      
    }
    const signinSocial = (social) =>{
      switch (social) {
        case 'vk':
          if (window.ym) {
            window.ym.ymGoal('LoginVK')
          }
          break
        case 'google':
          if (window.ym) {
            window.ym.ymGoal('loginGoogle')
          }
          break
        case 'yandex':
          if (window.ym) {
            window.ym.ymGoal('LoginYandex')
          }
          break
      }
    }
    const checkValid = () =>{
      if (loginAttempt.value) { // check validation only if were login attempt
        const validationLogin = validations.countSymbols(login, 2, 32);
        if (!validationLogin) {
          errorLogin.value = true;
          return false;
        } else {
          errorLogin.value = false;
          return true;
        }
      }
    }
    const signup = () => {
      emit('changeTypeAuth', 'signup')
    }
    const recoveryPasswordLink = () => {
      emit('changeTypeAuth', 'recovery')
    }
    return {
      slug,
      userAuth: $userAuth,
      loginAttempt,
      showPassword,
      sendRequestSignin,
      errorLogin,
      responseError,
      socialLoginError,
      toggleShowPassword,
      signin,
      signup,
      recoveryPasswordLink,
      ymGoal,
      signinSocial
    }
  }
})
</script>

<style lang="scss" scoped>


.login {
  width: 400px;
  margin: auto;
  &__title {
    font-family: "JetBrainsMonoExtraBold";
    font-size: 32px;
    color: #3860ED;
    display: block;
    text-align: center;
    margin-bottom: 40px;
  }
  &-socials {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    &__element {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      background: #3860ED;
      margin: 0 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
      position: relative;
      &:hover {
        background: #12329C;
      }
    }
  }
  &-or {
    display: block;
    text-align: center;
    margin-bottom: 16px;
    color: #ACB2BE;
  }
  &-input {
    &-container {
      position: relative;
      margin-bottom: 16px;
    }
    &__toggle-password {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  &-button {
    &-login {
      margin-bottom: 16px;
    }
  }
  &-recovery-password {
    padding-bottom: 40px;
    text-align: center;
  }
}

@media screen and (max-width: 1023px) {
  .login {
    &-socials {
      &__element {
        width: 40px;
        height: 40px;
      }
    }
    &-recovery-password {
      padding-bottom: 20px;
    }
    &-content {
      background: #fff;
      padding: 20px 20px 0 20px;
      margin-bottom: 20px;
    }
  }
}

@media screen and (max-width: 767px) {
  .login {
    width: 100%;
    max-width: 500px;
    &__title {
      font-size: 24px;
    }
    &-socials {
      &__element {
        margin: 0 5px;
      }
    }
  }
}

@media screen and (max-width: 374px) {
  .login {
    &-socials {
      &__element {
        margin: 0 5px;
      }
    }
  }
}
</style>