<script setup lang="ts">
import { computed } from 'vue';

type LabelTheme = 'primary' | 'secondary';
type LabelSize = 'md' | 'lg';

export interface IProps {
  theme?: LabelTheme;
  size?: LabelSize
  tag?: string;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    theme: 'primary',
    size: 'md',
    tag: 'span',
  }
);

const BACKGROUND_MAP = {
  primary: 'bg-neutral-300',
  secondary: 'bg-neutral-600',
};

const bgColorClass = computed(() => BACKGROUND_MAP[props.theme]);

const ROUNDED_MAP = {
  md: 'rounded-2',
  lg: 'rounded-4',
};

const roundedClass = computed(() => ROUNDED_MAP[props.size]);

const HEIGHT_MAP = {
  md: 'h-3',
  lg: 'h-4',
};

const heightClass = computed(() => HEIGHT_MAP[props.size]);

const PADDING_MAP_MAP = {
  md: 'px-2 py-2',
  lg: 'px-3 py-2',
};

const paddingClasses = computed(() => PADDING_MAP_MAP[props.size]);
</script>

<template>
  <div
    class="flex"
    :class="heightClass"
  >
    <component
      :is="props.tag"
      class="inline-flex items-center justify-center whitespace-nowrap px-1
        align-middle text-neutral-100"
      :class="[bgColorClass, roundedClass, paddingClasses]"
    >
      <slot />
    </component>
  </div>
</template>
