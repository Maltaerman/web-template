<script lang="ts" setup>
import { ref } from 'vue'

import ToolBar from '@/components/layouts/ToolBar.vue';
import CookieBanner from '@/components/layouts/CookieBanner.vue';

const isCookieBannerShown = ref(false);
</script>

<template>
  <div>
    <main class="relative flex size-full flex-1 flex-col --screenMinHeight transition-colors duration-300">
      <slot />
    </main>

    <ToolBar class="fixed bottom-0 w-full" />

    <CookieBanner v-if="isCookieBannerShown" />
  </div>
</template>
