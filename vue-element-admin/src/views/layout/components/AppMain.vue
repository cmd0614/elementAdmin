<template>
  <section class="app-main">
    <!-- transition name值有：
    fade-enter：进入过渡的开始状态，元素被插入时生效，只应用一帧后立即删除；
    fade-enter-active：进入过渡的结束状态，元素被插入时就生效，在过渡过程完成之后移除；
    fade-leave：离开过渡的开始状态，元素被删除时触发，只应用一帧后立即删除；
    fade-leave-active：离开过渡的结束状态，元素被删除时生效，离开过渡完成之后被删除； -->
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <!-- 二级路由的地方，用keep-alive进行包裹，缓存组件，因为是频繁切换，include会进行缓存 -->
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

