<template>
  <div class="product-page">
    <h2 class="page__title" :title="headerData.name">{{ headerData.name }}</h2>
    <div class="product-page__content">
      <div class="header">
        <x-img :src="imageUrl" />
        <div class="header__info">
          <div class="header__bold">{{ headerData.name }}</div>
          <div class="header__text">
            Артикул
            <span class="header__text__big">&nbsp;WB</span>
            :&nbsp;
            <span class="header__text__long">{{ headerData.id }}</span>
            <!-- <a class="header__link" :href="headerData.mp_product_url" target="_blank">
            <p-icon name="link" viewBox="0 0 16 16" />
          </a> -->
          </div>
          <div class="header__text">Бренд: {{ headerData.brand_name }}</div>
          <div class="header__text">
            Продавец:&nbsp;
            <span class="header__text__long">{{ headerData.seller_name }}</span>
          </div>
          <div class="header__text">Обновлён: {{ new Date().toLocaleDateString() }}</div>
          <div class="header__text">Всего отзывов: {{ headerData.reviews_cnt }}</div>
          <div class="rating">
            <span class="rating__icon">
              ★★★★★
              <span class="rating__icon_active" :style="{ width: `${calcWidth}%` }">★★★★★</span>
            </span>
            <span class="rating__semibold">{{ headerData.rating }} / 5</span>
            <span class="rating__description">({{ headerData.reviews_cnt }} отзывов)</span>
          </div>
        </div>
        <div class="header__price">
          <div class="header__row header__row_main">
            <div class="header__semibold">Текущая цена</div>
            <div class="header__price__value">
              <span>{{ headerData.price.toLocaleString('ru') }}</span>
              &nbsp;руб
            </div>
          </div>
          <div class="header__row">
            <div class="header__text">Розничная цена</div>
            <div class="header__doted"></div>
            <div class="header__text">
              <span>{{ headerData.price.toLocaleString('ru') }}</span>
              &nbsp;руб
            </div>
          </div>
          <div class="header__row">
            <div class="header__text">Скидка {{ headerData.discount.toLocaleString('ru') }}%</div>
            <div class="header__doted"></div>
            <div class="header__text">
              <span>{{ percentagePrice }}</span>
              &nbsp;руб
            </div>
          </div>
          <div class="header__row">
            <div class="header__text">Промокод {{ headerData.promo_code_discount.toLocaleString('ru') }}%</div>
            <div class="header__doted"></div>
            <div class="header__text">
              <span>{{ percentagePricePromocode }}</span
              >&nbsp;руб
            </div>
          </div>
        </div>
      </div>
      <div class="banners">
        <info-banner
          class="tooltip__slightly__right"
          :title="'Продажи, шт'"
          :value="headerData.sales_cnt"
          :profit="headerData.sales_delta"
          :preloader="bannersPreloader"
          :text="`Количество продаж за ${datePeriod}`"
        />
        <info-banner
          :title="'Остатки, шт'"
          :value="headerData.quantity_cnt"
          :profit="0"
          :preloader="bannersPreloader"
          :text="'Товарные остатки на текущий момент'"
        />
        <info-banner
          :title="'Выручка, руб'"
          :value="headerData.proceeds"
          :profit="headerData.proceeds_delta"
          :preloader="bannersPreloader"
          :text="`Общая выручка за ${datePeriod}`"
        />
        <info-banner
          :title="'Упущенная выручка, руб'"
          :value="headerData.lost_proceeds"
          :profit="headerData.lost_proceeds_delta"
          :preloader="bannersPreloader"
          :text="`Упущенная выручка на текущий момент`"
        />
      </div>
      <div class="tabs product__page__tabs">
        <x-tabs :tabs="tabs" :selected="$route.meta.tab" @change="selectTab" />
      </div>
      <div class="product__page__hint">
        <page-hint :text="hintText"></page-hint>
      </div>
      <div class="grid__row">
        <div class="row__item">
          <div class="label">Выбрать период</div>
          <select class="select" v-model="selectedPeriod">
            <option v-for="item in periodsList" :value="item" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :filters="filters" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
