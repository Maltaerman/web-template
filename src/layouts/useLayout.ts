import { useMemoize } from '@vueuse/core';
import { ref, watchEffect, markRaw } from 'vue';
import { useRoute } from 'vue-router';

export const LAYOUT_ENUM = {
  DEFAULT: 'Default',
  EMPTY: 'Empty',
};

type LayoutComponent = ReturnType<typeof markRaw>;

const LAYOUT = ref<LayoutComponent | null>(null);

const LAYOUT_COMPONENTS = import.meta.glob('@/layouts/*Layout.vue') as {
  [path: string]: () => Promise<{ default: LayoutComponent }>;
};

const loadLayoutComponent = useMemoize(
  async (layoutPath: string): Promise<LayoutComponent | null> => {
    const layoutComponentModule =
      LAYOUT_COMPONENTS[layoutPath] ??
      LAYOUT_COMPONENTS['/src/layouts/EmptyLayout.vue'];

    if (!layoutComponentModule) return null;

    const module = await layoutComponentModule();

    return markRaw(module.default);

  }
);

export function useLayout() {
  const route = useRoute();

  watchEffect(async () => {
    const layoutName = route?.meta?.layout ?? LAYOUT_ENUM.DEFAULT;
    const layoutComponentPath = `/src/layouts/${layoutName}Layout.vue`;

    try {
      LAYOUT.value = await loadLayoutComponent(layoutComponentPath);
    } catch (error) {
      const message = `Failed to load layout component: ${layoutComponentPath}`;

      console.error(message, error);
    }
  });

  return LAYOUT;
}
