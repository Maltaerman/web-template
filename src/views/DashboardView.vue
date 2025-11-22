<script setup lang="ts">
import BaseButton from '@/components/bases/BaseButton.vue'

</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>Dashboard view</h1>

    <div class="m-4 flex flex-col gap-4 w-fit">
      <BaseButton
        class="w-fit"
        is-loading
      >
        BaseButton
      </BaseButton>

      <BaseButton
        theme="primary"
        size="md"
        class="w-fit"
        is-disabled
      >
        BaseButton
      </BaseButton>

      <BaseButton
        theme="primary"
        class="w-fit"
        size="md"
      >
          BaseButton
      </BaseButton>

      <BaseButton
        theme="secondary"
        class="w-fit"
        size="lg"
      >
        BaseButton
      </BaseButton>
    </div>
  </div>
</template>
