
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { DirectMode, CircleMode, DragCircleMode } from 'mapbox-gl-draw-circle'
import FreehandMode from 'mapbox-gl-draw-freehand-mode'
// import 'maplibre-gl/dist/maplibre-gl.css'
import { v4 as uuidv4 } from 'uuid'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@/assets/mapbox-style.css'
// import API from '@/api'

// process.env.GEOCODER_API_PROXY_URI
// process.env.MAP_STYLES_API_PROXY_URI
const list = JSON.parse('[{"place_id":1,"lat":55.75144,"lon":37.61763,"display_name":"город Москва","address":{"country":"Россия","region":"город федерального значения Москва","state":" "}},{"place_id":2,"lat":55.80775,"lon":37.44606,"display_name":"канал им. Москвы","address":{"country":"Россия","region":"город федерального значения Москва","state":" "}},{"place_id":3,"lat":55.80093,"lon":37.6268,"display_name":"район Алексеевский","address":{"country":"Россия","region":"город федерального значения Москва","state":"Северо-Восточный административный округ"}},{"place_id":4,"lat":55.8785496199872,"lon":37.5598141488142,"display_name":"Район Восточное Дегунино, улица 800-летия Москвы 26, корп. 2","address":{"country":"Россия","region":"г. Москва","state":"Восточное Дегунино"}},{"place_id":5,"lat":55.8815956370814,"lon":37.5642315079418,"display_name":"Район Восточное Дегунино, улица 800-летия Москвы 11, корп. 1","address":{"country":"Россия","region":"г. Москва","state":"Восточное Дегунино"}},{"place_id":6,"lat":55.8789762531098,"lon":37.5543915847695,"display_name":"Район Восточное Дегунино, улица 800-летия Москвы 20","address":{"country":"Россия","region":"г. Москва","state":"Восточное Дегунино"}},{"place_id":7,"lat":55.8841990032051,"lon":37.5634210789498,"display_name":"Район Восточное Дегунино, улица 800-летия Москвы 11, корп. 7","address":{"country":"Россия","region":"г. Москва","state":"Восточное Дегунино"}},{"place_id":8,"lat":55.8808063072593,"lon":37.5628330449574,"display_name":"Район Восточное Дегунино, улица 800-летия Москвы 9","address":{"country":"Россия","region":"г. Москва","state":"Восточное Дегунино"}},{"place_id":9,"lat":55.700827817023,"lon":37.9191066137706,"display_name":"район Некрасовка, проспект Защитников Москвы 9, корп. 1","address":{"country":"Россия","region":"г. Москва","state":"Некрасовка"}},{"place_id":10,"lat":56.9156917502156,"lon":32.165019,"display_name":"деревня Москва, без типа деревня Москва 14","address":{"country":"Россия","region":"Тверская область","state":"Пеновский муниципальный округ"}},{"place_id":11,"lat":55.8833279716534,"lon":37.5624330576721,"display_name":"Район Восточное Дегунино, улица 800-летия Москвы 11, корп. 8","address":{"country":"Россия","region":"г. Москва","state":"Восточное Дегунино"}},{"place_id":12,"lat":55.6994903433994,"lon":37.9169676173743,"display_name":"район Некрасовка, проспект Защитников Москвы 5","address":{"country":"Россия","region":"г. Москва","state":"Некрасовка"}},{"place_id":13,"lat":55.8795620480552,"lon":37.5627392542393,"display_name":"Район Восточное Дегунино, улица 800-летия Москвы 28, корп. 1","address":{"country":"Россия","region":"г. Москва","state":"Восточное Дегунино"}},{"place_id":14,"lat":55.8806309733097,"lon":37.5490421537991,"display_name":"Район Восточное Дегунино, улица 800-летия Москвы 1, корп. 4","address":{"country":"Россия","region":"г. Москва","state":"Восточное Дегунино"}}]')

