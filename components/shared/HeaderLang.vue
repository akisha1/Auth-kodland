<template>
  <div v-on-click-outside="hide" class="lang">
    <div class="lang-selected" @click="toggle">
      <span class="lang-selected__name">
        {{ slug }}
        <img
          class="lang-selected__icon"
          src="~/assets/svg/blue-arrow-bottom.svg"
        />
      </span>
      <div v-if="opened" class="lang-list">
        <span
          v-for="lang in languages"
          :key="lang.slug"
          :class="[
            'lang-list-element',
            { 'lang-list-element--active': lang.slug === slug },
          ]"
          @click="changeLang(lang.slug)"
        >
          <span class="lang-list-element__value">{{ lang.slug }}</span>
          <span class="lang-list-element__name">{{ lang.title }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import { useUserLanguage } from '@/components/common/composables/useUserLanguage'

// State
const opened = ref(false)
const { languages, slug, switchLanguage } = useUserLanguage()

const toggle = () => {
  opened.value = !opened.value
}

const hide = () => {
  opened.value = false
}

const changeLang = (language: string) => {
  switchLanguage(language)
  // hide()
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/var.scss';

.lang {
  position: relative;
  z-index: 1;
  margin-right: 16px;
  &-selected {
    width: 53px;
    height: 32px;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    justify-content: center;
    cursor: pointer;
    font-family: 'InterMedium';
    text-transform: uppercase;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 7px;
    font-size: 14px;
    &__icon {
      display: block;
      margin-left: 5px;
    }
    &__name {
      color: #000;
      display: flex;
      align-items: center;
    }
  }
  &-list {
    position: absolute;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 150px;
    padding: 8px 0;
    right: 0;
    top: 46px;
    &-element {
      display: flex;
      height: 40px;
      padding: 0 16px;
      align-items: center;
      &__value {
        width: 30px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'InterSemiBold';
        border-radius: 4px;
        font-size: 12px;
        margin-right: 8px;
      }
      &--active {
        & .lang-list-element__value {
          color: #fff;
          background: $primary;
        }
      }
    }
  }
}
</style>
