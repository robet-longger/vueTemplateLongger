<template>
  <div class="hello">
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside width="200px" class="el-aside">
        <div class="sidebar-logo">
          <span class="sidebar-img">
            <img src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png" width="20px" />
          </span>
          <span class="sidebar-title" v-if="!isCollapse">系统模板</span>
        </div>
        <div class="curAside">
          <el-menu @select="handleSelect" :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" router background-color="#304156" active-text-color="#ffd04b" text-color="#fff" unique-opened>
            <sidebar-item :menuList="curRouters" />
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <div class="fixed-header">
            <div class="hamburger-container" @click="handlHamburger">
              <i :class="iconType"></i>
            </div>
          </div>
          <div class="dropdown">
            <el-dropdown @command="handleCommand">
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="signOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
          </div>
        </el-header>
        <el-main>
          <div class="curMain">
            <div class="tag" ref="tag">
              <li v-for="(item,index) in tagList" :key="index" :class="{'tagCommonLi' : tagTabIndex === index}" @click="handleTag(item,index)">
                <span class="tag_yuan" v-if="tagTabIndex === index"></span>
                <span class="tag_title">{{item.meta.title}}</span>
                <span class="tag_x" v-if="tagTabIndex === index && tagTabIndex !==0" @click.stop="handleTagDel(item,index)">
                  <i class="el-icon-close"></i>
                </span>
              </li>
            </div>
            <transition name="fade-transform" mode="out-in">
              <keep-alive :include="cacheList">
                <router-view :key="key" />
              </keep-alive>
            </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { isExternal } from '@/utils/index';
import SidebarItem from './SidebarItem';
import { asyncRoutes, resetRouter, homeRoutes } from '@/router';
import { removeToken } from '@/utils/auth';

export default {
  components: { SidebarItem },
  name: 'layout',
  data() {
    return {
      cacheList: ['home', 'mapIndex'],
      routeList: ['/site/home'],
      iconType: 'el-icon-s-fold',
      isCollapse: false,
      tagList: [
        {
          path: '/site/home',
          name: 'home',
          meta: { title: '首页', icon: 'home' }
        }
      ],
      tagTabIndex: 0
    };
  },
  computed: {
    // keepAliveList() {
    //   console.log(this.$store.getters.keepAlive, 'keepAlive缓存');
    //   return this.$store.getters.keepAlive;
    // },
    key() {
      console.log(this.$route);
      if (this.routeList.indexOf(this.$route.path) === -1) {
        this.routeList.push(this.$route.path);
        this.tagList.push(this.$route);
        this.cacheList.push(this.$route.name);
        // console.log(this.cacheList, 'cacheList');
      }
      this.routeList.map((item, index) => {
        if (this.$route.path === item) {
          this.tagTabIndex = index;
        }
      });
      console.log(this.cacheList, 'this.cacheList');

      this.$store.commit('SET_KEEP_ALIVE', this.cacheList);

      return this.$route.path;
    },
    curRouters() {
      // var routerArr = this.$router.options.routes[1].children;
      return asyncRoutes[0].children;
    }
  },
  mounted() {
    // this.$refs['tag'].oncontextmenu = function(e) {
    //   return false;
    // };
    $('.curAside').css({
      height: $(window).height() - 90
    });
    $('.curMain').css({
      height: $(window).height() - 90
    });
    window.onresize = () => {
      $('.curAside').css({
        height: $(window).height() - 90
      });
      $('.curMain').css({
        height: $(window).height() - 90
      });
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      // console.log(this.$route);
    },
    handleTag(item, index) {
      this.tagTabIndex = index;
      this.$router.push(item.path);
    },
    handleTagDel(item, index) {
      this.tagList.splice(index, 1);
      this.routeList.splice(index, 1);
      this.cacheList.splice(index, 1);

      this.tagTabIndex = this.tagList.length - 1;
      this.$router.push(this.tagList[this.tagList.length - 1].path);
    },
    handleCommand(command) {
      switch (command) {
        case 'signOut':
          removeToken(); //退出时删除token
          // resetRouter(); //退出时重置路由
          localStorage.removeItem('userName');
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          break;
      }
    },
    handlHamburger() {
      this.isCollapse = !this.isCollapse;
      this.iconType = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold';
      if (this.isCollapse) {
        $('.el-aside').animate(
          {
            width: '50px'
          },
          300
        );
      } else {
        $('.el-aside').animate(
          {
            width: '200px'
          },
          300
        );
      }
    }
  }
};
</script>

<style scoped lang='less'>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.sidebar-logo {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  cursor: pointer;

  // text-align: center;
  overflow: hidden;
  .sidebar-img {
    margin-left: 25px;
  }
  .sidebar-title {
    color: #fff;
    margin-left: 10px;
  }
}
.fixed-header {
  position: relative;
  height: 50px;
  width: 100%;
  .hamburger-container {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 25px;
  }
}
.dropdown {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
}
.el-menu {
  border-right: 1px solid;
}
.el-header {
  position: relative;
  background-color: #409eff;
  color: #fff;
  line-height: 50px;
  height: 50px !important;
}

.el-aside {
  background-color: #304156;
  overflow: hidden;
}
.el-menu {
  border-right: 1px solid #304156 !important;
}
.tagCommonLi {
  cursor: pointer;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  line-height: 25px;
  padding: 0 10px;
  background-color: #48b885 !important;
  .tag_yuan {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff !important;
  }
  .tag_title {
    font-size: 14px;
    color: #fff !important;
  }
  .tag_x {
    padding: 5px;
    color: #fff;
    font-size: 10px;
  }
}
.el-main {
  overflow: hidden;
  padding: 0;
  .curMain {
    .tag {
      // height: 30px;
      padding: 5px;
      border-top: 1px solid #d8dce4;
      border-bottom: 1px solid #d8dce4;
      display: flex;
      li {
        cursor: pointer;
        margin-right: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        line-height: 25px;
        padding: 0 10px;
        background-color: #fff;
        .tag_yuan {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .tag_title {
          font-size: 14px;
        }
        .tag_x {
          padding: 5px;
          font-size: 10px;
        }
      }
    }
  }
}
</style>