const props = defineProps({
  modelValue: {
    type: [Object, String],
    default: null
  },
  field: {
    type: Object,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const map = ref(null)
const mode = ref('simple_select')
const id = uuidv4()
const mapRef = ref()
const selectedFeatureId = ref(null)
const allFeatures = ref({
  type: 'FeatureCollection',
  features: [],
  marker_coords: null
})
let watchTimeout = null
const searchValue = ref(null)
const findedInputValue = ref({})
const markers = {
  mainMarker: null,
  bySearch: null
}
const mapDraw = new MapboxDraw({
  userProperties: true,
  displayControlsDefault: false,
  controls: {
    trash: false
  },
  modes: {
    ...MapboxDraw.modes,
    draw_polygon: FreehandMode,
    draw_circle: CircleMode,
    drag_circle: DragCircleMode,
    direct_select: DirectMode
  }
})


class DrawGroupControl {
  onAdd(map) {
    this.map = map
    const div = document.createElement('div')
    div.className = 'mapboxgl-ctrl-group mapboxgl-ctrl'

    const circleBtn = document.createElement('button')
    circleBtn.className = 'mapbox-gl-draw_circle draw_circle'
    circleBtn.title = 'Circle draw'

    const polygonBtn = document.createElement('button')
    polygonBtn.className = 'mapbox-gl-draw_polygon draw_polygon'
    polygonBtn.title = 'Polygon draw'

    const lineBtn = document.createElement('button')
    lineBtn.className = 'mapbox-gl-draw_line draw_line_string'
    lineBtn.title = 'Linestring draw'

    const pointBtn = document.createElement('button')
    pointBtn.className = 'mapbox-gl-draw_point draw_point'
    pointBtn.title = 'Points draw'

    circleBtn.addEventListener('click', (event) => {
      event.preventDefault()

      mode.value = mode.value === 'draw_circle' ? 'simple_select' : 'draw_circle'
    })

    polygonBtn.addEventListener('click', (event) => {
      event.preventDefault()

      mode.value = mode.value === 'draw_polygon' ? 'simple_select' : 'draw_polygon'
    })

    lineBtn.addEventListener('click', (event) => {
      event.preventDefault()

      mode.value = mode.value === 'draw_line_string' ? 'simple_select' : 'draw_line_string'
    })

    pointBtn.addEventListener('click', (event) => {
      event.preventDefault()

      mode.value = mode.value === 'draw_point' ? 'simple_select' : 'draw_point'
    })

    div.appendChild(circleBtn)
    div.appendChild(polygonBtn)
    div.appendChild(lineBtn)
    div.appendChild(pointBtn)

    this.container = div
    return this.container
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }
}

onMounted(() => {
  // mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY
  map.value = new mapboxgl.Map({
    container: id,
    style: import.meta.env.VITE_MAP_STYLE, // stylesheet location
    center: [37.617698, 55.755864],
    zoom: 9
  })

  removeBottomLinks()

  map.value.addControl(new mapboxgl.FullscreenControl())
  if (props.field.props?.polygons) {
    map.value.addControl(new DrawGroupControl())
    mapDraw.options.controls.trash = true
  }

  map.value.addControl(mapDraw)

  if (props.modelValue) {
    allFeatures.value = props.modelValue

    if (allFeatures.value.marker_coords?.length) {
      setMarker('mainMarker', allFeatures.value.marker_coords[0], allFeatures.value.marker_coords[1])
    }

    mapDraw.add(allFeatures.value)
  }

  map.value.on('click', () => {
    selectedFeatureId.value = mapDraw.getSelected().features[0]?.id

    if (!selectedFeatureId.value) setAllMapPoints()
  })

  map.value.on('draw.modechange', (e) => {
    mode.value = e.mode
    setAllMapPoints()
  })

  map.value.on('draw.update', setAllMapPoints)
  map.value.on('draw.create', setAllMapPoints)
  map.value.on('draw.delete', setAllMapPoints)
  if (props.field.props.address) {
    map.value.on('dblclick', function(e) {
      e.preventDefault()
      allFeatures.value.marker_coords = [e.lngLat.lng, e.lngLat.lat]
      setMarker('mainMarker', e.lngLat.lng, e.lngLat.lat)
    })
  }
})

watch(allFeatures, (val) => {
  clearTimeout(watchTimeout)

  watchTimeout = setTimeout(() => {
    emit('update:modelValue', JSON.stringify(val))
  }, 1000)
}, { deep: true })

watch(mode, (val) => {
  mapDraw.changeMode(val, { selectedFeatureId: selectedMapObject.value.id })

  const button = mapRef.value.querySelector(`.${val}`)
  const active = mapRef.value.querySelector('.active')

  if (button) {
    if (active) active.classList.remove('active')
    button.classList.add('active')
  } else {
    if (active) active.classList.remove('active')
  }
})

function removeBottomLinks() {
  const container = mapRef.value.querySelector('.mapboxgl-ctrl-bottom-right')
  if (container) container.innerHTML = ''
}

function setAllMapPoints() {
  allFeatures.value.type =  mapDraw.getAll().type
  allFeatures.value.features =  mapDraw.getAll().features
}

function setMarker(key, lon, lat) {
  if (markers[key]) markers[key].remove()

  if (mode.value === 'simple_select') {
    const color = key === 'mainMarker' ? '#07f' : ''
    markers[key] = new mapboxgl.Marker({ color, draggable: false }).setLngLat([lon, lat]).addTo(map.value)

    map.value.flyTo({ center: [lon, lat], zoom: 11 })

    markers[key].getElement().addEventListener('click', function() {
      this.remove()
      if (key !== 'bySearch') allFeatures.value.marker_coords = null
    })
  }
}

function onSearchFocus() {
  mode.value = 'simple_select'
  selectedFeatureId.value = null
}

const selectedMapObject = computed(() => {
  return allFeatures.value.features.find(el => el.id === selectedFeatureId.value) || {}
})

const mapObjectName = computed({
  get() {
    return selectedMapObject.value.properties.title
  },
  set(val) {
    selectedMapObject.value.properties.title = val
    mapDraw.add(allFeatures.value)
  }
})

const mapObjectDescription = computed({
  get() {
    return selectedMapObject.value.properties.description
  },
  set(val) {
    selectedMapObject.value.properties.description = val
    mapDraw.add(allFeatures.value)
  }
})

function remoteMethod(val) {
  searchValue.value = val.trim() || null
}

const searchedList = computed(() => {
  return list.filter((item) => item.display_name.toLowerCase().includes(searchValue.value?.toLowerCase()))
})

const selectedAddress = computed({
  get() {
    return  findedInputValue.value
  },
  set(val) {
    if (val) {
      setMarker('bySearch', val.lon, val.lat)
    } else {
      if (markers.bySearch) markers.bySearch.remove()
    }

    findedInputValue.value = val || {}
  }
})

const addressByPoint = computed(() => {
  const randomIndex = Math.round(Math.random() * list.length)

  return allFeatures.value.marker_coords ? list[randomIndex]?.display_name : ''
})
</script>

<template>
  {{ mode }}
  <div :id="id" class="relative w-full" style="height: 500px;" ref="mapRef">
    <div class="flex flex-col gap-3 absolute top-3 left-3 w-96 z-10">
      <el-select
        v-if="field.props.search"
        v-model="selectedAddress"
        placeholder="Поиск"
        value-key="place_id"
        class="w-full"
        filterable
        reserve-keyword
        remote
        clearable
        :remote-method="remoteMethod"
        :teleported="false"
        :loading="false"
        @focus="onSearchFocus"
      >
        <el-option
          v-for="item in searchedList"
          class="!h-14 !leading-normal"
          :value="item"
          :label="item.display_name"
          :key="item.place_id"
          >
          <div class="flex flex-col justify-center h-full">
            <div class="font-semibold">{{ item.display_name }}</div>
            <div class="text-xs">{{ `${item.address.country}, ${item.address.region}` }}</div>
          </div>
        </el-option>
      </el-select>
      <el-input
        v-if="field.props.address"
        :model-value="addressByPoint"
        class="address-name"
        :class="{ 'address-name__value': addressByPoint }"
        placeholder="Название по точке"
        disabled
        :title="addressByPoint"
      />
    </div>
    <div v-if="selectedMapObject.id" class="absolute left-2 bottom-2 bg-slate-50 rounded-md w-80 px-4 pt-4 pb-6 shadow-lg z-10">
      <div class="leading-none mb-2">Название объекта</div>
      <el-input v-model="mapObjectName" class="mb-3" placeholder="Название объекта" />
      <div class="leading-none mb-2">Описание</div>
      <el-input
        v-model="mapObjectDescription"
        type="textarea"
        resize="none"
        :rows="5"
        placeholder="Описание"
      />
    </div>
    <div v-if="disabled" class="absolute inset-0 bg-black/10 z-10 cursor-not-allowed" />
  </div>
</template>

<style scoped>
  .address-name:deep(.el-input__wrapper) {
    background: #fff;
  }

  .address-name__value:deep(.el-input__inner) {
    color: #606266;
    -webkit-text-fill-color: #606266;
  }
</style>
