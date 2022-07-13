<template>
  <i class="ac-icon" :style="style">
    <slot></slot>
  </i>
</template>
<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { iconProps } from './icon'

defineOptions({
  name: 'AcIcon'
  // inheritAttrs: false
})

const props = defineProps(iconProps)

const style = computed(() => {
  if (!props.size && !props.color) return {}
  return {
    fontSize: props.size ? props.size + 'px' : undefined,
    color: props.color ? props.color : undefined
  }
})
</script>
