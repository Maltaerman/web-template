<script setup lang="ts">
import { useTemplateRef, shallowRef, watch, computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  fill: {
    type: String,
    default: 'currentColor',
  },

  stroke: {
    type: String,
    default: '',
  },

  transitionClass: {
    type: String,
    default: 'transition-all',
  },

  format: {
    type: String,
    default: 'svg',
    validator: (format: string) => ['svg', 'webp', 'png'].includes(format),
  },
});

const baseIconRef = useTemplateRef('baseIconRef');

const isSvg = computed(() => props.format === 'svg');

const svgModules = import.meta.glob('/src/assets/icons/*.svg', {
  eager: true,
  import: 'default',
});

const icon = shallowRef(null);

async function loadIcon() {
  console.log('svgModules', svgModules, isSvg.value)

  if (isSvg.value) {
    const svgPath = `/src/assets/icons/${props.name}.svg`;
    const svgIcon = svgModules[svgPath];

    if (!svgIcon) throw new Error('Svg Icon with this name does not exist');

    icon.value = svgIcon;

    return;
  }
}

watch(() => props.name, loadIcon, { immediate: true });
</script>

<template>
  <img
    :src="icon"
    ref="baseIconRef"
    class="baseIcon duration-300"
    :class="props.transitionClass"
    :fill="props.fill"
    :stroke="props.stroke"
  />
</template>
