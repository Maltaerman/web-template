<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  theme: {
    type: String,
    default: 'primary',
    validator: (type) =>
      ['primary', 'secondary'].includes(type),
  },

  size: {
    type: String,
    default: 'md',
    validator: (type) => ['md', 'lg'].includes(type),
  },

  tag: {
    type: String,
    default: 'span',
  },

  title: {
    type: String,
    default: '',
  },

  isUppercase: {
    type: Boolean,
    default: true,
  },
});

const BACKGROUND_MAP = {
  primary: 'bg-neutral-300',
  secondary: 'bg-neutral-600',
};

const bgColorClass = computed(() => BACKGROUND_MAP[props.theme]);

const ROUNDED_MAP = {
  xxs: 'rounded-2',
  xs: 'rounded-4',
  sm2: 'rounded-4',
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

const textColorClass = computed(() => 'text-neutral-100');
</script>

<template>
  <div
    class="flex"
    :class="heightClass"
  >
    <component
      :is="props.tag"
      class="inline-flex items-center justify-center whitespace-nowrap px-1
        align-middle"
      :class="[bgColorClass, roundedClass, paddingClasses, textColorClass]"
    >
      <slot />
    </component>
  </div>
</template>
