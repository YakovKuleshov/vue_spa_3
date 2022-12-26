<template>
  <div class="x-select" tabindex="0" @click="showList = !showList" @blur="showList = false">
    <span>{{ selectValue }}</span>
    <div class="x-select__arrow" :class="{ 'x-select__arrow_active': showList }"></div>
    <div v-if="modelValue.id" class="x-select__reset" @click.stop="selectPosition({})"></div>
    <div class="x-select__dropdown" :class="{ 'x-select__dropdown_active': showList }">
      <div
        v-for="item in list"
        class="x-select__item"
        :class="{ 'x-select__item_active': modelValue.id === item.id }"
        :key="item.id"
        @click="selectPosition(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showList: false
    }
  },
  methods: {
    selectPosition(item) {
      this.$emit('update:modelValue', item)
    }
  },
  computed: {
    selectValue() {
      return this.modelValue.name || 'All positions'
    }
  }
}
</script>

<style scoped>
.x-select {
  position: relative;
  height: 50px;
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 0 80px 0 20px;
  display: flex;
  align-items: center;
  max-width: 300px;
  cursor: pointer;
}

.x-select span {
  font-size: 19px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.x-select__arrow {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%) rotateZ(45deg);
  width: 13px;
  height: 13px;
  border-bottom: 2px solid var(--color);
  border-right: 2px solid var(--color);
  border-radius: 2px;
  transition: transform 0.3s;
}

.x-select__arrow_active {
  transform: translateY(-50%) rotateZ(225deg);
}

.x-select__reset {
  position: absolute;
  top: 50%;
  right: 45px;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  background: #dadada;
  box-shadow: 2px 2px 4px 2px rgb(0 0 0 / 18%) inset;
  border-radius: 50%;
  cursor: pointer;
}

.x-select__reset:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(45deg);
  width: 15px;
  height: 2px;
  background: #5c5c5c;
}

.x-select__reset:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(-45deg);
  width: 15px;
  height: 2px;
  background: #5c5c5c;
}

.x-select__dropdown {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background: var(--bg);
  box-shadow: var(--shadow);
  transform: translateY(20px);
  border-radius: 8px;
  z-index: 10;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.5s, transform 0.5s, opacity 0.5s;
  cursor: default;
}

.x-select__dropdown_active {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

.x-select__item {
  padding: 15px 20px;
  transition: 0.2s;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}

.x-select__item_active {
  background: tomato;
  color: #cedbdc;
  pointer-events: none;
}
</style>
