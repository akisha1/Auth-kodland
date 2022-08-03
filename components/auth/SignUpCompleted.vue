<template>
  <div class="completed">
    <div class="completed-content">
      <span class="completed__title">{{$t('auth.signup.completed.title')}}</span>
      <div class="completed__text">
        {{$t('auth.signup.completed.spam')}}
      </div>
      <div class="completed__text">
        {{$t('auth.signup.completed.serviceFirst')}} 
        <a href='mailto:mail@kodland...'>
          <span>
            {{$t('auth.signup.completed.serviceSecond')}}
          </span>
        </a>
      </div>
    </div> 
    <button
      class="kodland-btn kodland-btn--primary kodland-btn--fullwidth completed-button"
      @click="signin">{{$t('auth.signup.buttons.signin')}}</button>
  </div>
</template>

<script>

export default defineComponent({
  setup() {
    const {$router } = useNuxtApp()
    const signin = () => {
      $router.push(`${slug}/courses/`)
    }
    return {
      signin
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";

.completed {
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
  .completed {
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
  .completed {
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