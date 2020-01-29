<template>
  <div>
    <div class="header">
      <Menu mode="horizontal" theme="light" :active-name="active" @on-select="select">
        <MenuItem name="1">
          <!-- <Icon type="ios-home" /> -->
          综合排行
        </MenuItem>
        <MenuItem name="2">
          <!-- <Icon type="ios-" /> -->
          地区分析
        </MenuItem>
        <MenuItem name="3">
          行业分析
        </MenuItem>
      </Menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '1'
    }
  },
  methods: {
    select(name) {
      this.$router.push({path: "/page/" + name})
    }
  },
  mounted() {
   this.active = this.$route.name
   if(this.active == 'home') {
     this.$router.replace({name: '1'})
     this.active = '1'
   }
  }
};
</script>
