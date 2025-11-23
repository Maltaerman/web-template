<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';

import BaseIcon from './BaseIcon.vue';
import BaseValidationErrors from './BaseValidationErrors.vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  name: {
    type: String,
    default: null,
  },

  id: {
    type: String,
    default: null,
  },

  placeholder: {
    type: String,
    default: null,
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },

  isReadOnly: {
    type: Boolean,
    default: false,
  },

  label: {
    type: String,
    default: '',
  },

  autocomplete: {
    type: String,
    default: 'off',
  },

  help: {
    type: String,
    default: '',
  },

  errors: {
    type: Array,
    default: () => [],
  },

  isValid: {
    type: Boolean,
    default: false,
  },

  isInvalid: {
    type: Boolean,
    default: false,
  },

  prefixIcon: {
    type: String,
    default: '',
  },

  suffixIcon: {
    type: String,
    default: '',
  },

  suffixIconId: {
    type: String,
    default: null,
  },

  customSuffixIconColor: {
    type: String,
    default: '',
  },

  customSuffixIconCursor: {
    type: String,
    default: 'cursor-pointer',
  },

  iconTransition: {
    type: String,
    default: 'transition-fade',
  },

  isFocusedOnMounted: {
    type: Boolean,
    default: false,
  },
});

const model = ref('');

const isFocused = ref(false);

const inputRef = ref(null);

const inputPadding = computed(() => {
  let padding = 'p-3';

  if (props.prefixIcon) padding += ' pl-10';

  if (props.suffixIcon) padding += ' pr-10';

  return padding;
});

const inputInnerBorderColor = computed(() => {
  if (props.isInvalid) return 'border-neutral-100';
  if (props.isDisabled) return 'border-neutral-100';
  if (props.isValid) return 'border-neutral-100';
  if (isFocused.value) return 'border-neutral-100';

  return 'border-neutral-100';
});

const inputBackgroundColor = computed(() => {
  if (props.isDisabled) return 'bg-neutral-300';

  return 'bg-neutral-300';
});

const inputTextColor = computed(() => {
  if (isFocused.value) return 'text-neutral-200';

  return 'text-neutral-200';
});

const inputPlaceholderColor = computed(() => {
  if (isFocused.value) return 'placeholder-neutral-200';

  return 'placeholder-neutral-200';
});

const prefixIconColor = computed(() => {
  if (props.isDisabled) return 'text-neutral-200';
  if (isFocused.value) return 'text-neutral-200';

  return 'text-neutral-200';
});

const suffixIconColor = computed(() => {
  if (props.customSuffixIconColor) return props.customSuffixIconColor;

  if (props.isDisabled) return 'text-neutral-200';

  return 'text-neutral-200 can-hover:hover:active:text-neutral-400';
});

const inputClasses = computed(() => [
  'group relative h-11 w-full appearance-none border outline-none transition-colors duration-300 placeholder-shown:truncate [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
  inputPadding.value,
  inputInnerBorderColor.value,
  inputBackgroundColor.value,
  inputTextColor.value,
  inputPlaceholderColor.value,
]);

const inputProps = computed(() => ({
  id: props.id,
  name: props.name,
  type: props.type,
  disabled: props.isDisabled,
  readonly: props.isReadOnly,
  autocomplete: props.autocomplete,
  class: inputClasses.value,
  placeholder: props.placeholder,
}));

function handleBlur() {
  isFocused.value = false;

  emit('input-blur', props.name);
}

function handleFocus() {
  isFocused.value = true;

  emit('input-focus', props.name);
}

function focus() {
  if (props.isFocusedOnMounted && inputRef.value)
    nextTick(() => inputRef.value.focus());
}

onMounted(focus);
</script>

<template>
  <div
    :class="{
      'pointer-events-none': props.isDisabled,
      '--isValid': props.isValid,
      '--isInvalid': props.isInvalid,
    }"
  >
    <div class="select-none">
      <label
        v-if="props.label"
        class="block pb-1 text-sm font-semibold text-neutral-200 text-left"
        :for="props.id"
        v-text="props.label"
      />

      <div class="group relative flex transition-colors duration-300">
        <input
          ref="inputRef"
          v-model="model"
          v-bind="inputProps"
          @blur="handleBlur"
          @focus="handleFocus"
        />

        <label
          v-if="props.prefixIcon"
          class="absolute left-3 top-1/2 -translate-y-1/2 cursor-default"
          :class="prefixIconColor"
          :for="props.id"
        >
          <BaseIcon
            class="m-auto size-4"
            :name="props.prefixIcon"
          />
        </label>

        <Transition :name="props.iconTransition">
          <label
            v-if="props.suffixIcon"
            :id="props.suffixIconId"
            class="absolute right-2 top-1/2 flex -translate-y-1/2 can-hover:hover:text-light"
            :class="[suffixIconColor, customSuffixIconCursor]"
            @click.stop="emit('suffix-icon-click', props.name)"
          >
            <slot name="suffix-icon">
              <BaseIcon
                :key="props.suffixIcon"
                class="m-auto size-4"
                :name="props.suffixIcon"
              />
            </slot>
          </label>
        </Transition>
      </div>
    </div>

    <slot name="help">
      <small
        v-if="props.help"
        class="block pt-1 text-sm font-normal"
        :class="isValid ? 'text-neutral-300' : 'text-neutral-200'"
        v-text="props.help"
      />
    </slot>

    <BaseValidationErrors
      v-if="props.errors.length"
      :errors="props.errors"
    />
  </div>
</template>
