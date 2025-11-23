<script setup lang="ts">
import { useSideMenu } from '@/components/layouts/default/side-menu/useDefaultSideMenu';

const { isSideMenuOpen, toggleSideMenu } = useSideMenu();
</script>

<template>
  <button
    type="button"
    @click="toggleSideMenu"
  >
    toggle: {{ isSideMenuOpen }}
  </button>
</template>