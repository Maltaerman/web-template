<script setup lang="ts">
import BaseButton from '@/components/bases/BaseButton.vue'
import BaseLabel from '@/components/bases/BaseLabel.vue'
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
        icon-name="user"
        iconStyleClasses="text-accent-red"
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

    <div class="m-4 flex flex-col gap-4 w-fit">
      <BaseLabel
        theme="primary"
        size="md"
      >
        BaseLabel
      </BaseLabel>

      <BaseLabel
        theme="secondary"
        size="lg"
        class="w-fit"
      >
        BaseLabel
      </BaseLabel>
    </div>
  </div>
</template>
