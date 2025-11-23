<script setup lang="ts">
import ToggleSidemenuButton from '@/components/layouts/default/header/ToggleSidemenuButton.vue';
</script>

<template>
  <header
    class="h-(--headerHeight) flex w-full items-center justify-center lg:px-10 xl:px-20.5 4xl:px-28 border-b border-accent-red"
  >
    <div
      class="relative flex size-full max-w-screen-4xl flex-row items-center justify-between gap-2"
    >
      <ToggleSidemenuButton />

      Header content...
    </div>
  </header>
</template>
