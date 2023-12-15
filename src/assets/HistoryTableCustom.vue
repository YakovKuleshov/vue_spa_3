<script setup>
  import HistoryTableRow  from './HistoryTableRow.vue'

  const props = defineProps({
    list: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  })

  const columns = [
    {
      title: '',
      width: '300'
    },
    {
      title: 'Было',
      width: 'auto',
      prop: 'before'
    },
    {
      title: 'Стало',
      width: 'auto',
      prop: 'after'
    }
  ]
</script>

<template>
  <div class="flex table-wrapper border mb-6 overflow-x-auto overflow-y-hidden">
    <div class="history-table grow">
      <div :class="['history-table-header grid h-10 font-bold', !list.length && 'border-b']">
        <div
          v-for="(col, index) in columns"
          class="history-table-header__cell flex items-center px-3 border-r last:border-none text-zinc-400"
          :key="index"
          >
            {{ col.title }}
          </div>
      </div>
      <div class="relative min-h-[56px]" v-loading="loading">
        <HistoryTableRow
          v-for="item in list"
          :item="item"
          :key="item.uniqueFieldId"
        />
        <div v-if="!loading && !list.length" class="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2">Нет данных</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .table-wrapper::-webkit-scrollbar {
    background: transparent;
    height: 10px;
  }

  .table-wrapper::-webkit-scrollbar-thumb {
    border: 2px solid #fff;
    background: #ccc;
    border-radius: 20px;
  }

  .history-table-header {
    grid-template-columns: minmax(200px, 300px) repeat(2, minmax(300px, 1fr));
  }
</style>