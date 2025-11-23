<script setup lang="ts">
import { computed } from 'vue';

import { useLink } from './useBaseLink';

const props = defineProps({
  to: {
    type: [String, Object],
    default: null,
  },

  size: {
    type: String,
    default: 'xs',
    validator: (size: string) => ['xs'].includes(size),
  },

  fontWeightClass: {
    type: String,
    default: 'font-bold',
  },

  theme: {
    type: String,
    default: 'primary',
    validator: (theme: string) =>
      ['primary', 'secondary'].includes(theme),
  },

  isUnderline: {
    type: Boolean,
    default: true,
  },

  isExact: {
    type: Boolean,
    default: false,
  },

  isForceActive: {
    type: Boolean,
    default: false,
  },

  target: {
    type: String,
    default: '_blank',
  },

  rel: {
    type: String,
    default: 'noopener nofollow',
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const useLinkPropsData = computed(() => ({
  to: props.to,
  isExact: props.isExact,
  isForceActive: props.isForceActive,
  target: props.target,
  rel: props.rel,
}));

const { isActive, tag, tagProps } = useLink(useLinkPropsData);

const textColorAndShadowClass = computed(
  () => {
    if (props.isDisabled) {
      return 'pointer-events-none text-neutral-200';
    }

    switch (props.theme) {
      case 'light':
        return isActive.value
          ? 'text-light'
          : `text-light can-hover:hover:drop-shadow-light
            can-hover:hover:active:drop-shadow-none`;

      case 'primary':
        return isActive.value
          ? 'text-primary-100'
          : `text-primary-100 can-hover:hover:drop-shadow-primary-100
            can-hover:hover:active:drop-shadow-none`;

      case 'secondary':
        return isActive.value
          ? 'text-primary-100'
          : `text-primary-200 can-hover:hover:drop-shadow-primary-100
            can-hover:hover:active:text-primary-100
            can-hover:hover:active:drop-shadow-none`;

      case 'tertiary':
        return isActive.value
          ? 'text-primary-200'
          : `text-primary-100 can-hover:hover:text-light
            can-hover:hover:active:text-primary-200`;

      default:
        return '';
    }
  }
);
</script>

<template>
  <component
    :is="tag"
    v-bind="tagProps"
    class="transition-all duration-300"
    :class="[
      `text-${props.size}`,
      textColorAndShadowClass,
      props.fontWeightClass,
      {
        'pointer-events-none': isActive,
        underline: props.isUnderline,
      },
    ]"
  >
    <slot />
  </component>
</template>
