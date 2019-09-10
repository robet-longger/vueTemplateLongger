<template>
  <div>

    <keep-alive :include="cacheList">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {
    cacheList() {
      return this.$store.getters.keepAlive;
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">
</style>