import InfoBanner from './InfoBanner.vue'
import XImg from './XImg.vue'
import PIcon from '@/elements/p-icon/PIcon.vue'
import XTabs from './XTabs.vue'
import PageHint from './PageHint.vue'
import { productTabs } from '@/constants/index'
import { mapState } from 'vuex'

const start = new Date()
const end = new Date()
start.setMonth(start.getMonth(), Intl.DateTimeFormat('ru').format(start).replace(/\./g, '-').split('-')[0] - 6)

end.setMonth(end.getMonth(), Intl.DateTimeFormat('ru').format(end).replace(/\./g, '-').split('-')[0])

export default {
  components: {
    InfoBanner,
    XImg,
    PIcon,
    XTabs,
    PageHint
  },
  data() {
    return {
      defaultPickerAction: 'seven',
      bannersPreloader: false,
      defaultData: {
        id: 0,
        name: '',
        price: 0,
        count: '0',
        image: '',
        brand_name: '',
        seller_name: '',
        rating: 0,
        reviews_cnt: 0,
        discount: 0,
        promo_code_discount: 0,
        sales_cnt: 0,
        sales_delta: 0,
        quantity_cnt: 0,
        proceeds: 0,
        proceeds_delta: 0,
        lost_proceeds: 0,
        lost_proceeds_delta: 0
      },
      tabs: productTabs,
      selectedPeriod: {
        id: 'seven',
        name: '7 дней',
        days: 6
      },
      periodsList: [
        {
          id: 'seven',
          name: '7 дней',
          days: 6
        },
        {
          id: 'fourteen',
          name: '14 дней',
          days: 13
        }
      ],
      filters: {
        period: {
          start,
          end
        }
      }
    }
  },
  watch: {
    selectedPeriod(val) {
      const currentDate = new Date()
      currentDate.setMonth(
        currentDate.getMonth(),
        Intl.DateTimeFormat('ru').format(currentDate).replace(/\./g, '-').split('-')[0] - val.days
      )
      this.filters = { ...this.filters, ...{ period: { start: currentDate, end } } }
      this.defaultPickerAction = val.id
    }
  },
  computed: {
    ...mapState('moduleStore', ['productList']),
    headerData() {
      const elem = this.productList.find((el) => el.id === +this.$route.params.id)
      return elem ? elem : this.defaultData
    },
    percentagePrice() {
      return Math.round(this.headerData.price - this.headerData.discount * (1 / 100) * this.headerData.price).toLocaleString('ru')
    },
    percentagePricePromocode() {
      const price = this.headerData.price - this.headerData.promo_code_discount * (1 / 100) * this.headerData.price
      return Math.round(price).toLocaleString('ru')
    },
    hintText() {
      return this.tabs.find((el) => el.id === this.$route.meta.tab)?.text
    },
    imageUrl() {
      return this.headerData.image?.replace(/"/g, '')
    },
    calcWidth() {
      return (100 / 5) * this.headerData.rating
    },
    datePeriod() {
      switch (this.defaultPickerAction) {
        case 'seven':
          return '7 дней'
        case 'fourteen':
          return '14 дней'
        // case 'THIRTY':
        //   return '30 дней'
        // case 'NINETY':
        //   return '90 дней'
        // case 'OTHER':
        //   return `${Intl.DateTimeFormat('ru').format(this.filters.period?.start)} - ${Intl.DateTimeFormat('ru').format(
        //     this.filters.period?.end
        //   )}`
      }
      return ''
    }
  },
  methods: {
    selectTab(tabId) {
      this.$router.push(tabId)
    },
    formatDate(date, separator) {
      return Intl.DateTimeFormat('ru').format(date).replace(/\./g, separator)
    }
  },
  created() {
    document.title = this.headerData.name
  }
}
</script>

<style scoped>
.product-page {
  max-width: 1300px;
  margin: 0 auto;
}

.page__title {
  font-size: 40px;
  max-width: 1000px;
  margin: 0 auto 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.product-page__content {
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 10px 21px 43px rgb(0 0 0 / 30%);
}

.header {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.header__info {
  padding: 0 20px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 1px;
  min-width: 300px;
}

.header__bold {
  color: #333;
  line-height: 20px;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 600;
}

.header__text {
  color: #7b7b85;
  font-size: 14px;
  display: flex;
  margin-bottom: 5px;
}

.header__text__big {
  text-transform: uppercase;
}

.p-icon {
  width: 16px;
  height: 16px;
}

.header__text span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100px;
}

.header__text .header__text__long {
  max-width: 100%;
}

.header__link {
  color: grey;
  cursor: pointer;
  margin: 0 9px 0 5px;
}

.name__link {
  color: grey;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.rating {
  font-size: 25px;
  display: flex;
  align-items: center;
  height: 30px;
}

.rating__icon {
  position: relative;
  padding-bottom: 6px;
  color: #ccc;
}

.rating__icon_active {
  position: absolute;
  top: 0;
  left: 0;
  color: #ffc539;
  overflow: hidden;
}

.rating__semibold {
  color: grey;
  margin: 0 8px;
  font-size: 14px;
  line-height: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.rating__semibold_path {
  margin-left: 4px;
  margin-right: 0;
}

.rating__description {
  font-size: 12px;
  color: grey;
  white-space: nowrap;
}

.header__path {
  padding: 0 8px 0 6px;
  display: inline-flex;
  align-items: center;
  height: 28px;
  border-radius: 4px;
  border: 1px solid grey;
  margin-top: auto;
  align-self: start;
  max-width: 100%;
}

.header__price {
  padding-left: 20px;
  border-left: 1px solid #e5e5e9;
  width: 274px;
  height: 138px;
}

@media (max-width: 960px) {
  .header__info {
    flex-grow: 1;
    padding-right: 0;
  }

  .header__price {
    margin-top: 20px;
    padding-left: 0;
    border-left: none;
  }
}

@media (max-width: 670px) {
  .header {
    flex-direction: column;
    align-items: center;
  }

  .x-img {
    margin-bottom: 20px;
  }

  .header__info {
    padding-left: 0;
    min-width: auto;
    width: 100%;
  }

  .header__price {
    height: auto;
    width: 100%;
    min-width: auto;
  }
}

.header__row {
  display: flex;
  align-items: center;
}

.header__row_main {
  padding-bottom: 8px;
  border-bottom: 2px solid #e5e5e9;
  margin-bottom: 8px;
}

.header__semibold {
  color: grey;
  font-size: 16px;
  line-height: 20px;
  white-space: nowrap;
}

.header__price__value {
  margin-left: auto;
  color: #333;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  display: flex;
}

.header__price__value span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 10px;
  max-width: 130px;
}

.header__doted {
  flex-grow: 1;
  border-bottom: 1px dashed grey;
  height: 8px;
}

.banners {
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  grid-gap: 12px;
  margin-bottom: 28px;
}

@media (max-width: 992px) {
  .banners {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
}

@media (max-width: 576px) {
  .banners {
    grid-template-columns: minmax(200px, 1fr);
  }
}

.product__page__tabs {
  margin-bottom: 6px;
}

@media (max-width: 576px) {
  .product__page__tabs {
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #ccc #fff;
  }

  .product__page__tabs::-webkit-scrollbar {
    height: 7px;
  }
  .product__page__tabs::-webkit-scrollbar-thumb {
    border: 1px solid #fff;
    background: #b6b6b6;
    border-radius: 20px;
  }
}

.product__page__hint {
  margin-bottom: 12px;
}

.select {
  height: 35px;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  border: 1px solid #ccc;
  margin-left: 10px;
  font-size: 15px;
  background: #f8f8f8;
  padding: 0 5px;
  cursor: pointer;
  margin: 0;
  width: 100%;
}

.label__fake {
  height: 14px;
  margin-bottom: 7px;
}

.fbs__switcher {
  height: 35px;
}

.grid__row {
  display: grid;
  grid-template-columns: minmax(240px, 300px) auto;
  grid-gap: 12px;
  grid-auto-rows: auto;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .grid__row {
    grid-template-columns: 1fr;
  }
}

.label {
  font-size: 12px;
  letter-spacing: 0.7px;
  color: #7b7b85;
  margin-bottom: 8px;
}

.product-page:deep(.x-chart) {
  margin-bottom: 40px;
}

.product-page:deep(.names__container) {
  width: auto;
}
</style>
