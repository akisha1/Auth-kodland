<template>
  <div class="recovery-completed">
    <div class="recovery-completed-content">
      <span class="recovery-completed__title">{{$t('auth.recovery.completed.title')}}</span>
      <div class="recovery-completed__text">
        {{$t('auth.recovery.completed.spam')}}
      </div>
      <div class="recovery-completed__text">
        {{$t('auth.recovery.completed.serviceFirst')}} 
        <a href='mailto:mail@kodland...'>
          <span>
            {{$t('auth.recovery.completed.serviceSecond')}}
          </span>
        </a>
      </div>

    </div>
    <button
      class="kodland-btn kodland-btn--primary kodland-btn--fullwidth recovery-completed-button"
      @click="signin">{{$t('auth.signup.buttons.signin')}}</button>
  </div>
</template>

<script>
  export default defineComponent({
    emits: ['changeTypeAuth'],
    setup(_props, { emit }) {
      const signin = () => {
        emit('changeTypeAuth', 'signin')
      }
      return {
        signin
      }
    }
  })
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";

.recovery-completed {
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
  &__text {
    font-size: 14px;
    text-align: center;
    padding-bottom: 40px;
  }
}

@media screen and (max-width: 1023px) {
  .recovery-completed {
    &-content {
      background: #fff;
      padding: 20px 20px 0 20px;
      margin-bottom: 20px;
    }
    &__text {
      padding-bottom: 30px;
    }
  }
}

@media screen and (max-width: 767px) {
  .recovery-completed {
    width: 100%;
    max-width: 500px;
    &__title {
      font-size: 24px;
    }
    &-button {
      margin-bottom: 20px;
    }
  }
}
</style>