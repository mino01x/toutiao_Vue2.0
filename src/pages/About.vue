<template>
  <div class="about_template">
    <div class="about_login">
      <div class="login_icon" @click="open">
        <Icon type="social-github" color="#fff"></Icon>
      </div>
    </div>
    <c-nav :list="list[0]" @click0="github"></c-nav>
    <c-nav :list="list[1]" @click0="open" @click1="open" @click2="open"></c-nav>
    <c-nav :list="list[2]" @click0="open" @click1="open" @click2="open"></c-nav>
    <Modal v-model="ifModal" class-name="del_dialog">
      <p slot="header" class="del_header">
        <Icon type="information-circled"></Icon>
        <span>待解封</span>
      </p>
      <div class="del_content">
        <p>隐藏着黑暗力量的钥匙啊,在我面前显示你真正的力量！现在以你的主人，小花之名命令你——封印解除！  </p>
        <p>封印解除失败</p>
      </div>
      <div slot="footer" class="del_footer">
        <Button type="error" size="large" long @click="close">放弃</Button>
      </div>
    </Modal>
    <c-footer></c-footer>
  </div>
</template>
<script>
import CNav from '../components/Nav.vue'
import CFooter from '../components/Footer.vue'

export default {
  components: {
    CNav,
    CFooter
  },
  data () {
    return {
      list: [
        [
          {msg: 'Github'}
        ],
        [
          {msg: '待解封'},
          {msg: '待解封'}
        ],
        [
          {msg: '待解封'},
          {msg: '待解封'},
          {msg: '待解封'}
        ]
      ],
      ifModal: false
    }
  },
  methods: {
    github () {
      window.open('https://github.com/Huahua-Chen/toutiao_Vue2.0')
    },
    close () {
      this.ifModal = false
    },
    open () {
      this.ifModal = true
    }
  }
}
</script>
<style lang="scss">
  @import '../assets/style/common.scss';

  .about_template {
    background: #eee;
    overflow: auto;
    padding-bottom: px2rem(80px);
  }
  .about_login {
    height: 6rem;
    background: url('../assets/image/data.jpg');
    background-size: cover;
    // filter: blur(1px);
    position: relative;
    .login_icon {
      font-size: px2rem(120px);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .about_myInfo {
    height: 2rem;
    background: #fff;
  }

</style>
