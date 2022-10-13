<template>
  <div class="folders__container">
    <div class="selected-name">{{ selectedName.name }}</div>
    <template v-for="item in list" :key="item.name">
      <div class="folder__item" :class="{ folder__item__active: item.id == selected.id }" @click="selectItem(item)">
        <div
          v-if="item.sub_list.length"
          class="folder__icon"
          :class="{ folder__icon__active: item.opened }"
          @click.stop="openList($event, item)"
        ></div>
        <div class="folder__name">{{ item.name }}</div>
      </div>
      <FoldersSubList class="folders__sub__list" :class="{ active: item.opened }" :selected="selected" :subList="item.sub_list" />
    </template>
  </div>
</template>
<style scoped>
.folders__container {
  width: 400px;
  background: #fff;
  margin: 0 auto;
  padding: 10px;
  border-radius: 5px;
  position: relative;
}

.selected-name {
  margin-bottom: 10px;
}

.folders__sub__list {
  display: none;
}

.active {
  display: block !important;
}

.folder__item {
  height: 30px;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin-bottom: 3px;
  border-radius: 5px;
  cursor: pointer;
}

.folder__item__active {
  background: #3ef3b7;
}

.folder__icon {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  border-right: 2px solid #333;
  border-bottom: 2px solid #333;
  transform: rotate(-45deg);
  transition: 0.3s;
  box-sizing: border-box;
  margin-right: 10px;
  cursor: pointer;
}

.folder__icon__active {
  transform: rotate(45deg);
}
</style>
<script>
import FoldersSubList from './FoldersSubList.vue'
export default {
  components: {
    FoldersSubList
  },
  props: {
    selected: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    },
    selectedName: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
    selectItem(item) {
      this.selected.id = item.id
    },
    openList(e, item) {
      item.opened = !item.opened
    }
  }
}
</script>
