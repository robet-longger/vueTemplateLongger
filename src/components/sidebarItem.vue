<template>
  <div>
    <label v-for="item in menuList" :key="item.path">
      <div v-if="!item.hidden">
        <el-menu-item :index="item.path" v-if="!item.children">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
        <el-submenu :index="item.path" v-else popper-append-to-body>
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <!-- 递归组件调用自身 -->
          <sidebar-item :menuList="item.children" />
        </el-submenu>
      </div>
    </label>
  </div>
</template>
<script>
export default {
  name: 'sidebarItem',
  props: {
    // route object
    menuList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>