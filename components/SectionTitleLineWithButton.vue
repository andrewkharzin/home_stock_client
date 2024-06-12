<script setup>
import { mdiCog } from '@mdi/js'
import { useSlots, computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import IconRounded from '@/components/IconRounded.vue'

defineProps({
  icon: {
    type: String,
    default: null
  },
  title: {
    type: String,
    required: true
  },
  subtext: {
    type: String,
    default: ''
  },
  main: Boolean,
  titleClass: {
    type: String,
    default: ''
  }
})

const hasSlot = computed(() => useSlots().default)
</script>

<template>
  <section :class="{ 'pt-6': !main }" class="mb-6 flex items-center justify-between">
    <div class="flex flex-col">
      <div class="flex items-center justify-start">
        <IconRounded v-if="icon && main" :icon="icon" color="light" class="mr-3" bg />
        <BaseIcon v-else-if="icon" :path="icon" class="mr-2" size="20" />
        <div>
          <h1 :class="[main ? 'text-3xl' : 'text-2xl', titleClass]" class="leading-tight">
            {{ title }}
          </h1>
          <p v-if="subtext" class="text-sm text-gray-500 dark:text-gray-300 mt-1">{{ subtext }}</p>
        </div>
      </div>
    </div>
    <slot v-if="hasSlot" />
    <BaseButton v-else :icon="mdiCog" color="whiteDark" />
  </section>
</template>
