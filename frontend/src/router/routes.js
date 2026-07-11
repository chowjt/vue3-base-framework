const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '登录', guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { title: '注册', guest: true }
  },
  {
    path: '/home',
    name: 'UserHome',
    component: () => import('@/views/UserHomeView.vue'),
    meta: { title: '我的故乡', requiresAuth: true }
  },
  {
    path: '/cloud-sea',
    name: 'CloudSea',
    component: () => import('@/views/banner/CloudSeaView.vue'),
    meta: { title: '云海漫群山' }
  },
  {
    path: '/ancient-town',
    name: 'AncientTown',
    component: () => import('@/views/banner/AncientTownView.vue'),
    meta: { title: '千年古镇' }
  },
  {
    path: '/lake-sunset',
    name: 'LakeSunset',
    component: () => import('@/views/banner/LakeSunsetView.vue'),
    meta: { title: '湖光落日' }
  },
  {
    path: '/cave-wonder',
    name: 'CaveWonder',
    component: () => import('@/views/banner/CaveWonderView.vue'),
    meta: { title: '溶洞奇观' }
  },
  {
    path: '/alpine-meadow',
    name: 'AlpineMeadow',
    component: () => import('@/views/banner/AlpineMeadowView.vue'),
    meta: { title: '高山草甸' }
  },
  {
    path: '/consult-hotline',
    name: 'ConsultHotline',
    component: () => import('@/views/footer/items/play-services/ConsultHotlineView.vue'),
    meta: { title: '景区咨询热线' }
  },
  {
    path: '/self-drive-guide',
    name: 'SelfDriveGuide',
    component: () => import('@/views/footer/items/play-services/SelfDriveGuideView.vue'),
    meta: { title: '自驾路线导航指南' }
  },
  {
    path: '/team-booking',
    name: 'TeamBooking',
    component: () => import('@/views/footer/items/play-services/TeamBookingView.vue'),
    meta: { title: '团队团建预约' }
  },
  {
    path: '/ticket-query',
    name: 'TicketQuery',
    component: () => import('@/views/footer/items/play-services/TicketQueryView.vue'),
    meta: { title: '景区票务查询' }
  },
  {
    path: '/opening-hours',
    name: 'OpeningHours',
    component: () => import('@/views/footer/items/tourism-news/OpeningHoursView.vue'),
    meta: { title: '景区开放时间公示' }
  },
  {
    path: '/holiday-events',
    name: 'HolidayEvents',
    component: () => import('@/views/footer/items/tourism-news/HolidayEventsView.vue'),
    meta: { title: '节假日活动预告' }
  },
  {
    path: '/folk-festivals',
    name: 'FolkFestivals',
    component: () => import('@/views/footer/items/tourism-news/FolkFestivalsView.vue'),
    meta: { title: '民俗节庆安排' }
  },
  {
    path: '/scenic-news',
    name: 'ScenicNews',
    component: () => import('@/views/footer/items/tourism-news/ScenicNewsView.vue'),
    meta: { title: '景区最新动态' }
  },
  {
    path: '/seasonal-guide',
    name: 'SeasonalGuide',
    component: () => import('@/views/footer/items/play-guide/SeasonalGuideView.vue'),
    meta: { title: '四季游玩推荐' }
  },
  {
    path: '/photo-spots',
    name: 'PhotoSpots',
    component: () => import('@/views/footer/items/play-guide/PhotoSpotsView.vue'),
    meta: { title: '网红打卡机位' }
  },
  {
    path: '/food-stay',
    name: 'FoodStay',
    component: () => import('@/views/footer/items/play-guide/FoodStayView.vue'),
    meta: { title: '美食民宿汇总' }
  },
  {
    path: '/hiking-routes',
    name: 'HikingRoutes',
    component: () => import('@/views/footer/items/play-guide/HikingRoutesView.vue'),
    meta: { title: '徒步登山路线' }
  },
  {
    path: '/official-email',
    name: 'OfficialEmail',
    component: () => import('@/views/footer/items/contact-us/OfficialEmailView.vue'),
    meta: { title: '官方邮箱' }
  },
  {
    path: '/complaint-feedback',
    name: 'ComplaintFeedback',
    component: () => import('@/views/footer/items/contact-us/ComplaintFeedbackView.vue'),
    meta: { title: '游客投诉反馈通道' }
  },
  {
    path: '/douyin-account',
    name: 'DouyinAccount',
    component: () => import('@/views/footer/items/contact-us/DouyinAccountView.vue'),
    meta: { title: '抖音官方风景账号' }
  },
  {
    path: '/cooperation',
    name: 'Cooperation',
    component: () => import('@/views/footer/items/contact-us/CooperationView.vue'),
    meta: { title: '文旅合作洽谈' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' }
  }
]

export default routes
