<template>
  <div class="recovery">
    <div class="recovery-content">
      <span class="recovery__title">{{$t('auth.recovery.title')}}</span>
      <form @submit.prevent="recovery">
        <div class="recovery-input-container">
          <div class="registration-input-container">
            <input
              id="email"
              v-model.trim="userAuth.email"
              :class="['input-text', 'registration-input']"
              type="text"
              name="email"
              :placeholder="$t('auth.signup.inputs.email')">
          </div>
        </div>
        <div v-if="errorRecoveryPassword" class="message message--error">
          {{$t('auth.errors.accountNotFound')}}
        </div>
        <button
          class="kodland-btn kodland-btn--primary kodland-btn--fullwidth recovery-button"
          :disabled="!validEmail || sendRequestRecovery">
            <span v-if="!sendRequestRecovery">{{$t('auth.recovery.buttons.recovery')}}</span>
            <Loader v-else/>
        </button>
      </form>
      <div class="recovery-description">
        {{$t('auth.recovery.descriptionFirstPart')}}
        <br />
        {{$t('auth.recovery.descriptionSecondPart')}}
      </div>
      <span class="link recovery-back" @click="backInSignIn">{{$t('auth.recovery.linkBack')}}</span>
    </div>
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
    const { $userAuth, $authApi } = useNuxtApp()
    const sendRequestRecovery = ref(false)
    const errorRecoveryPassword = ref(false)
    const validEmail = computed(() => !!validations.email($userAuth.email))
    const recovery = async() => {
      if (validEmail && !sendRequestRecovery.value) {
        errorRecoveryPassword.value = false;
        sendRequestRecovery.value = true;
        const response = await $authApi.recoveryPassword();
        sendRequestRecovery.value = false;
        if (response === 'error') {
          errorRecoveryPassword.value = true;
        } else {
          emit('changeTypeAuth', 'recovery-completed')
        }
      }
    }
    const backInSignIn = () => {
      emit('changeTypeAuth', 'signin')
    }

    return {
      userAuth: $userAuth,
      sendRequestRecovery,
      errorRecoveryPassword,
      validEmail,
      backInSignIn,
      recovery
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";

.recovery {
  width: 400px;
  margin: auto;
  &__title {
    font-family: "JetBrainsMonoExtraBold";
    font-size: 32px;
    color: $primary;
    display: block;
    text-align: center;
    margin-bottom: 40px;
  }
  &-input {
    &-container {
      position: relative;
      margin-bottom: 16px;
    }
  }
  &-button {
    margin-top: 24px;
    margin-bottom: 16px;
  }
  &-description {
    text-align: center;
    font-size: 14px;
    margin-bottom: 40px;
  }
  &-back {
    font-family: "InterSemiBold";
    text-align: center;
  }
}

@media screen and (max-width: 1023px) {
  .recovery {
    &-content {
      background: #fff;
      padding: 20px;
      margin-bottom: 20px;
    }
    &-text {
      padding-bottom: 20px;
    }
  }
}

@media screen and (max-width: 767px) {
  .recovery {
    width: 100%;
    max-width: 500px;
    &__title {
      font-size: 24px;
    }
    &-button {
      &-login {
        margin-bottom: 20px;
      }
    }
  }
}
</style>