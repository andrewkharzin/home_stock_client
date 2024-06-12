<template>
  <div>
    <NuxtLayout name="authenticated">
      <SectionMain>
        <SectionTitleLineWithButton
          v-if="stock"
          :icon="mdiDetails"
          :title="stock.name"
          :titleClass="'text-2xl font-bold text-pink-400'"
          :subtext="stock.description"
           main />
        <div class="flex flex-col"></div>
        <div v-if="stock">
          
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </SectionMain>
    </NuxtLayout>
    <!-- Other stock details -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { mdiDetails } from '@mdi/js'
definePageMeta({
  // you can also pass a string or a computed property
  key: route => route.slug,
  transition: {
    name: 'page',
  },
  keepalive: {
    exclude: ['modal']
  },
})

const supabase = useSupabaseClient()
const stock = ref(null)
const route = useRoute()

onMounted(async () => {
  const slug = route.params.slug // Get the slug parameter from the route
  try {
    // Fetch the stock ID using the slug
    const { data: stocks, error } = await supabase
      .from('stock')
      .select('id')
      .eq('slug', slug)
      .single()

    if (error) throw error

    // Fetch the stock details using the retrieved ID
    const { data: stockData, error: stockError } = await supabase
      .from('stock')
      .select('*')
      .eq('id', stocks.id)
      .single()

    if (stockError) throw stockError

    stock.value = stockData // Update the stock variable with fetched data
  } catch (error) {
    console.error(error)
  }
})
</script>
