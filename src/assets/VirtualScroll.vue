<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

  const props = defineProps({
    list: {
      type: Array,
      default: () => []
    },
    itemHeight: {
      type: Number,
      required: true
    },
    containerMaxHeight: {
      type: Number,
      required: true
    }
  })

  const scrollElementRef = ref()
  const scrollTop = ref(0)

  onMounted(() => {
    scrollElementRef.value.addEventListener('scroll', scrollList)
  })

  onBeforeUnmount(() => {
    scrollElementRef.value.removeEventListener('scroll', scrollList)
  })

  function scrollList() {
    scrollTop.value = scrollElementRef.value.scrollTop
  }

  const listTorender = computed(() => {
    const rangeStart = scrollTop.value
    const rangeEnd = scrollTop.value + props.containerMaxHeight
    const virtualItems = []

    let startIndex = Math.round(rangeStart / props.itemHeight)
    let endIndex = Math.round(rangeEnd / props.itemHeight)

    startIndex = Math.max(0, startIndex - 1)
    endIndex = Math.min(props.list.length - 1, endIndex)


    for (let i = startIndex; i <= endIndex; i++) {
      virtualItems.push({ index: i, offsetTop: i * props.itemHeight})
    }

    return virtualItems
  })
</script>

<template>
  <div
    ref="scrollElementRef"
    class="scroll-container w-full overflow-y-auto overflow-x-hidden relative"
    :style="{ maxHeight: `${containerMaxHeight}px` }"
  >
    <div :style="{ height: `${itemHeight * list.length}px` }">
      <div
        v-for="item in listTorender"
        class="absolute left-0 top-0 w-[calc(100%-5px)]"
        :key="list[item.index].id"
        :style="{ transform: `translateY(${item.offsetTop}px)`, height: `${itemHeight}px` }"
      >
        <slot name="element" :element="list[item.index]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .scroll-container::-webkit-scrollbar {
    background: transparent;
    width: 8px;
  }

  .scroll-container::-webkit-scrollbar-thumb {
    background: var(--el-color-primary);
    border-radius: 20px;
  }
</style>
