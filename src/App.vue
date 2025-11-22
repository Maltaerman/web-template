<script setup lang="ts">
import { useLayout } from '@/layouts/useLayout';
import { useLayoutRouteTransition } from '@/layouts/useLayoutRouteTransition';

const layoutComponent = useLayout();
const { layoutRouteTransition } = useLayoutRouteTransition();
</script>

<template>
  <component :is="layoutComponent">
    <Transition
      :name="layoutRouteTransition"
      mode="out-in"
    >
      <router-view
        :key="$route.fullPath"
        v-slot="{ Component, route }"
      >
        <component
          :is="Component"
          :key="route.name"
        />
      </router-view>
    </Transition>
  </component>
</template>
