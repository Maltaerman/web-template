<script setup lang="ts">
import { computed } from 'vue';

import BaseLoader from '@/components/bases/BaseLoader.vue';
import BaseIcon, { type IconFormat } from '@/components/bases/BaseIcon.vue';

type ButtonType = 'button' | 'submit';
type ButtonTheme = 'primary' | 'secondary';
type ButtonSize = 'md' | 'lg';
type ButtonIconPosition = 'left' | 'right';

export interface IProps {
  type?: ButtonType;
  theme?: ButtonTheme;
  size?: ButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSideLess?: boolean;
  isOnlyIcon?: boolean;
  iconName?: string;
  iconStyleClasses?: string;
  iconFormat?: IconFormat;
  iconPosition?: ButtonIconPosition;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    type: 'button',
    theme: 'primary',
    size: 'md',
    isDisabled: false,
    isLoading: false,
    isSideLess: false,
    isOnlyIcon: false,
    iconName: '',
    iconStyleClasses: '',
    iconFormat: 'svg',
    iconPosition: 'left',
  }
);

const isPointerEventsNone = computed(() => props.isDisabled || props.isLoading);

const TEXT_SIZE_MAP = {
  md: 'text-sm2',
  lg: 'text-md',
};

const textSizeClass = computed(() => TEXT_SIZE_MAP[props.size]);

const ICON_SIZE_MAP = {
  md: 'size-5',
  lg: 'size-5',
};

const iconSizeClass = computed(() => ICON_SIZE_MAP[props.size]);

const ROUNDED_MAP = {
  md: 'rounded-8',
  lg: 'rounded-12',
};

const roundedClass = computed(() => ROUNDED_MAP[props.size]);

const HEIGHT_MAP = {
  md: 'h-8',
  lg: 'h-11',
};

const heightClass = computed(() => HEIGHT_MAP[props.size]);

const WIDTH_MAP = {
  md: 'w-8',
  lg: 'w-11',
};

const widthClass = computed(() => {
  if (!props.isOnlyIcon) return '';

  return WIDTH_MAP[props.size];
});

const PADDING_MAP = {
  md: 'px-4',
  lg: 'px-8',
};

const paddingClass = computed(() => {
  if (props.isSideLess || props.isOnlyIcon) return '';

  return PADDING_MAP[props.size];
});

const textColorClass = computed(
  () => {
    switch (props.theme) {
      case 'primary':
        return props.isDisabled
          ? 'text-neutral-600'
          : 'text-neutral-100';

      case 'secondary':
        return props.isDisabled
          ? 'text-neutral-600'
          : 'text-neutral-200';

      default:
        return '';
    }
  }
);

const themeBgColorClass = computed(
  () => {
    switch (props.theme) {
      case 'primary':
        return props.isDisabled
          ? 'bg-neutral-100'
          : `bg-neutral-600 hover:group-hover/button:bg-neutral-500 hover:group-active/button:bg-neutral-400`;

      case 'secondary':
        return props.isDisabled
          ? 'bg-neutral-100'
          : `bg-neutral-300 hover:group-hover/button:bg-neutral-200 hover:group-active/button:bg-neutral-100`;

      default:
        return '';
    }
  }
);
</script>

<template>
  <button
    class="relative group/button flex items-center justify-center font-extrabold
      transition-all duration-300 hover:cursor-pointer"
    :class="[
      roundedClass,
      heightClass,
      widthClass,
      textColorClass,
      textSizeClass,
      {
        'pointer-events-none': isPointerEventsNone,
        'shrink-0': props.isOnlyIcon,
      },
    ]"
  >
    <div
      class="flex size-full shrink-0 items-center justify-center gap-1
        transition-all duration-300"
      :class="[
        roundedClass,
        paddingClass,
        themeBgColorClass,
        { 'flex-row-reverse': props.iconPosition === 'right' },
      ]"
    >
      <slot name="content">
        <BaseLoader
          v-if="props.isLoading"
          container-position-classes="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          :loader-color-class="
            props.theme === 'secondary'
              ? 'fill-text-purple'
              : 'fill-surface-primary'
          "
          loader-size-classes="size-7"
        />

        <BaseIcon
          v-if="props.iconName"
          class="shrink-0"
          :class="[
            props.iconStyleClasses,
            iconSizeClass,
            { invisible: props.isLoading },
          ]"
          :format="props.iconFormat"
          :name="props.iconName"
        />

        <span
          v-if="!props.isOnlyIcon"
          class="truncate"
          :class="{ invisible: props.isLoading }"
        >
          <slot />
        </span>
      </slot>
    </div>
  </button>
</template>
