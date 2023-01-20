const randomNum = Math.random() < 0.5 ? -1 : 1

const storeModule = {
  state: () => ({
    cartList: JSON.parse(localStorage.getItem('storage_cart_list')) || [],
    productList: [
      {
        id: 46289640,
        name: 'Робот-пылесос Mi Robot Mop 2 Lite RU',
        price: 12300,
        count: '1',
        image: require('@/assets/img/shop_1.jpg'),
        brand_name: 'Xiaomi',
        seller_name: 'WB',
        rating: 3.7,
        reviews_cnt: 1371,
        discount: 30,
        promo_code_discount: 13,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      },
      {
        id: 36129640,
        name: 'Фитнес-браслет Mi Band 6',
        price: 1995,
        count: '1',
        image: require('@/assets/img/shop_2.jpg'),
        brand_name: 'Xiaomi',
        seller_name: 'WB',
        rating: 4.7,
        reviews_cnt: 2171,
        discount: 20,
        promo_code_discount: 5,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      },
      {
        id: 16129246,
        name: 'Консоль PS5 Disk Edition 825 ГБ (CFI-1100A)',
        price: 52191,
        count: '1',
        image: require('@/assets/img/shop_3.jpg'),
        brand_name: 'Sony',
        seller_name: 'WB',
        rating: 5,
        reviews_cnt: 3171,
        discount: 10,
        promo_code_discount: 0,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      },
      {
        id: 56523341,
        name: 'Смартфон С31 4/64Gb:6.5/ HD+/ NFC/5000mA',
        price: 8953,
        count: '1',
        image: require('@/assets/img/shop_4.jpg'),
        brand_name: 'realme',
        seller_name: 'WB',
        rating: 2.5,
        reviews_cnt: 500,
        discount: 0,
        promo_code_discount: 0,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      },
      {
        id: 26413647,
        name: 'Samsung Galaxy Watch5 Pro',
        price: 23793,
        count: '1',
        image: require('@/assets/img/shop_5.jpg'),
        brand_name: 'samsung',
        seller_name: 'WB',
        rating: 4.8,
        reviews_cnt: 1230,
        discount: 5,
        promo_code_discount: 2,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      },
      {
        id: 17488687,
        name: 'Кофемашина ECAM350.35.W',
        price: 45812,
        count: '1',
        image: require('@/assets/img/shop_6.jpg'),
        brand_name: 'ECAM',
        seller_name: 'WB',
        rating: 4.5,
        reviews_cnt: 2230,
        discount: 12,
        promo_code_discount: 3,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      },
      {
        id: 17481687,
        name: 'Шлифмашина эксцентриковая сетевая DEKO DKG400-125, 063-2203',
        price: 1789,
        count: '1',
        image: require('@/assets/img/shop_7.jpg'),
        brand_name: 'DEKO',
        seller_name: 'WB',
        rating: 3.7,
        reviews_cnt: 230,
        discount: 2,
        promo_code_discount: 0,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      },
      {
        id: 47448217,
        name: 'Наушники HUAWEI FreeBuds Pro 2',
        price: 14249,
        count: '1',
        image: require('@/assets/img/shop_8.jpg'),
        brand_name: 'HUAWEI',
        seller_name: 'WB',
        rating: 5,
        reviews_cnt: 40,
        discount: 22,
        promo_code_discount: 10,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      },
      {
        id: 77743227,
        name: 'Микроволновая печь Gorenje MO20E1W2',
        price: 4283,
        count: '1',
        image: require('@/assets/img/shop_9.jpg'),
        brand_name: 'Gorenje',
        seller_name: 'WB',
        rating: 4,
        reviews_cnt: 600,
        discount: 0,
        promo_code_discount: 0,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      },
      {
        id: 97145242,
        name: 'Корпус для компьютера ZALMAN ZM-T4',
        price: 8309,
        count: '1',
        image: require('@/assets/img/shop_10.jpg'),
        brand_name: 'ZALMAN',
        seller_name: 'WB',
        rating: 5,
        reviews_cnt: 10,
        discount: 10,
        promo_code_discount: 20,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      },
      {
        id: 97345242,
        name: 'Мультиварка-скороварка Midea MPC-6002',
        price: 5449,
        count: '1',
        image: require('@/assets/img/shop_11.jpg'),
        brand_name: 'Midea',
        seller_name: 'WB',
        rating: 5,
        reviews_cnt: 467,
        discount: 20,
        promo_code_discount: 10,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      },
      {
        id: 17145242,
        name: 'Кухонный комбайн BOSCH MUMS2TW00',
        price: 14350,
        count: '1',
        image: require('@/assets/img/shop_12.jpg'),
        brand_name: 'BOSCH',
        seller_name: 'WB',
        rating: 5,
        reviews_cnt: 27,
        discount: 10,
        promo_code_discount: 2,
        sales_cnt: Math.floor(Math.random() * 1000),
        sales_delta: Math.floor(Math.random() * 100 * randomNum),
        quantity_cnt: Math.floor(Math.random() * 1000),
        proceeds: Math.floor(Math.random() * 40000000),
        proceeds_delta: Math.floor(Math.random() * 100 * randomNum),
        lost_proceeds: Math.floor(Math.random() * 1000000),
        lost_proceeds_delta: Math.floor(Math.random() * 100 * randomNum)
      }
    ],
    cartCount: 0,
    search: '',
    filter: 'random',
    //  view: window.innerWidth > 590 ? 'tile' : 'list'
    view: 'tile'
  }),
  getters: {
    totalCount(state) {
      return state.cartList.reduce((acc, item) => (acc += +item.count), 0)
    },
    totalPrice(state) {
      return state.cartList.reduce((acc, item) => (acc += +item.price * +item.count), 0)
    },
    sortedList(state) {
      if (state.filter == 'decreasing') {
        return [...state.productList].sort((a, b) => +b.price - +a.price)
      } else if (state.filter == 'ascending') {
        return [...state.productList].sort((a, b) => +a.price - +b.price)
      } else {
        return state.productList
      }
    },
    searchedList(state, { sortedList }) {
      return sortedList.filter((el) => el.name.toLowerCase().includes(state.search.toLowerCase()))
    }
  },
  mutations: {
    addToCart(state, product) {
      state.cartList.push({ ...product })
      localStorage.setItem('storage_cart_list', JSON.stringify(state.cartList))
    },
    removeFromCart(state, product_id) {
      state.cartList = state.cartList.filter((el) => el.id !== product_id)
      localStorage.setItem('storage_cart_list', JSON.stringify(state.cartList))
    },
    minus(state, product_id) {
      const elem = state.cartList.find((el) => el.id === product_id)
      elem.count = +elem.count
      elem.count--
      elem.count = Math.min(Math.max(1, elem.count), 10)
      localStorage.setItem('storage_cart_list', JSON.stringify(state.cartList))
    },
    plus(state, product_id) {
      const elem = state.cartList.find((el) => el.id === product_id)
      elem.count = +elem.count
      elem.count++
      elem.count = Math.min(Math.max(1, elem.count), 10)
      localStorage.setItem('storage_cart_list', JSON.stringify(state.cartList))
    },
    searchList(state, search_value) {
      state.search = search_value
    },
    sortList(state, filter_param) {
      state.filter = filter_param
    },
    changeView(state, view_param) {
      state.view = view_param
    }
  }
}

export default storeModule
