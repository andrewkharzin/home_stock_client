<script setup>
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { mdiListBox } from '@mdi/js';
import { faCircle, faLocationDot } from '@fortawesome/free-solid-svg-icons'

const stock = {
  name: '',
  description: '',
  address: '',
  slug: '',
}

const props = defineProps({
  stock: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      description: '',
      address: '',
      slug: '',
    }),
  },
})

</script>

<template>
  <CardBox width="w-1/1" height="h-[50px]">
    <CardHeader class="p-4">
      <div class="flex items-center divide-y divide-y-reverse">
        <div class="flex-1 space-y-2">
          <CardTitle>
            <h2 class="text-xl leading-tight text-gray-500 dark:text-slate-300">
              {{ props.stock.name }}
            </h2>
          </CardTitle>
        </div>
      </div>
    </CardHeader>
    <CardContent class="p-4">
      <div class="flex flex-col items-start justify-between">
        <h3 class="text-xs text-tiny text-slate-600 dark:text-slate-500">Описание</h3>
        <article class="text-wrap">
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ props.stock.description }}</p>
        </article>
        <p class="mt-4 text-sm text-slate-600 dark:text-slate-400">

          <font-awesome :icon="faLocationDot" :style="{color: 'orange'}"  />

          {{ props.stock.address }}
          </p>
      </div>
    </CardContent>
    <CardFooter class="p-9 relative">

      <BaseButton
        href="https://github.com/justboil/admin-one-vue-tailwind"
        target="_blank"
        :icon="mdiListBox"
        label="Просмотр"
        small
        icon-w="w-4"
        icon-h="h-4"
        color="lightDark"
        class="absolute bottom-0 right-0"
      />
      <NuxtLink
        :to="`/stock/${props.stock.slug}`"
        class="absolute bottom-0 right-0"
      >
        <BaseButton
          label="View Details"
          small
          color="lightDark"
        />
      </NuxtLink>
    </CardFooter>
  </CardBox>
</template>


