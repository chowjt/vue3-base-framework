<template>
  <div class="home-view">
    <!-- 导航栏 -->
    <header
      id="navHeader"
      :class="{ active: headerActive }"
    >
      <div class="logo">
        故乡山水
      </div>
      <ul class="nav-menu">
        <li><a href="#banner">首页</a></li>
        <li><a href="#about">家乡简介</a></li>
        <li><a href="#spot">景点推荐</a></li>
        <li><a href="#season">四季风光</a></li>
        <li><a href="#folk">人文民俗</a></li>
        <li><a href="#food">特色美食</a></li>
        <li><a href="#souvenir">特产伴手礼</a></li>
        <li><a href="#homestay">民宿住宿</a></li>
        <li><a href="#strategy">游玩攻略</a></li>
        <li><a href="#note">游客游记</a></li>
        <li><a href="#news">文旅资讯</a></li>
      </ul>
      <div class="header-right">
        <div class="header-search-box">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索景点"
            @keyup.enter="searchSpot"
          >
          <button
            class="search-btn"
            @click="searchSpot"
          >
            搜索
          </button>
        </div>
        <button
          class="login-btn"
          @click="goLogin"
        >
          登录
        </button>
        <button
          class="register-btn"
          @click="goRegister"
        >
          注册
        </button>
      </div>
    </header>

    <!-- 全屏轮播 -->
    <div
      id="banner"
      class="banner"
    >
      <div
        v-for="(item, index) in bannerList"
        :key="index"
        class="banner-item"
        :class="{ active: currentBanner === index }"
      >
        <img
          :src="item.image"
          :alt="item.title"
        >
        <div class="banner-mask" />
        <div class="banner-text">
          <h1>{{ item.title }}</h1>
          <p>{{ item.desc }}</p>
          <button @click="goBannerDetail(item.routeName)">
            {{ item.btnText }}
          </button>
        </div>
      </div>
      <div class="dots-box">
        <span
          v-for="(item, index) in bannerList"
          :key="index"
          class="dot"
          :class="{ active: currentBanner === index }"
          @click="changeBanner(index)"
        />
      </div>
      <div class="scroll-hint">
        <span>向下滚动探索</span>
        <div class="scroll-arrow" />
      </div>
    </div>

    <!-- 家乡简介 -->
    <section
      id="about"
      class="about-home section-animate"
    >
      <div class="container">
        <h2 class="section-title animate-item">
          城市概况 · 山水故里
        </h2>
        <p class="section-desc animate-item">
          生态宜居小城，自然山水与千年人文共生
        </p>
        <div class="about-wrap">
          <div class="about-img animate-item">
            <img
              :src="generateImage('中国江南水乡小城全景，青山环绕，河流穿城，白墙黛瓦古村落，清晨薄雾，航拍视角，清新治愈', 'landscape_4_3')"
              alt="家乡全景"
            >
          </div>
          <div class="about-text animate-item">
            <h3>一座藏在山水间的小城</h3>
            <p>我的家乡群山环绕、河湖密布，生态环境优越，全年气候温润舒适，是天然森林氧吧。这里没有拥挤商业化景区，保留原生自然风景与淳朴乡土民风。清晨推开窗，薄雾缭绕山间；傍晚漫步河畔，晚霞倒映水面，每一刻都像 living in a painting。</p>
            <p>千年历史沉淀下大量古村落、古建筑与传统民俗，山水风光搭配传统文化，形成独一份的故乡美学。村中老祠堂、石板巷、古戏台至今仍在使用，逢年过节便舞龙灯、唱大戏，热闹非凡。本地匠人世代传承竹编、剪纸、制茶、酿酒等非遗技艺，让古老智慧在现代生活中延续温度。</p>
            <p>春夏秋冬景色各不相同，春季油菜花海铺金，夏日峡谷避暑清凉，秋日山林层林尽染，冬季雾凇冰挂如梦。无论是摄影发烧友、亲子家庭、徒步爱好者，还是想要远离城市喧嚣的都市人，都能在这里找到属于自己的慢生活节奏。四季皆宜旅行观光，全年皆可体验不一样的故乡之美。</p>
            <div class="tag-group">
              <span>生态秘境</span>
              <span>人文古邑</span>
              <span>康养休闲</span>
              <span>小众打卡</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心景点 -->
    <section
      id="spot"
      class="spot-area section-animate"
    >
      <div class="container">
        <h2 class="section-title animate-item">
          核心景点 · 必打卡风光
        </h2>
        <p class="section-desc animate-item">
          九大特色景区，包揽家乡全部绝美风景
        </p>
        <div class="spot-grid">
          <div
            v-for="(spot, index) in spotList"
            :key="index"
            class="spot-card animate-item"
            :style="{ '--delay': `${index * 0.08}s` }"
          >
            <div class="spot-img">
              <img
                :src="spot.image"
                :alt="spot.title"
              >
            </div>
            <div class="spot-info">
              <h3>{{ spot.title }}</h3>
              <p>{{ spot.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 四季风光 -->
    <section
      id="season"
      class="season-area section-animate"
    >
      <div class="container">
        <h2 class="section-title animate-item">
          四季限定风光
        </h2>
        <p class="section-desc animate-item">
          一山分四季，十里不同景，四季皆有专属画卷
        </p>
        <div class="season-grid">
          <div
            v-for="(season, index) in seasonList"
            :key="index"
            class="season-item animate-item"
            :style="{ '--delay': `${index * 0.12}s` }"
          >
            <img
              :src="season.image"
              :alt="season.title"
            >
            <div class="season-text">
              <h3>{{ season.title }}</h3>
              <p>{{ season.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 人文民俗 -->
    <section
      id="folk"
      class="folk-area section-animate"
    >
      <div class="container">
        <h2 class="section-title animate-item">
          人文民俗 · 千年传承
        </h2>
        <p class="section-desc animate-item">
          非遗、节庆、古建，读懂故乡烟火底蕴
        </p>
        <div class="folk-grid">
          <div
            v-for="(folk, index) in folkList"
            :key="index"
            class="folk-card animate-item"
            :style="{ '--delay': `${index * 0.08}s` }"
          >
            <img
              :src="folk.image"
              :alt="folk.title"
            >
            <div class="folk-text">
              <h3>{{ folk.title }}</h3>
              <p>{{ folk.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色美食 -->
    <section
      id="food"
      class="food-area section-animate"
    >
      <div class="container">
        <h2 class="section-title animate-item">
          本土特色美食
        </h2>
        <p class="section-desc animate-item">
          山水孕育地道风味，每一口都是家乡味道
        </p>
        <div class="food-grid">
          <div
            v-for="(food, index) in foodList"
            :key="index"
            class="food-card animate-item"
            :style="{ '--delay': `${index * 0.06}s` }"
          >
            <div class="food-img">
              <img
                :src="food.image"
                :alt="food.title"
              >
            </div>
            <div class="food-info">
              <h3>{{ food.title }}</h3>
              <p>{{ food.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特产伴手礼 -->
    <section
      id="souvenir"
      class="souvenir-area section-animate"
    >
      <div class="container">
        <h2 class="section-title animate-item">
          特产伴手礼
        </h2>
        <p class="section-desc animate-item">
          把家乡的味道与匠心，带给远方的亲友
        </p>
        <div class="souvenir-grid">
          <div
            v-for="(item, index) in souvenirList"
            :key="index"
            class="souvenir-card animate-item"
            :style="{ '--delay': `${index * 0.08}s` }"
          >
            <div class="souvenir-img">
              <img
                :src="item.image"
                :alt="item.title"
              >
            </div>
            <div class="souvenir-info">
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
              <span class="souvenir-tag">{{ item.tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 民宿住宿 -->
    <section
      id="homestay"
      class="homestay-area section-animate"
    >
      <div class="container">
        <h2 class="section-title animate-item">
          民宿住宿
        </h2>
        <p class="section-desc animate-item">
          住进风景里，枕山而眠，推窗见景
        </p>
        <div class="homestay-grid">
          <div
            v-for="(item, index) in homestayList"
            :key="index"
            class="homestay-card animate-item"
            :style="{ '--delay': `${index * 0.08}s` }"
          >
            <div class="homestay-img">
              <img
                :src="item.image"
                :alt="item.title"
              >
              <div class="homestay-price">
                {{ item.price }}
              </div>
            </div>
            <div class="homestay-info">
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
              <div class="homestay-tags">
                <span
                  v-for="(tag, tIndex) in item.tags"
                  :key="tIndex"
                >{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 游玩攻略 -->
    <section
      id="strategy"
      class="strategy-area section-animate"
    >
      <div class="container">
        <h2 class="section-title animate-item">
          出行游玩全攻略
        </h2>
        <p class="section-desc animate-item">
          交通、住宿、打卡、出行时间一站式指南
        </p>
        <div class="strategy-grid">
          <div
            v-for="(strategy, index) in strategyList"
            :key="index"
            class="strategy-card animate-item"
            :style="{ '--delay': `${index * 0.1}s` }"
          >
            <div class="strategy-icon">
              {{ strategy.icon }}
            </div>
            <h3>{{ strategy.title }}</h3>
            <p>{{ strategy.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 游客游记 -->
    <section
      id="note"
      class="note-area section-animate"
    >
      <div class="container">
        <h2 class="section-title animate-item">
          游客真实游记实拍
        </h2>
        <p class="section-desc animate-item">
          来自各地游客真实体验与风景实拍分享
        </p>
        <div
          ref="noteScrollRef"
          class="scroll-wrapper"
        >
          <div
            ref="noteListRef"
            class="scroll-inner"
          >
            <div
              v-for="(note, index) in doubledNoteList"
              :key="`${note.user}-${index}`"
              class="note-card scroll-item"
            >
              <div class="note-user">
                <div class="avatar">
                  {{ note.avatar }}
                </div>
                <span>{{ note.user }}</span>
              </div>
              <p class="note-content">
                {{ note.content }}
              </p>
              <img
                :src="note.image"
                alt="游记配图"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 文旅资讯 -->
    <section
      id="news"
      class="news-area section-animate"
    >
      <div class="container">
        <h2 class="section-title animate-item">
          文旅资讯
        </h2>
        <p class="section-desc animate-item">
          景区动态、节庆活动、出行提示一网打尽
        </p>
        <div
          ref="newsScrollRef"
          class="scroll-wrapper"
        >
          <div
            ref="newsListRef"
            class="scroll-inner"
          >
            <div
              v-for="(news, index) in doubledNewsList"
              :key="`${news.title}-${index}`"
              class="news-card scroll-item"
            >
              <div class="news-img">
                <img
                  :src="news.image"
                  :alt="news.title"
                >
                <span class="news-date">{{ news.date }}</span>
              </div>
              <div class="news-info">
                <h3>{{ news.title }}</h3>
                <p>{{ news.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部服务 -->
    <footer id="footer">
      <div class="container footer-grid">
        <div class="footer-col">
          <h4>游玩服务</h4>
          <p @click="goFooterItem('ConsultHotline')">
            景区咨询热线：0XX-12345678
          </p>
          <p @click="goFooterItem('SelfDriveGuide')">
            自驾路线导航指南
          </p>
          <p @click="goFooterItem('TeamBooking')">
            团队团建预约
          </p>
          <p @click="goFooterItem('TicketQuery')">
            景区票务查询
          </p>
        </div>
        <div class="footer-col">
          <h4>文旅资讯</h4>
          <p @click="goFooterItem('OpeningHours')">
            景区开放时间公示
          </p>
          <p @click="goFooterItem('HolidayEvents')">
            节假日活动预告
          </p>
          <p @click="goFooterItem('FolkFestivals')">
            民俗节庆安排
          </p>
          <p @click="goFooterItem('ScenicNews')">
            景区最新动态
          </p>
        </div>
        <div class="footer-col">
          <h4>游玩指南</h4>
          <p @click="goFooterItem('SeasonalGuide')">
            四季游玩推荐
          </p>
          <p @click="goFooterItem('PhotoSpots')">
            网红打卡机位
          </p>
          <p @click="goFooterItem('FoodStay')">
            美食民宿汇总
          </p>
          <p @click="goFooterItem('HikingRoutes')">
            徒步登山路线
          </p>
        </div>
        <div class="footer-col">
          <h4>联系我们</h4>
          <p @click="goFooterItem('OfficialEmail')">
            官方邮箱：town@scenic.com
          </p>
          <p @click="goFooterItem('ComplaintFeedback')">
            游客投诉反馈通道
          </p>
          <p @click="goFooterItem('DouyinAccount')">
            抖音官方风景账号
          </p>
          <p @click="goFooterItem('Cooperation')">
            文旅合作洽谈
          </p>
        </div>
      </div>
      <div class="copyright">
        © 2026 故乡山水文旅宣传官网 版权所有
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { generateImage } from '@/utils/images'

const router = useRouter()
const route = useRoute()

const headerActive = ref(false)
const searchKeyword = ref('')

function searchSpot() {
  const keyword = searchKeyword.value.trim() || '邵阳市'
  const url = `https://map.baidu.com/search/${encodeURIComponent(keyword)}?querytype=s&da_src=shareurl&wd=${encodeURIComponent(keyword)}&c=273&src=0&pn=0&sug=0&l=13&b=(12368580,3113481.5;12450244,3155337.5)&from=webmap&biz_forward=%7B"scaler":1,"styles":"pl"%7D&device_ratio=1`
  window.open(url, '_blank')
}

function handleScroll() {
  headerActive.value = window.scrollY > 100
}

function goLogin() {
  router.push({ name: 'Login' })
}

function goRegister() {
  router.push({ name: 'Register' })
}

function goBannerDetail(routeName) {
  if (routeName) {
    router.push({ name: routeName, query: { slide: currentBanner.value } })
  }
}

function goFooterItem(routeName) {
  if (routeName) {
    router.push({ name: routeName })
  }
}

const bannerList = [
  {
    image: generateImage('中国高山云海日出，金色阳光穿透云层，连绵群山若隐若现，壮丽自然风光，电影感航拍', 'landscape_16_9'),
    title: '云海漫群山，我的家乡藏尽温柔',
    desc: '朝观日出云海，晚赏江畔落日，一山一水皆是人间画卷',
    btnText: '即刻探索风光',
    routeName: 'CloudSea'
  },
  {
    image: generateImage('中国江南水乡古镇，青石板路，小桥流水，白墙黛瓦，古朴宁静，晨雾朦胧', 'landscape_16_9'),
    title: '千年古镇，流水人家',
    desc: '青石板巷小桥流水，感受慢悠悠的乡土烟火',
    btnText: '走进古镇风光',
    routeName: 'AncientTown'
  },
  {
    image: generateImage('中国湖泊落日美景，平静湖面倒映金色晚霞，远处山峦剪影，宁静治愈', 'landscape_16_9'),
    title: '湖光落日，满目鎏金',
    desc: '万亩湿地湖泊，落日晚霞铺满整片湖面',
    btnText: '查看湖景打卡点',
    routeName: 'LakeSunset'
  },
  {
    image: generateImage('中国喀斯特溶洞奇观，彩色灯光照射钟乳石石柱，地下宫殿般神秘梦幻', 'landscape_16_9'),
    title: '溶洞奇观，地下仙境',
    desc: '亿万年钟乳石千姿百态，流光溢彩宛若龙宫',
    btnText: '探秘地下世界',
    routeName: 'CaveWonder'
  },
  {
    image: generateImage('中国高山草甸星空露营，夏季野花遍地，夜空银河璀璨，帐篷篝火', 'landscape_16_9'),
    title: '高山草甸，星河入梦',
    desc: '夏日草甸繁花似锦，夜晚银河横贯天际',
    btnText: '预约露营观星',
    routeName: 'AlpineMeadow'
  }
]

const currentBanner = ref(0)
let bannerTimer = null

function changeBanner(index) {
  clearInterval(bannerTimer)
  currentBanner.value = index
  startBannerAutoSlide()
}

function startBannerAutoSlide() {
  bannerTimer = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % bannerList.length
  }, 5000)
}

const spotList = [
  { image: generateImage('中国高山云海观景台，日出时分金色云海翻涌，远山轮廓，壮丽风光', 'landscape_4_3'), title: '高山云海景区', desc: '千米高山观景台，日出云海壮阔，摄影爱好者首选打卡点。' },
  { image: generateImage('中国湿地公园，木栈道穿过芦苇荡，湖面候鸟飞翔，落日余晖', 'landscape_4_3'), title: '滨湖湿地公园', desc: '环湖栈道、候鸟栖息地，傍晚落日湖面金光粼粼。' },
  { image: generateImage('中国明清古村落，青石板巷，白墙黛瓦马头墙，古朴宁静', 'landscape_4_3'), title: '明清古村落', desc: '完整古建筑群，古祠堂、老巷弄，沉浸式感受古乡土文化。' },
  { image: generateImage('中国峡谷瀑布群，多层阶梯瀑布，清澈溪水，夏季避暑', 'landscape_4_3'), title: '峡谷瀑布群', desc: '十里峡谷溪流，多层阶梯瀑布，夏季避暑玩水胜地。' },
  { image: generateImage('中国南方梯田，春日灌水如镜，层层叠叠依山而建，田园风光', 'landscape_4_3'), title: '万亩梯田', desc: '依山层叠梯田，春日镜面、秋日金浪，四季风光各异。' },
  { image: generateImage('中国原始森林步道，高大树木遮天蔽日，木栈道蜿蜒，绿色氧吧', 'landscape_4_3'), title: '原生森林公园', desc: '大面积原始次生林，徒步栈道穿行林间，负氧离子充沛。' },
  { image: generateImage('中国溶洞内部，彩色灯光照射钟乳石和石笋，地下奇观', 'landscape_4_3'), title: '地下溶洞奇观', desc: '喀斯特溶洞绵延数公里，石笋石柱如梦似幻，灯光映衬下宛若水晶宫殿。' },
  { image: generateImage('中国千年古刹寺庙，红墙黄瓦，香烟缭绕，晨钟暮鼓', 'landscape_4_3'), title: '千年古刹禅院', desc: '始建于唐代的古寺庙，晨钟暮鼓，香火缭绕，是静心祈福的圣地。' },
  { image: generateImage('中国高山草甸牧场，夏季野花遍地，远处群山，蓝天白云', 'landscape_4_3'), title: '高山草甸牧场', desc: '海拔一千八百米的天然草甸，夏季野花遍地，可观星露营、骑马漫步。' }
]

const seasonList = [
  { image: generateImage('中国春天山间花海，桃花油菜花盛开，金黄与粉红交织，生机勃勃', 'portrait_4_3'), title: '春 · 漫山花海', desc: '桃花、油菜花漫山遍野，满眼生机' },
  { image: generateImage('中国夏日峡谷碧潭，清澈溪水，茂密绿树，清凉避暑', 'portrait_4_3'), title: '夏 · 清泉碧潭', desc: '峡谷密林避暑，溪水清凉适合戏水' },
  { image: generateImage('中国秋天山林红叶，层林尽染，金黄橙红，油画般秋色', 'portrait_4_3'), title: '秋 · 满山红叶', desc: '山林层林尽染，油画般金色秋色' },
  { image: generateImage('中国冬天山间雾凇，白雪覆盖树枝，群山银装素裹，纯净仙境', 'portrait_4_3'), title: '冬 · 山间雾凇', desc: '白雪群山冰挂，纯净冰雪仙境' }
]

const folkList = [
  { image: generateImage('中国传统民俗节庆，舞龙灯表演，红灯笼高挂，热闹庙会夜景', 'landscape_4_3'), title: '传统民俗节庆', desc: '舞龙灯、山歌会、庙会灯会，保留百年传统民俗活动。' },
  { image: generateImage('中国非遗手工技艺，竹编匠人正在编织竹篮，传统手工艺工坊', 'landscape_4_3'), title: '非遗手工技艺', desc: '竹编、剪纸、古法酿酒，本土非遗手作代代传承。' },
  { image: generateImage('中国徽派古建筑民居，白墙黛瓦马头墙，飞檐木构，依山而建', 'landscape_4_3'), title: '古建民居文化', desc: '白墙黛瓦依山而建，飞檐木构，传统民居美学典范。' },
  { image: generateImage('中国乡土农耕场景，稻田水牛，农民劳作，炊烟袅袅的村庄', 'landscape_4_3'), title: '乡土农耕文化', desc: '传统农耕生活、乡土邻里温情，治愈原生态烟火气。' },
  { image: generateImage('中国地方戏曲表演，演员身着华丽戏服，舞台上唱腔婉转', 'landscape_4_3'), title: '地方戏曲传承', desc: '高腔、采茶戏、傩戏等古老剧种，唱腔婉转，妆容瑰丽，活态传承。' },
  { image: generateImage('中国传统中式婚礼，花轿迎亲队伍，红色喜庆，传统嫁娶礼仪', 'landscape_4_3'), title: '传统嫁娶礼俗', desc: '花轿迎亲、哭嫁歌、喜宴流水席，仪式感满满的婚俗文化。' },
  { image: generateImage('中国古村落宗族祠堂，雕梁画栋，庄严肃穆，家族历史厚重', 'landscape_4_3'), title: '宗族祠堂文化', desc: '古村落中的祠堂记载着家族历史，是维系宗族情感的重要纽带。' },
  { image: generateImage('中国传统手工制茶，铁锅杀青，茶叶揉捻，茶师专注制茶', 'landscape_4_3'), title: '古法手工制茶', desc: '杀青、揉捻、烘焙，全流程手工制茶，锁住高山云雾的清香。' }
]

const foodList = [
  { image: generateImage('中国山野农家土菜，木桌摆满时令蔬菜和散养鸡鸭，柴火灶热气腾腾', 'landscape_4_3'), title: '山野农家土菜', desc: '取自山间时蔬与散养家禽，柴火慢炖，原汁原味，是最朴实的乡愁。' },
  { image: generateImage('中国传统手工糕点，糯米豆沙糕，芝麻点缀，精致摆盘', 'landscape_4_3'), title: '古法手工糕点', desc: '糯米、豆沙、芝麻层层包裹，蒸制后软糯香甜，是节日必备点心。' },
  { image: generateImage('中国清蒸河鲜，新鲜河鱼河虾摆盘，葱姜点缀，鲜美诱人', 'landscape_4_3'), title: '生态新鲜河鲜', desc: '清晨捕捞的河鱼河虾，清蒸或红烧皆鲜美，肉质细嫩无土腥味。' },
  { image: generateImage('中国街头农家小吃摊，臭豆腐、米粉、烧饼，烟火气十足', 'landscape_4_3'), title: '地道农家小吃', desc: '臭豆腐、米粉、烧饼等街头小食，承载着几代人的童年记忆。' },
  { image: generateImage('中国腊肉冬笋锅，砂锅中腊肉与冬笋炖煮，热气腾腾咸香浓郁', 'landscape_4_3'), title: '腊肉冬笋锅', desc: '柴火熏制的腊肉搭配鲜嫩冬笋，咸香浓郁，是冬季暖胃首选。' },
  { image: generateImage('中国石磨豆腐脑，洁白豆花盛入碗中，配以卤汁辣椒油香菜', 'landscape_4_3'), title: '石磨豆腐脑', desc: '传统石磨现磨豆浆，豆花嫩滑，佐以秘制卤汁与辣椒油。' },
  { image: generateImage('中国竹筒糯米饭，新鲜竹筒切开露出软糯米饭，清香扑鼻', 'landscape_4_3'), title: '竹筒糯米饭', desc: '糯米装入新鲜竹筒蒸制，米饭浸润竹香，口感软糯清甜。' },
  { image: generateImage('中国红烧溪鱼，整条小鱼红烧装盘，色泽红亮，撒葱花', 'landscape_4_3'), title: '红烧溪鱼', desc: '山涧溪流小鱼先炸后红烧，外酥里嫩，佐酒下饭两相宜。' },
  { image: generateImage('中国春卷，金黄酥脆薄皮春卷，野菜馅料，摆盘精美', 'landscape_4_3'), title: '野菜春卷', desc: '春季嫩芽野菜入馅，薄皮炸制金黄酥脆，清爽不油腻。' },
  { image: generateImage('中国土鸡汤锅，砂锅炖土鸡，汤清味鲜，配菌菇枸杞', 'landscape_4_3'), title: '土鸡汤锅', desc: '散养土鸡文火慢炖，汤清味鲜，配本地菌菇更添山野风味。' },
  { image: generateImage('中国艾草青团，翠绿软糯青团，豆沙馅，清明传统点心', 'landscape_4_3'), title: '艾草青团', desc: '清明时节采摘艾草捣汁，包裹豆沙或肉馅，清香软糯。' },
  { image: generateImage('中国手工红薯粉，透明劲道粉条，酸辣汤底，配花生香菜', 'landscape_4_3'), title: '手工红薯粉', desc: '本地红薯制成粉条，爽滑劲道，酸辣粉或炖菜皆是绝配。' }
]

const souvenirList = [
  { image: generateImage('中国高山云雾茶，青瓷茶具冲泡绿茶，茶叶嫩芽，清香雅致', 'landscape_4_3'), title: '高山云雾茶', desc: '海拔千米茶园采摘，清香回甘，送礼自饮两相宜。', tag: '精选茶礼' },
  { image: generateImage('中国竹编手工艺品，精美竹篮竹筐，非遗工艺，自然环保', 'landscape_4_3'), title: '竹编手工艺品', desc: '非遗匠人手工编制，环保雅致，极具收藏价值。', tag: '非遗手作' },
  { image: generateImage('中国传统米酒，陶瓷酒坛和酒盅，琥珀色酒液，古法酿造', 'landscape_4_3'), title: '古法酿造米酒', desc: '传统酒曲发酵，入口绵甜，是故乡宴席必备佳酿。', tag: '地道风味' },
  { image: generateImage('中国山珍干货礼盒，笋干香菇木耳整齐摆放，精美包装', 'landscape_4_3'), title: '山珍干货礼盒', desc: '笋干、香菇、木耳等山林珍味，原生态无添加。', tag: '天然山珍' },
  { image: generateImage('中国土蜂蜜蜜饯，玻璃罐蜂蜜和果脯，金黄透亮，健康零添加', 'landscape_4_3'), title: '土蜂蜜蜜饯', desc: '百花土蜂蜜浸渍果脯，甜而不腻，健康零添加。', tag: '甜蜜手信' },
  { image: generateImage('中国冷榨山茶油，玻璃瓶金黄色山茶油，油茶籽，厨房健康', 'landscape_4_3'), title: '冷榨山茶油', desc: '高山油茶籽冷榨而成，烟点高、营养好，厨房健康之选。', tag: '养生粮油' }
]

const homestayList = [
  { image: generateImage('中国山景民宿，木质露台俯瞰云海日出，中式简约客房，温馨舒适', 'landscape_4_3'), title: '云栖山居', desc: '依山而建，露台直面云海日出，含早餐与接送服务。', price: '¥398/晚', tags: ['观景露台', '含早餐'] },
  { image: generateImage('中国湖畔民宿，临水而建，独立庭院，傍晚湖面落日倒影', 'landscape_4_3'), title: '湖畔小筑', desc: '临湖而居，傍晚可赏湖畔落日，配备独立庭院。', price: '¥458/晚', tags: ['湖景房', '独立庭院'] },
  { image: generateImage('中国明清老宅改造民宿，青砖黛瓦天井院落，古朴典雅客房', 'landscape_4_3'), title: '古镇雅舍', desc: '明清老宅改造，青砖黛瓦间体验古韵慢生活。', price: '¥328/晚', tags: ['古风体验', '亲子友好'] },
  { image: generateImage('中国高山草甸帐篷营地，白色帐篷散布草地，夜晚篝火星空', 'landscape_4_3'), title: '山野星空营地', desc: '高山草甸帐篷营地，夜晚观星河，清晨看日出云海。', price: '¥268/晚', tags: ['星空露营', '篝火晚会'] }
]

const strategyList = [
  { icon: '🗺️', title: '交通出行指南', desc: '高速、高铁直达市区，自驾全线柏油山路；城区旅游公交串联全部核心景区，自由行出行十分方便。' },
  { icon: '🏡', title: '民宿住宿推荐', desc: '景区周边观景民宿、山野客栈、精品酒店可选，开窗见山，夜晚观星，沉浸式慢生活体验。' },
  { icon: '📸', title: '摄影打卡机位', desc: '整理日出云海、湖畔落日、古巷古风、梯田全景拍摄点位，新手也能拍出高级风景大片。' },
  { icon: '⏰', title: '最佳游玩季节', desc: '3-5月踏青赏花；6-8月避暑玩水；9-11月赏秋登高；12-2月观雪雾凇，全年均可游玩。' }
]

const noteList = [
  { avatar: 'A', user: '山水旅人', content: '这里风景超出预期，空气清新，云海日出绝美，没有商业化套路，非常治愈，值得再来！', image: generateImage('中国高山云海日出风景，金色阳光穿透云层，壮观自然美景', 'landscape_4_3') },
  { avatar: 'B', user: '古风爱好者', content: '古村落氛围感拉满，青石板路特别出片，本地人热情淳朴，美食平价地道，小众宝藏旅行地。', image: generateImage('中国古村落青石板巷，白墙黛瓦，宁静古朴', 'landscape_4_3') },
  { avatar: 'C', user: '自驾爱好者', content: '自驾环线一路都是山水风光，四季景色完全不同，路况良好，适合周末短途自驾游。', image: generateImage('中国山间公路自驾，蜿蜒山路两旁绿树青山，风景优美', 'landscape_4_3') },
  { avatar: 'D', user: '亲子游达人', content: '带孩子来体验农耕和竹编，既有自然风光又能学到传统文化，民宿老板也很热情。', image: generateImage('中国亲子农耕体验，稻田水牛，孩子体验竹编，田园风光', 'landscape_4_3') },
  { avatar: 'E', user: '摄影师阿杰', content: '日出云海和星空银河都拍到了，晨雾中的古村落宛如仙境，强烈推荐给摄影爱好者。', image: generateImage('中国古村落晨雾云海，摄影师拍摄日出，如梦如幻', 'landscape_4_3') },
  { avatar: 'F', user: '美食探索家', content: '农家菜分量足味道好，腊肉冬笋锅和手工糕点让人回味无穷，回去还带了几盒特产。', image: generateImage('中国农家菜宴席，腊肉冬笋锅和手工糕点摆满木桌', 'landscape_4_3') }
]

const newsList = [
  { image: generateImage('中国暑期文旅活动，景区舞台表演，游客众多，热闹喜庆', 'landscape_4_3'), date: '2026.07.08', title: '暑期文旅活动月正式启动', desc: '为期两个月的清凉避暑季开启，十大景区联合推出优惠套票与夜间演艺。' },
  { image: generateImage('中国高山云海日出，登山者观赏日出，金色云海壮丽', 'landscape_4_3'), date: '2026.07.05', title: '高山云海日出观赏指南', desc: '气象部门发布最佳观云时段，附送三条经典登山路线与安全提示。' },
  { image: generateImage('中国古村落非遗市集，手工艺人展示竹编剪纸，游客围观', 'landscape_4_3'), date: '2026.07.01', title: '古村落非遗市集周末开市', desc: '本周六、周日，传统手工艺人齐聚古巷，现场展演竹编、剪纸与古法酿酒。' },
  { image: generateImage('中国高山草甸露营节，帐篷营地篝火晚会，星空下民谣演出', 'landscape_4_3'), date: '2026.06.28', title: '高山草甸露营节火热报名中', desc: '星空露营、篝火晚会、民谣演出，名额有限，提前预订享早鸟价。' },
  { image: generateImage('中国溶洞夜游，彩色灯光照亮钟乳石，游客探秘地下奇观', 'landscape_4_3'), date: '2026.06.25', title: '溶洞景区新增灯光夜游', desc: '暑期夜间开放，结合声光电打造沉浸式地下奇观探秘体验。' },
  { image: generateImage('中国土特产品鉴会，云雾茶山茶油蜂蜜摊位，游客试吃', 'landscape_4_3'), date: '2026.06.20', title: '本地土特产品鉴会开幕', desc: '云雾茶、山茶油、蜂蜜蜜饯等特产现场试吃，产地直供价格优惠。' }
]

const doubledNoteList = computed(() => [...noteList, ...noteList])
const doubledNewsList = computed(() => [...newsList, ...newsList])

let observer = null

function initScrollAnimation() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  document.querySelectorAll('.animate-item').forEach((el) => {
    observer.observe(el)
  })
}

// 游记/资讯无缝慢速滚动
const noteScrollRef = ref(null)
const noteListRef = ref(null)
const newsScrollRef = ref(null)
const newsListRef = ref(null)
let scrollRafId = null
let notePosition = 0
let newsPosition = 0

function startInfiniteScroll() {
  const speed = 0.6

  function animate() {
    if (noteListRef.value && noteScrollRef.value) {
      const noteHalfWidth = noteListRef.value.scrollWidth / 2
      notePosition += speed
      if (notePosition >= noteHalfWidth) {
        notePosition = 0
      }
      noteListRef.value.style.transform = `translateX(-${notePosition}px)`
    }

    if (newsListRef.value && newsScrollRef.value) {
      const newsHalfWidth = newsListRef.value.scrollWidth / 2
      newsPosition += speed
      if (newsPosition >= newsHalfWidth) {
        newsPosition = 0
      }
      newsListRef.value.style.transform = `translateX(-${newsPosition}px)`
    }

    scrollRafId = requestAnimationFrame(animate)
  }

  scrollRafId = requestAnimationFrame(animate)
}

onMounted(() => {
  const savedSlide = parseInt(route.query.slide)
  if (!isNaN(savedSlide) && savedSlide >= 0 && savedSlide < bannerList.length) {
    currentBanner.value = savedSlide
  }
  window.addEventListener('scroll', handleScroll)
  startBannerAutoSlide()
  initScrollAnimation()
  startInfiniteScroll()
  window.scrollTo(0, 0)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  clearInterval(bannerTimer)
  if (observer) {
    observer.disconnect()
  }
  if (scrollRafId) {
    cancelAnimationFrame(scrollRafId)
  }
})
</script>

<style scoped lang="scss">
.home-view {
  font-family: "Microsoft YaHei", PingFang SC, sans-serif;
  color: #222;
}

html {
  scroll-behavior: smooth;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  font-size: 38px;
  text-align: center;
  margin-bottom: 14px;
  font-weight: 700;
}

.section-desc {
  text-align: center;
  color: #666;
  margin-bottom: 64px;
  font-size: 16px;
}

section {
  padding: 120px 0;
}

/* 滚动动画基础 */
.animate-item {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: var(--delay, 0s);
}

.animate-item.animated {
  opacity: 1;
  transform: translateY(0);
}

/* 导航栏 */
header {
  width: 100%;
  height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  transition: 0.35s all ease;
}

header.active {
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}

header.active .logo {
  color: #1864ff;
}

.nav-menu {
  display: flex;
  gap: 26px;
  list-style: none;
}

.nav-menu a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

header.active .nav-menu a {
  color: #333;
}

.nav-menu a:hover {
  color: #1864ff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-search-box {
  display: flex;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 24px;
  padding: 4px 4px 4px 14px;
  background: rgba(255, 255, 255, 0.1);
  transition: 0.3s;
}

header.active .header-search-box {
  border-color: #1864ff;
  background: #fff;
}

.header-search-box input {
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  font-size: 14px;
  width: 120px;
  transition: 0.3s;
}

header.active .header-search-box input {
  color: #333;
}

.header-search-box input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

header.active .header-search-box input::placeholder {
  color: #999;
}

.search-btn {
  border: none;
  color: #fff;
  padding: 6px 16px;
  border-radius: 20px;
  background: #1864ff;
  cursor: pointer;
  transition: 0.3s;
  font-size: 13px;
}

header.active .search-btn {
  background: #1864ff;
  color: #fff;
}

.search-btn:hover {
  background: #0f4cd6;
}

.login-btn {
  color: #fff;
  background: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
  transition: 0.3s;
}

header.active .login-btn {
  color: #333;
}

.login-btn:hover {
  color: #1864ff;
}

.register-btn {
  background: #1864ff;
  color: #fff;
  border: 1px solid #1864ff;
  padding: 6px 18px;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.3s;
}

header.active .register-btn {
  background: #1864ff;
  color: #fff;
}

.register-btn:hover {
  background: #0f4cd6;
}

/* 首屏轮播 */
.banner {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.banner-item {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 1.2s ease-in-out;
}

.banner-item.active {
  opacity: 1;
  pointer-events: auto;
}

.banner-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.08);
  transition: transform 6s ease-out;
}

.banner-item.active img {
  transform: scale(1);
}

.banner-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.2));
}

.banner-text {
  position: absolute;
  left: 8%;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  max-width: 720px;
}

.banner-text h1 {
  font-size: 52px;
  margin-bottom: 18px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s;
}

.banner-item.active .banner-text h1 {
  opacity: 1;
  transform: translateY(0);
}

.banner-text p {
  font-size: 18px;
  margin-bottom: 34px;
  opacity: 0;
  transition: opacity 0.8s ease-out 0.5s;
}

.banner-item.active .banner-text p {
  opacity: 0.92;
}

.banner-text button {
  padding: 14px 38px;
  background: #1864ff;
  color: #fff;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.35s;
  opacity: 0;
  transform: translateY(20px);
  transition: background 0.35s, opacity 0.8s ease-out 0.7s, transform 0.8s ease-out 0.7s;
}

.banner-item.active .banner-text button {
  opacity: 1;
  transform: translateY(0);
}

.banner-text button:hover {
  background: #0f4cd6;
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(24, 100, 255, 0.4);
}

.dots-box {
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 14px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: 0.35s;
}

.dot.active {
  background: #fff;
  width: 32px;
  border-radius: 5px;
}

.scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 8px;
  height: 8px;
  border-right: 2px solid rgba(255, 255, 255, 0.85);
  border-bottom: 2px solid rgba(255, 255, 255, 0.85);
  transform: rotate(45deg);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* 家乡简介 - 暖棕大地色调 */
.about-home {
  background: #fdfbf7;
}

.about-home .section-title {
  color: #4a3f35;
}

.about-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
}

.about-img {
  overflow: hidden;
  border-radius: 18px;
}

.about-img img {
  width: 100%;
  height: 520px;
  object-fit: cover;
  border-radius: 18px;
  box-shadow: 0 10px 40px rgba(74, 63, 53, 0.12);
  transition: transform 0.7s ease;
}

.about-img:hover img {
  transform: scale(1.03);
}

.about-text h3 {
  font-size: 30px;
  margin-bottom: 24px;
  color: #4a3f35;
}

.about-text p {
  line-height: 2.2;
  color: #555;
  margin-bottom: 22px;
  font-size: 15px;
}

.tag-group {
  display: flex;
  gap: 12px;
  margin-top: 34px;
  flex-wrap: wrap;
}

.tag-group span {
  padding: 8px 20px;
  background: #f5efe8;
  color: #8b6f47;
  border-radius: 24px;
  font-size: 14px;
  transition: 0.35s;
}

.tag-group span:hover {
  background: #8b6f47;
  color: #fff;
}

/* 核心景点 - 森林绿色调 */
.spot-area {
  background: #f2f7f4;
}

.spot-area .section-title {
  color: #2d5a3f;
}

.spot-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.spot-card {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 5px 18px rgba(45, 90, 63, 0.08);
  transition: 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.spot-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 16px 40px rgba(45, 90, 63, 0.15);
}

.spot-img {
  overflow: hidden;
  height: 230px;
}

.spot-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.spot-card:hover img {
  transform: scale(1.1);
}

.spot-info {
  padding: 24px;
}

.spot-info h3 {
  margin-bottom: 10px;
  font-size: 19px;
  color: #2d5a3f;
}

.spot-info p {
  color: #666;
  font-size: 14px;
  line-height: 1.7;
}

/* 四季风光 - 紫蓝梦幻色调，居中排版 */
.season-area {
  background: linear-gradient(135deg, #eef2ff, #f0e6ff);
}

.season-area .section-title {
  color: #4c3d7a;
}

.season-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 26px;
}

.season-item {
  width: 280px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.season-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 14px 36px rgba(76, 61, 122, 0.18);
}

.season-item img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.season-item:hover img {
  transform: scale(1.08);
}

.season-text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 28px 22px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
  color: white;
}

/* 人文民俗 - 琥珀暖色调 */
.folk-area {
  background: #fffaf4;
}

.folk-area .section-title {
  color: #8b5a2b;
}

.folk-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 26px;
}

.folk-card {
  display: flex;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(139, 90, 43, 0.07);
  transition: 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.folk-card:hover {
  transform: translateX(8px);
  box-shadow: 0 12px 30px rgba(139, 90, 43, 0.13);
}

.folk-card:nth-child(even):hover {
  transform: translateX(-8px);
}

.folk-card img {
  width: 220px;
  height: 170px;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.folk-card:hover img {
  transform: scale(1.06);
}

.folk-text {
  padding: 24px;
  flex: 1;
}

.folk-text h3 {
  margin-bottom: 10px;
  color: #8b5a2b;
}

.folk-text p {
  font-size: 14px;
  color: #666;
  line-height: 1.7;
}

/* 特色美食 - 珊瑚红色调 */
.food-area {
  background: #fff6f4;
}

.food-area .section-title {
  color: #9c3d32;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 26px;
}

.food-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(156, 61, 50, 0.06);
  transition: 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.food-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 14px 34px rgba(156, 61, 50, 0.13);
}

.food-img {
  overflow: hidden;
  height: 180px;
}

.food-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.food-card:hover img {
  transform: scale(1.1);
}

.food-info {
  padding: 20px;
}

.food-info h3 {
  margin-bottom: 8px;
  font-size: 17px;
  color: #9c3d32;
}

.food-info p {
  color: #666;
  font-size: 13px;
  line-height: 1.7;
}

/* 特产伴手礼 - 青绿色调 */
.souvenir-area {
  background: #f4f9f8;
}

.souvenir-area .section-title {
  color: #2a6b5e;
}

.souvenir-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.souvenir-card {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(42, 107, 94, 0.06);
  transition: 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1px solid #e8f1ef;
}

.souvenir-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 16px 38px rgba(42, 107, 94, 0.13);
}

.souvenir-img {
  overflow: hidden;
  height: 190px;
}

.souvenir-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.souvenir-card:hover img {
  transform: scale(1.1);
}

.souvenir-info {
  padding: 22px;
}

.souvenir-info h3 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #2a6b5e;
}

.souvenir-info p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 14px;
}

.souvenir-tag {
  display: inline-block;
  padding: 5px 14px;
  background: #e4f3ef;
  color: #2a6b5e;
  border-radius: 14px;
  font-size: 12px;
}

/* 民宿住宿 - 靛蓝色调 */
.homestay-area {
  background: linear-gradient(135deg, #f5f7ff, #eef1ff);
}

.homestay-area .section-title {
  color: #3a4f8a;
}

.homestay-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.homestay-card {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 5px 18px rgba(58, 79, 138, 0.07);
  transition: 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.homestay-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 16px 40px rgba(58, 79, 138, 0.15);
}

.homestay-img {
  position: relative;
  overflow: hidden;
  height: 230px;
}

.homestay-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.homestay-card:hover img {
  transform: scale(1.08);
}

.homestay-price {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #3a4f8a;
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.homestay-info {
  padding: 22px;
}

.homestay-info h3 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #3a4f8a;
}

.homestay-info p {
  color: #666;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 14px;
}

.homestay-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.homestay-tags span {
  padding: 4px 10px;
  background: #e9edff;
  color: #3a4f8a;
  border-radius: 10px;
  font-size: 12px;
}

/* 游玩攻略 - 天蓝色调 */
.strategy-area {
  background: #f0f7ff;
}

.strategy-area .section-title {
  color: #1a5fb4;
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.strategy-card {
  padding: 40px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid #d7e8ff;
  transition: 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.strategy-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 34px rgba(26, 95, 180, 0.12);
}

.strategy-icon {
  font-size: 34px;
  margin-bottom: 16px;
}

.strategy-card h3 {
  color: #1a5fb4;
  margin-bottom: 14px;
  font-size: 20px;
}

.strategy-card p {
  color: #555;
  line-height: 1.8;
  font-size: 15px;
}

/* 游客游记/资讯 滚动容器 */
.note-area {
  background: #fff7f9;
  overflow: hidden;
}

.note-area .section-title {
  color: #8a3a5a;
}

.news-area {
  background: #f8f9fc;
  overflow: hidden;
}

.news-area .section-title {
  color: #3d4b66;
}

.scroll-wrapper {
  overflow: hidden;
  width: 100%;
}

.scroll-inner {
  display: flex;
  gap: 26px;
  will-change: transform;
}

.scroll-item {
  flex: 0 0 380px;
  width: 380px;
}

/* 游客游记卡片 */
.note-card {
  background: #fff;
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(138, 58, 90, 0.06);
  transition: 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.note-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(138, 58, 90, 0.12);
}

.note-user {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #8a3a5a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.note-content {
  font-size: 14px;
  color: #666;
  line-height: 1.7;
  margin-bottom: 14px;
}

.note-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.7s ease;
}

.note-card:hover img {
  transform: scale(1.03);
}

/* 文旅资讯卡片 */
.news-card {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(61, 75, 102, 0.06);
  transition: 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.news-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(61, 75, 102, 0.12);
}

.news-img {
  position: relative;
  overflow: hidden;
  height: 210px;
}

.news-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.news-card:hover img {
  transform: scale(1.08);
}

.news-date {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(61, 75, 102, 0.9);
  color: #fff;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
}

.news-info {
  padding: 22px;
}

.news-info h3 {
  margin-bottom: 10px;
  font-size: 17px;
  line-height: 1.4;
  color: #3d4b66;
}

.news-info p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

/* 底部 */
footer {
  background: #0f172a;
  color: #b0b8c4;
  padding: 80px 0 30px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.footer-col h4 {
  color: #fff;
  margin-bottom: 24px;
  padding-bottom: 8px;
  border-bottom: 2px solid #1864ff;
  width: 45px;
}

.footer-col p {
  line-height: 2.2;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: color 0.3s, transform 0.3s;
}

.footer-col p:hover {
  color: #fff;
  transform: translateX(8px);
}

.copyright {
  text-align: center;
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid #222c40;
  font-size: 13px;
  color: #8892a0;
}

/* 移动端适配 */
@media (max-width: 1200px) {
  .nav-menu {
    gap: 18px;
  }

  .nav-menu a {
    font-size: 13px;
  }

  .section-title {
    font-size: 34px;
  }
}

@media (max-width: 992px) {
  .about-wrap,
  .folk-grid,
  .strategy-grid {
    grid-template-columns: 1fr;
  }

  .spot-grid,
  .souvenir-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .homestay-grid,
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .food-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .nav-menu {
    display: none;
  }

  .banner-text h1 {
    font-size: 36px;
  }

  header {
    padding: 0 20px;
  }

  .about-img img {
    height: 400px;
  }

  .folk-card {
    flex-direction: column;
  }

  .folk-card img {
    width: 100%;
    height: 200px;
  }

  .scroll-item {
    flex: 0 0 320px;
    width: 320px;
  }
}

@media (max-width: 576px) {
  .spot-grid,
  .souvenir-grid,
  .homestay-grid,
  .food-grid,
  .news-grid {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 28px;
  }

  .section-desc {
    margin-bottom: 44px;
  }

  section {
    padding: 80px 0;
  }

  .header-right {
    gap: 8px;
  }

  .login-btn {
    display: none;
  }

  .search-btn {
    padding: 4px 12px;
    font-size: 13px;
  }

  .register-btn {
    padding: 4px 12px;
    font-size: 13px;
  }

  .about-img img {
    height: 300px;
  }

  .scroll-item {
    flex: 0 0 300px;
    width: 300px;
  }

  .banner-text h1 {
    font-size: 28px;
  }
}
</style>
