<script setup>
import { ref, onMounted } from 'vue'
import { mdiChartTimelineVariant } from '@mdi/js'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
// import { formatDate } from '@/lib/date_format.js'

const supabase = useSupabaseClient()
const stocks = ref([])
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    let { data: stocksData, error } = await supabase
      .from('stock')
      .select('*')
    if (error) throw error
    stocks.value = stocksData
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>
<template>
  <div>
    <NuxtLayout name="authenticated">
      <SectionMain>
        <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="My Stock" main />
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <div v-for="stock in stocks" :key="stock.id" class="w-full h-[260px]">
            <StockCard :stock="stock" :formatDate="formatDate" :imageUrl="stock.icon" />
          </div>
        </div>
      </SectionMain>
    </NuxtLayout>
  </div>
</template>
