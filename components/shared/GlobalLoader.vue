<template>
  <div>
    <slot v-if="!pending && !error" />

    <p v-if="pending">Loading...</p>

    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    pending: {
      type: Boolean,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
  },
})
</script>
