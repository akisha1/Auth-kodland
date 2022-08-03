
<template>
  <div class="auth">
    <div class="auth-info">
      <div class="auth-info-top">
        <img src="~/assets/svg/logo-auth.svg"/>
        <span class="auth-info-top__title">{{$t('auth.slogan') }}</span>
      </div>
      <div class="auth-info-slider">
        <swiper class="swiper swiper-container" navigation :pagination="{ clickable: true }">
          <swiper-slide>
            <div class="auth-info-slider-slide">
              <div class="auth-info-slider-slide__image">
                <img srcset="
                 ~/assets/images/auth-slider1x.png, 
                  ~/assets/images/auth-slider1.png 2x">
              </div>
              <div class="auth-info-slider-slide-bottom">
                <span class="auth-info-slider-slide__title">{{ $t('auth.slider.slide1.title') }}</span>
                <span class="auth-info-slider-slide__description" v-html="$t('auth.slider.slide1.description')"></span>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="auth-info-slider-slide">
              <div class="auth-info-slider-slide__image">
                <img srcset="
                  ~/assets/images/auth-slider2x.png, 
                  ~/assets/images/auth-slider2.png 2x">
              </div>
              <div class="auth-info-slider-slide-bottom">
                <span class="auth-info-slider-slide__title">{{ $t('auth.slider.slide2.title') }}</span>
                <span class="auth-info-slider-slide__description" v-html="$t('auth.slider.slide2.description')"></span>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="auth-info-slider-slide">
              <div class="auth-info-slider-slide__image">
                <img srcset="
                  ~/assets/images/auth-slider3x.png, 
                 ~/assets/images/auth-slider3.png 2x">
              </div>
              <div class="auth-info-slider-slide-bottom">
                <span class="auth-info-slider-slide__title">{{ $t('auth.slider.slide3.title') }}</span>
                <span class="auth-info-slider-slide__description" v-html="$t('auth.slider.slide3.description')"></span>
              </div>
            </div>
          </swiper-slide>
            <!-- <div class="auth-info-slide-navigation swiper-button-prev" >
              <img src="~/assets/svg/white-arrow-left.svg"/>
            </div>
            <div class="auth-info-slide-navigation swiper-button-next">
              <img src="~/assets/svg/white-arrow-right.svg"/>
            </div> -->
        </swiper>
      </div>
    </div>
    <div class="auth-login">
      <div class="auth-login-top">
        <div class="auth-login-logo">
          <img src="~/assets/svg/logo-auth-blue.svg"/>
        </div>
        <div class="auth-login-lang" v-if="isSwitcher"><HeaderLang/></div>
      </div>
      <div class="auth-login-form">
      <SignIn  v-if="type === 'signin'" @changeTypeAuth="changeAuthType"/>
      <SignUp v-if="type === 'signup'" @changeTypeAuth="changeAuthType"/>
      <RecoveryPassword v-if="type === 'recovery'" @changeTypeAuth="changeAuthType"/>
      <SignUpCompleted v-if="type === 'signup-completed'" @changeTypeAuth="changeAuthType"/>
      <RecoveryPasswordCompleted v-if="type === 'recovery-completed'" @changeTypeAuth="changeAuthType"/>
      </div> 
    </div>
  </div>
</template>

<script>
import HeaderLang from '@/components/shared/HeaderLang'
  import SignIn from '@/components/auth/SignIn.vue'
  import SignUp from '@/components/auth/SignUp.vue'
  import RecoveryPassword from '@/components/auth/RecoveryPassword.vue'
  import SignUpCompleted from '@/components/auth/SignUpCompleted.vue'
  import RecoveryPasswordCompleted from '@/components/auth/RecoveryPasswordCompleted.vue'
  import SwiperClass, {Pagination, Navigation} from "swiper"
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'
  export default defineComponent({
    components: {
      HeaderLang,
      SignIn,
      SignUp,
      RecoveryPassword,
      SignUpCompleted,
      Swiper,
      SwiperSlide,
      RecoveryPasswordCompleted
    },
    setup() {
      SwiperClass.use([Pagination, Navigation])
      let isSwitcher = ref(true)
      const swiperOptions = {
        loop: true,
        pagination: {
          el: '.auth-info-slider-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      }
      const type = ref('signin')
      const changeAuthType = (setType) => {
        type.value = setType;
      }
      const checkLang = () => {
        const lng = window.navigator.language || navigator.userLanguage;

        if (!lng.includes('ru')) isSwitcher.value = false
      }
      onMounted(() => {
        checkLang()
      })
      return {
        type,
        changeAuthType,
        swiperOptions,
        isSwitcher
      };
    }  

  })

</script>
<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
@import "@/assets/scss/ui.scss";
.auth {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 31%;
  &-info {
    padding: 20px 60px;
    background:
      url('~/assets/images/auth-bg.png') no-repeat left bottom,
      linear-gradient(115.11deg, #12329C -2.18%, #3860ED 82.62%, #3860ED 82.62%);
    overflow: hidden;
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 90px;
      &__title {
        font-size: 20px;
        color: #fff;
      }
    }
    & .swiper-container {
      max-width: 100%;
      margin: auto;
      overflow: hidden;
      position: relative;
      padding-bottom: 45px;
    }
    &-slider {
      &-slide {
        text-align: center;
        &__image {
          height: 400px;
          & img {
            margin: 0 auto;
            max-height: 100%;
          }
        }
        &-bottom {
          margin-top: 70px;
        }
        &__title {
          display: block;
          margin-bottom: 25px;
          color: #D0FA61;
          font-size: 44px;
          font-family: "JetBrainsMonoExtraBold";
        }
        &__description {
          color: #fff;
          font-size: 24px;
          line-height: 40px;
        }
      }
      &-navigation {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        width: 48px;
        height: 48px;
        z-index: 5;
        display: flex;
        align-items: center;
        justify-content: center;
        &:after {
          display: none;
        }
        // &.swiper-button-next {
        //   left: -50px;
        //   right: auto;
        // }
      }
      &-pagination {
        bottom: 0px;
        & .swiper-pagination-bullet {
          width: 16px;
          height: 16px;
          background: rgba(255, 255, 255, .5);
        }
      }
    }
  }
  &-login {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 100px;
    &-logo {
      display: none;
    }
    &-top {
      position: absolute;
      right: 20px;
      top: 20px;
      left: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}

@media screen and (max-height: 900px) {
  .auth {
    &-info {
      &-slider {
        &-slide {
          &__image {
            height: 200px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1366px) {
  .auth {
    grid-template-columns: 1fr;
    &-info {
      display: none;
    }
    &-login {
      &-logo {
        display: block;
      }
      &-top {
        justify-content: space-between;
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .auth {
    &-login {
      justify-content: flex-start;
      padding: 0;
      background: #f5f5f5;;
      &-top {
        top: 30px;
      }
      &-form {
        border-radius: 8px;
        // background: #fff;
        margin: 80px 20px 0 20px;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .auth {
    &-login {
      align-items: stretch;
    }
  }
}

@media screen and (max-width: 374px) {
  .auth {
    &-login {
      &-form {
        margin: 80px 10px 0 10px;
      }
    }
  }
}
</style>


