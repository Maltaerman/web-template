<script setup lang="ts">
import { useSideMenu } from '@/components/layouts/default/side-menu/useDefaultSideMenu';

const { closeSideMenu } = useSideMenu();
</script>

<template>
  <div
    ref="sideMenuRef"
    class="noScrollbar fixed left-0 top-0 flex w-70
      flex-col gap-1 overflow-y-auto overflow-x-hidden bg-surface-400 pb-5 pt-4 bg-accent-pink h-full z-10"
  >
    <button
      class="ml-auto mr-2"
      type="button"
      @click="closeSideMenu"
    >
      close side ment
    </button>

    <div class="mt-auto flex flex-col gap-3 px-5">
      Side menu content...
    </div>
  </div>
</template>
