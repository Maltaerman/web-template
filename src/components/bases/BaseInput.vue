<script setup lang="ts">
import { ref, computed, onMounted, nextTick, useTemplateRef } from 'vue';

import BaseValidationErrors, { type IError } from './BaseValidationErrors.vue';

export interface IProps {
  modelValue: string | number;
  type?: 'text';
  autocomplete?: 'off';
  name?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isReadonly?: boolean;
  isValid?: boolean;
  isInvalid?: boolean;
  isFocusedOnMounted?: boolean;
  errors?: IError[];
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    modelValue: '',
    type: 'text',
    autocomplete: 'off',
    name: '',
    id: '',
    placeholder: '',
    label: '',
    isDisabled: false,
    isLoading: false,
    isReadonly: false,
    isValid: true,
    isInvalid: false,
    isFocusedOnMounted: false,
    errors: (): IError[] => []
  }
);

const emit = defineEmits(['input-blur', 'input-focus']);

const model = ref('');

const isFocused = ref(false);

const inputRef = useTemplateRef('inputRef');

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

const inputClasses = computed(() => [
  'group relative h-11 p-3 w-full appearance-none border outline-none transition-colors duration-300 placeholder-shown:truncate [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
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
  if (!props.isFocusedOnMounted) return;

  nextTick(() => {
    if (inputRef.value) inputRef.value.focus()
  });
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
      </div>
    </div>

    <BaseValidationErrors
      v-if="props.errors.length"
      :errors="props.errors"
    />
  </div>
</template>
