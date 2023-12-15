<script setup>

  const props = defineProps({
    item: {
      type: Object,
      default: () => {}
    }
  })

  function cellBg(action) {
    switch (action) {
      case 'update':
        return 'bg-sky-100'
      case 'delete':
        return 'bg-red-100'
      default:
        return 'bg-green-100'
    }
  }

</script>

<template>
  <div>
    <div :class="['history-table-row grid border-t', item.children?.length && 'border-b']">
      <div class="history-table-row__cell relative flex items-center pl-9 pr-3 border-r py-3 text-black">
        <el-icon
          v-if="item.children?.length"
          :class="['!absolute left-3 el-icon--left cursor-pointer transition', item.opened && 'rotate-90']"
          size="14"
          @click="item.opened = !item.opened"
        >
          <font-awesome-icon :icon="['fas', 'fa-angle-right']" />
        </el-icon>
        <div class="history-table-row__cell__value">{{ item.fieldTitle }}</div>
      </div>
      <template v-if="!item.children?.length">
        <div class="history-table-row__cell py-2 border-r last:border-none">
          <div
            v-for="(val, index) in item.values"
            class="flex items-center first:border-t border-b h-10 px-3 text-ellipsis overflow-hidden whitespace-nowrap text-black"
            :class="[item.values.length === 1 && 'border-none', cellBg(val?.action)]"
            :key="index"
          >
            {{ val.before }}
          </div>
        </div>
        <div class="history-table-row__cell py-2 border-r last:border-none">
          <div
            v-for="(val, index) in item.values"
            class="flex items-center first:border-t border-b h-10 px-3 text-ellipsis overflow-hidden whitespace-nowrap text-black"
            :class="[item.values.length === 1 && 'border-none', cellBg(val?.action)]"
            :key="index"
          >
            {{ val.after }}
          </div>
        </div>
      </template>
      <!-- <div v-else class="font-semibold flex items-center px-3">Подформа</div> -->
    </div>
    <div v-if="item.opened">
      <div class="font-semibold text-3xl text-center mb-5 py-3">Подформа</div>
      <HistoryTableRow
        v-for="elem in item.children"
        :item="elem"
        :key="elem.uniqueFieldId"
      />
    </div>
  </div>
</template>

<style scoped>
  .history-table-row {
    grid-template-columns: minmax(200px, 300px) repeat(2, minmax(300px, 1fr));
    color: #606266;
  }

  .history-table-row__cell__value {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    overflow: hidden;
    -webkit-box-orient: vertical;
  }
</style>