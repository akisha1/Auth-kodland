<template>
  <div class="registration">
    <div class="registration-content">
      <span class="registration__title">{{$t('auth.signup.title')}}</span>
      <div class="registration-socials">
      <!-- v-tooltip="$t('auth.login.socials.vk')" -->
        <a  href="https://..."  class="registration-socials__element">
          <img src="~/assets/svg/white-vk.svg"/>
        </a>
        <a href="https://...."  class="registration-socials__element">
          <img src="~/assets/svg/white-yandex.svg"/>
        </a>
        <!-- v-tooltip="'Google'" -->
        <a href="https://..."  class="registration-socials__element">
          <img src="~/assets/svg/white-google.svg"/>
        </a>
      </div>
      <span class="registration-or">{{ $t('auth.login.or') }}</span>
      <form @submit.prevent="signup">
        <div class="registration-input-container">
          <input
            id="firstName"
            v-model.trim="userAuth.firstName"
            :class="['input-text', 'login-input', {'input-text--error': errors.errorFirstName}]"
            type="text"
            name="firstName"
            :placeholder="$t('auth.signup.inputs.placeholderFirstName')">
          <span v-if="errors.errorFirstName" class="input-error-text">{{$t('auth.errors.validateName')}}</span>
        </div>
        <div class="registration-input-container">
          <input
            id="lastName"
            v-model.trim="userAuth.lastName"
            :class="['input-text', 'login-input', {'input-text--error': errors.errorLastName}]"
            type="text"
            name="lastName"
            :placeholder="$t('auth.signup.inputs.placeholderLastName')">
          <span v-if="errors.errorLastName" class="input-error-text">{{$t('auth.errors.validateLastName')}}</span>
        </div>
        <div class="registration-input-container">
          <input
            id="email"
            v-model.trim="userAuth.email"
            :class="['input-text', 'login-input', {'input-text--error': errors.errorEmail}]"
            type="text"
            name="email"
            :placeholder="$t('auth.signup.inputs.email')">
          <span v-if="errors.errorEmail" class="input-error-text">{{$t('auth.errors.validateEmail')}}</span>
        </div>
        <div v-if="responseError" class="message message--error">
          {{responseErrorText}}
        </div>
        <div v-if="socialLoginError" class="message message--error">
          {{$t('auth.errors.socialLoginError')}}
        </div>
        <button
          class="kodland-btn kodland-btn--secondary kodland-btn--fullwidth registration-button-registration"
          :disabled="!userAuth.firstName || !userAuth.lastName || !userAuth.email || sendRequestSignup">
          <span v-if="!sendRequestSignup">{{$t('auth.signup.buttons.signup')}}</span>
          <Loader v-else/>
        </button>
        <div class="registration-text block-vhtml">
          {{$t('auth.signup.confidentialityFirstPart')}}
          <br>
          {{$t('auth.signup.confidentialitySecondPart')}} 
          <a href='https://....' target='_blank'>
            {{$t('auth.signup.confidentialityLink')}}
          </a>."
        </div>
      </form>
    </div>
    <button
      class="kodland-btn kodland-btn--primary kodland-btn--fullwidth registration-button-login"
      @click="signin">{{$t('auth.signup.buttons.signin')}}</button>
  </div>
</template>

<script>
import validations from '@/helpers/validations'
import Loader from '@/components/shared/GlobalLoader.vue'
export default defineComponent({
  components: {
    Loader
  },
  emits: ['changeTypeAuth'],
  setup(_props, { emit }) {
    const route = useRoute()
    const {$router, $userAuth } = useNuxtApp()
    const signupAttempt = ref('')
    const sendRequestSignup = ref(false)
    const responseError = ref(false)
    const responseErrorText = ref('')
    let errors = reactive({
      errorFirstName: false,
      errorLastName: false,
      errorEmail: false
    })
    const socialLoginError = computed(() =>{
      if (route.query.socialLoginError) {
        return true
      } else {
        return false
      }
    })
    const checkValid = () =>{
      if (signupAttempt.value) { // check validation only if were signup attempt
        const validationFirstName = validations.countSymbols($userAuth.firstName, 2, 32)
        const validationLastName = validations.withoutNumbers($userAuth.lastName)
        const validationEmail = validations.email($userAuth.email)
        !validationFirstName ? errors.errorFirstName = true : errors.errorFirstName = false
        !validationLastName ? errors.errorLastName = true : errors.errorLastName = false
        !validationEmail ? errors.errorEmail = true : errors.errorEmail = false
        if (!validationFirstName || !validationLastName || !validationEmail) {
          return false
        } else {
          return true
        }
      }
    }
    const signin = () => {
      emit('changeTypeAuth', 'signin')
    }
    const signup = async () =>{
      signupAttempt.value = true;
      errors = {
        errorFirstName: false,
        errorLastName: false,
        errorEmail: false
      }
      const valid = checkValid();
      if (valid) {
        responseError.value = false;
        sendRequestSignup.value = true;
        const signup = await $userAuth.signup();
        sendRequestSignup.value = false;
        if (signup === 'ok') {
          emit('changeTypeAuth', 'signup-completed')
          if (window.ym) {
            window.ym(1, 'reachGoal', 'register')
          }
          if (route.query.next) {
            window.location.replace(route.query.next)
          } else {
            $router.push(`courses/`)
          }
        } else {
          responseError.value = true;
          responseErrorText.value = signup;
        }
      }
    }

    return {
      userAuth: $userAuth,
      checkValid,
      signin,
      signup,
      socialLoginError,
      signupAttempt,
      sendRequestSignup,
      responseError,
      responseErrorText,
      errors
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";

.registration {
  width: 400px;
  margin: auto;
  &__title {
    font-family: 'JetBrainsMonoExtraBold';
    font-size: 32px;
    color: $primary;
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
      background: $primary;
      margin: 0 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
      position: relative;
      &:hover {
        background: $primaryHover;
      }
    }
  }
  &-or {
    display: block;
    text-align: center;
    margin-bottom: 16px;
    color: $grey;
  }
  &-input {
    &-container {
      position: relative;
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 24px;
      }
    }
  }
  &-button {
    &-registration {
      margin-top: 24px;
      margin-bottom: 16px;
    }
  }
  &-text {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    padding-bottom: 40px;
  }
}

@media screen and (max-width: 1023px) {
  .registration {
    &-socials {
      &__element {
        width: 40px;
        height: 40px;
      }
    }
    &-content {
      background: #fff;
      padding: 20px 20px 0 20px;
      margin-bottom: 20px;
    }
    &-text {
      padding-bottom: 20px;
    }
  }
}

@media screen and (max-width: 767px) {
  .registration {
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
    &-button {
      &-login {
        margin-bottom: 20px;
      }
    }
  }
}

@media screen and (max-width: 374px) {
  .registration {
    &-socials {
      &__element {
        margin: 0 5px;
      }
    }
  }
}

</style>