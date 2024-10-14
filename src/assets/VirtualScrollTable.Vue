<script setup>
  import { ref, reactive, onMounted, onBeforeUnmount, provide, computed, watch } from 'vue'

  const props = defineProps({
    tableData: {
      type: Array,
      default: () => []
    },
    vissibleColumns: {
      type: Array,
      default: () => []
    },
    size: String,
    loading: Boolean
  })

  const emit = defineEmits(['sort-change'])

  const tableHeaderRef = ref()
  const tableContentRef = ref()
  const scrollPos = ref(0)
  const cellWidth = 200
  const limit = 20
  const startIndex = ref(0)
  const sort = reactive({
    order: null,
    prop: null
  })

  provide('scrollPos', scrollPos)
  provide('sorting', sort)

  watch(() => sort, (val) => {
    emit('sort-change', val)
  }, { deep: true })

  function scrollTableHeader() {
    tableHeaderRef.value.scrollLeft = this.scrollLeft
  }

  function scrollTableContent() {
    tableContentRef.value.scrollLeft = this.scrollLeft
    scrollPos.value = this.scrollLeft

    startIndex.value = Math.min(props.vissibleColumns.length - limit - 1, Math.floor(scrollPos.value / cellWidth))

    if (startIndex.value < 0) startIndex.value = 0
  }

  const leftWidth = computed(() => {
    if (props.vissibleColumns.length <= limit) {
      return 0
    }

    return cellWidth * startIndex.value
  })

  const rightWidth = computed(() => {
    if (props.vissibleColumns.length <= limit) {
      return 0
    }

    return cellWidth * (props.vissibleColumns.length - (startIndex.value + limit + 1))
  })

  const listToRender = computed(() => {
    return props.vissibleColumns.slice(startIndex.value, startIndex.value + limit + 1)
  })

  onMounted(() => {
    if (tableHeaderRef.value && tableContentRef.value) {
      tableHeaderRef.value.addEventListener('scroll', scrollTableContent)
      tableContentRef.value.addEventListener('scroll', scrollTableHeader)
    }
  })

  onBeforeUnmount(() => {
    tableHeaderRef.value.removeEventListener('scroll', scrollTableContent)
    tableContentRef.value.removeEventListener('scroll', scrollTableHeader)
  })
</script>

<template>
  <div :class="['el-table forms-table rounded-[6px] overflow-hidden', size && `el-table--${size}`]" v-loading="loading">
    <div ref="tableHeaderRef" class="forms-table__header flex overflow-x-auto shrink-0">
      <div class="shrink-0" :style="{ width: `${leftWidth}px` }" />
      <div class="flex grow" :style="{ width: `${cellWidth * limit + 1}px` }">
        <slot name="table" :header="true" :list-to-render="listToRender" />
      </div>
      <div class="shrink-0" :style="{ width: `${rightWidth}px` }" />
    </div>

    <div ref="tableContentRef" :class="['forms-table__tbody relative w-full flex overflow-x-auto', !tableData.length && 'min-h-[117px]']">
      <div class="shrink-0" :style="{ width: `${leftWidth}px` }" />
      <div class="grow" :style="{ width: `${cellWidth * limit + 1}px` }">
        <div
          v-for="item in tableData"
          class="forms-table__row flex border-b"
          :style="{ maxWidth: `${cellWidth * vissibleColumns.length}px` }"
          :key="item.id"
        >
          <slot name="table" :row="item" :list-to-render="listToRender" />
        </div>
      </div>
      <div class="shrink-0" :style="{ width: `${rightWidth}px` }" />

      <div v-if="!loading && !tableData.length"
        class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#4b7dbe] text-[18px]"
      >
        Нет данных
      </div>
    </div>
  </div>
</template>

<style scoped>
  .forms-table__row:nth-child(even):deep(.content-cell) {
    background: #f2f7fc;
  }

  .forms-table__row:nth-child(even):deep(.content-cell.fixed-left.shadow::before) {
    background: #f2f7fc;
  }

  .forms-table__header::-webkit-scrollbar,
  .forms-table__tbody::-webkit-scrollbar {
    height: 12px;
  }

  .forms-table__header::-webkit-scrollbar-thumb,
  .forms-table__tbody::-webkit-scrollbar-thumb {
    background: rgba(75, 125, 190, 0.8);
    border-radius: 15px;
    border: 3px solid #fff;
    cursor: pointer;
  }

  @supports not selector(::-webkit-scrollbar) {
    .forms-table__header,
    .forms-table__tbody {
      scrollbar-color: rgba(75, 125, 190, 0.8) transparent;
      scrollbar-width: thin;
    }
  }
</style>
