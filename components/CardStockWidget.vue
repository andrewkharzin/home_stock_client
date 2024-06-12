<script>
import { mdiCog } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import NumberDynamic from '@/components/NumberDynamic.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import PillTagTrend from '@/components/PillTagTrend.vue'
import BaseButton from '@/components/BaseButton.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import QrcodeVue from 'vue-qrcode'

export default {
  components: {
    QrcodeVue
  },
  props: {
    number: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    default: null
  },
  prefix: {
    type: String,
    default: null
  },
  suffix: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  trend: {
    type: String,
    default: null
  },
  trendType: {
    type: String,
    default: null
  },
    stock: {
      type: Object,
      required: true
    },
    formatDate: {
      type: Function,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const qrCodeSize = ref(20)
    const entities = ref([])
    const stock = props.stock

    const formatTotalCost = (totalCost) => {
      const numberFormat = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      return numberFormat.format(totalCost)
    }

    const fetchEntities = async () => {
      console.log('stock:', stock)
      try {
        const response = await fetch(`http://127.0.0.1:8000/entities/?stock=${stock.id}`)
        const data = await response.json()
        entities.value = data
      } catch (error) {
        console.error(error)
      }
    }
    onMounted(() => {
      fetchEntities()
    })

    const filteredEntities = computed(() => {
      return entities.value.filter(entity => entity.stock.id === stock.id)
    })

    const totalItems = computed(() => {
      return filteredEntities.value.reduce((total, entity) => total + entity.quantity, 0)
    })

    const totalCost = computed(() => {
      return filteredEntities.value.reduce((total, entity) => total + entity.total, 0)
    })


    const toggleQrCodeSize = () => {
      qrCodeSize.value = qrCodeSize.value === 20 ? 200 : 20
    }

    const showFullDescription = ref(false)

    const truncate = (text, length) => {
      if (text.length <= length) {
        return text
      }
      return text.substring(0, length) + '...'
    }

    const toggleDescription = () => {
      showFullDescription.value = !showFullDescription.value
    }

    return {
      showFullDescription,
      truncate,
      toggleDescription,
      qrCodeSize,
      toggleQrCodeSize,
      filteredEntities,
      totalItems,
      totalCost,
      formatTotalCost
    }
  }
}
</script>

<template>
  <CardBox>
    <BaseLevel v-if="trend" class="mb-3" mobile>
      <PillTagTrend :trend="trend" :trend-type="trendType" small />
      <BaseButton :icon="mdiCog" icon-w="w-4" icon-h="h-4" color="lightDark" small />
    </BaseLevel>
    <BaseLevel mobile>
      <div>
        <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">
          {{ label }}
        </h3>
        <h1 class="text-3xl leading-tight font-semibold">
          <NumberDynamic :value="number" :prefix="prefix" :suffix="suffix" />
        </h1>
      </div>
      <Avatar>
          <AvatarImage :src="imageUrl" :alt="stock.name" />
      </Avatar>
      <BaseIcon v-if="icon" :path="icon" size="48" w="" h="h-16" :class="color" />
    </BaseLevel>
  </CardBox>
</template>
