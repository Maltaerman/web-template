<script setup lang="ts">
const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <TransitionGroup
    class="relative pl-1"
    name="list-from-left"
    tag="ul"
  >
    <li
      v-for="error in props.errors"
      :key="error.message"
      class="pt-1 text-sm font-normal text-accent-red"
    >
      <p v-text="error.message" />
    </li>
  </TransitionGroup>
</template>
