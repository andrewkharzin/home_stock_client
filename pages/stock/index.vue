<script setup>
import { ref, onMounted } from 'vue'
import { mdiChartTimelineVariant } from '@mdi/js'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(true)
const name = ref('')
const stocks = ref([])
const description = ref('')

loading.value = true

const fetchData = async () => {
  loading.value = true
  try {
    console.log('Fetching data...')

    const { data: stocksData, error } = await supabase
      .from('stock')
      .select('name, description, address, slug, id')
      // .eq('id', user.value.id)
      .limit(10)

    if (error) {
      console.error('Error fetching data:', error)
      throw error
    }

    console.log('Data fetched successfully:', stocksData)
    stocks.value = stocksData
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    loading.value = false
    console.log('Loading state:', loading.value)
  }
}

onMounted(() => {
  fetchData()
})


// const { data } = await supabase
//   .from('stock')
//   .select(`name, description, address, slug`)
//   .eq('id', user.value.id)
//   .single()

//   console.log("Data", data)

</script>

<template>
  <div>
     <NuxtLayout name="authenticated">
       <SectionMain>
         <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="My Stock" main />
         <div class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
           <div v-for="stock in stocks" :key="stock.id" class="w-full h-[260px]">
             <StockCard :stock="stock" :formatDate="formatDate" :imageUrl="stock.icon" />
           </div>
         </div>
       </SectionMain>
     </NuxtLayout>
   </div>
 </template>

<!-- <template>

</template> -->