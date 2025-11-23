<script lang="ts" setup>
import DefaultHeader from '@/components/layouts/default/header/DefaultHeader.vue';
import DefaultSideMenu from '@/components/layouts/default/side-menu/DefaultSideMenu.vue';
import DefaultFooter from '@/components/layouts/default/DefaultFooter.vue';
import ToolBar from '@/components/layouts/ToolBar.vue';

import { useSideMenu } from '@/components/layouts/default/side-menu/useDefaultSideMenu';

const { isSideMenuOpen } = useSideMenu();
</script>

<template>
  <div>
    <DefaultHeader />

    <main
      class="mt-(--headerHeight) --screenMinHeight flex size-full flex-1 flex-col"
    >
      <Transition name="slide-left">
        <DefaultSideMenu v-show="isSideMenuOpen" />
      </Transition>

      <slot />
    </main>

    <DefaultFooter />

    <ToolBar />
  </div>
</template>
