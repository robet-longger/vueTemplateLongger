<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'mapIndex',
  props: {},
  data() {
    return {};
  },
  computed: {
    cacheList() {
      console.log(
        this.$store.getters.keepAlive,
        'this.$store.getters.keepAlive'
      );

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
