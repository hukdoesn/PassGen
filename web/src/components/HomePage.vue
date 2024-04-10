<template>
  <div class="container">
    <div class="tooltip" v-if="showTooltip">
      <img src="../assets/svg/success.svg" alt="Success">
      <span>{{ tooltipMessage }}</span>
    </div>
    <div class="support_button">
      <!-- <img src="../assets/svg/support.svg" alt=""> -->
      <div class="text_support_github" @click="toggleDonationModal">
        <img src="../assets/svg/support_button.svg" alt="">
        <span class="text_button text_color">支持</span>
      </div>
      <!-- 打赏模态框 -->
      <div class="donation-modal" v-if="showDonationModal">
        <div class="modal-content">
          <span class="close-modal" @click="toggleDonationModal">&times;</span>
          <div class="header-content"> <!-- 新添加的包裹容器 -->
            <img src="../assets/svg/cat.jpg" alt="" class="cat-image">
            <h2>生活不易，猫猫叹气，喝杯咖啡继续做牛马。</h2>
          </div>
          <div class="payment-options">
            <div class="alipay">
              <h3>支付宝打赏</h3>
              <img src="../assets/svg/alipay.png" alt="支付宝二维码">
            </div>
            <div class="wechat">
              <h3>微信打赏</h3>
              <img src="../assets/svg/wechatpay.png" alt="微信二维码">
            </div>
          </div>
        </div>
      </div>

      <div class="Isolate">
        <img src="../assets/svg/Isolate.svg" alt="">
      </div>
      <div class="github" @click="openGithub">
        <img src="../assets/svg/github.svg" alt="">
        <span class="text_button text_color">Github</span>
      </div>
    </div>
    <div class="text">
      <img src="../assets/svg/text.svg" alt="">
    </div>
    <div class="main">
      <div class="sidebar">
        <div class="mac-controls">
          <span class="control close"></span>
          <span class="control minimize"></span>
          <span class="control maximize"></span>
        </div>
        <div class="backdrop-wrapper" :style="{ top: isBackdropOnBlog ? '55%' : '40%' }">
          <div class="backdrop">
            <img src="../assets/svg/block.svg" alt="">
          </div>
        </div>
        <div class="selected" :style="{ top: isBackdropOnBlog ? '55%' : '40%' }">
          <img src="../assets/svg/selected.svg" alt="">
        </div>
        <div class="decorate">
          <img src="../assets/svg/bar.svg" alt="">
        </div>
        <div class="lock" @click="moveToLock">
          <img src="../assets/svg/lock.svg" alt="">
        </div>
        <div class="blog" @click="moveToBlog">
          <img src="../assets/svg/blog.svg" alt="">
        </div>
      </div>
      <div class="content">
        <div class="text_title">
          <span class="tutu text_button">胡图图不涂涂</span>
        </div>
        <router-view></router-view>
        <div class="sub-content" v-if="showSubContent">
          <div class="figure">
            <div class="main_figure">
              <img src="../assets/svg/figure.svg" alt="">
            </div>
          </div>
          <div class="main_content">
            <div class="generated">
              <span class="text_button">已生成的密码：</span>
            </div>
            <div class="passwdbox">
              <div class="main_passwdbox">
                <div class="text_passwdbox">
                  <img src="../assets/svg/passwdbox.svg" alt="">
                  <div class="text_create">
                    <!-- 在显示密码的<span>标签中添加双击事件监听，并使用navigator.clipboard.writeText方法将其写入剪贴板-->
                    <span v-for="(password, index) in generatedPasswords" :key="index" @dblclick="copyPasswordToClipboard(password)">
                      {{ password }}
                    </span>
                  </div>
                  <div class="renovate" @click="fetchPasswords(); triggerRotateAnimation()">
                    <img ref="renovateIcon" src="../assets/svg/Renovate.svg" alt="">
                  </div>
                </div>
              </div>
              <div class="copy">
                <div class="copy_button" @click="fetchPasswords">
                  <img src="../assets/svg/copy.svg" alt="">
                  <div class="text_copy">
                    <span class="text_button">生成</span>
                  </div>
                </div>
              </div>
              <div class="range-slider">
                <input class="range-slider__range" type="range" v-model="rangeValue" min="1" max="30" @input="fetchPasswords">
                <span class="password-length-label text_button">密码长度：</span>
                <input class="range-slider__value" v-model="rangeValue" type="text" ref="inputRef">
              </div>
              <div class="option">
                <div class="characters ">
                  <span class="text_button">已使用的字符：</span>
                </div>
                <div class="option_button">
                  <!-- 使用@click绑定了toggleCheck方法，将data中buttons对象中的对应属性的值取反，实现点击后，对应的复选框图标变化 -->
                  <div class="main_button uppercase_button" @click="toggleCheck('uppercase')">
                    <!-- img的src根据data中buttons对象的状态动态更改 -->
                    <img :src="buttons.uppercase ? checkedImg : uncheckedImg" alt="">
                    <span class="text_button">ABC</span>
                  </div>
                  <div class="main_button lowercase_button" @click="toggleCheck('lowercase')">
                    <img :src="buttons.lowercase ? checkedImg : uncheckedImg"  alt="">
                    <span class="text_button">abc</span>
                  </div>
                  <div class="main_button number_button"  @click="toggleCheck('number')">
                    <img :src="buttons.number ? checkedImg : uncheckedImg" alt="">
                    <span class="text_button">123</span>
                  </div>
                  <div class="main_button complex" @click="toggleCheck('complex')">
                    <img :src="buttons.complex ? checkedImg : uncheckedImg" alt="">
                    <span class="text_button">!@#¥%^&*</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import { generatePasswordAPI } from '../api/passwordGenerator';

export default {
  name: 'range-slider',

  data() {
    return {
      rangeValue: 10,  // 密码长度初始长度
      isBackdropOnBlog: false,  // 默认为false，表示点击背景初始位置不在blog上
      showDonationModal: false, // 控制打赏模态框的显示隐藏

      // 密码复杂度，复选框选中
      buttons: {
        uppercase: true,
        lowercase: true,
        number: true,    // 默认只有number_button是选中的
        complex: false,
      },

      // SVG图片路径，使用require来确保Webpack正确处理
      checkedImg: require("../assets/svg/confirm_button.svg"),  // 选中状态的图片
      uncheckedImg: require("../assets/svg/option_button.svg"), // 未选中状态的图片

      generatedPasswords: [], // 存储生成的密码

      showTooltip: false,  // 控制tooltip的显示隐藏
      tooltipMessage: '',  // 存储要显示的消息文本
    };  
  },

  beforeRouteEnter(to, from, next) {
    // 在路由进入之前调用。
    // 用于在组件实例创建之前进行逻辑处理。
    // 注意：此时无法访问 `this`，因为组件尚未被创建。
    next(vm => {
      // 通过 `vm` 参数访问组件实例。
      // 根据即将进入的路由路径设置 `isBackdropOnBlog` 的值。
      vm.isBackdropOnBlog = to.path === '/blog';  // 根据新路由路径更新状态。
    });
  },
  beforeRouteUpdate(to, from, next) {
    // 组件挂载后调用。
    // 适用于需要在组件首次加载时执行的代码。
    this.isBackdropOnBlog = to.path === '/blog';  // 根据新路由路径更新状态。
    next();   // 必须调用 `next` 函数以解析该钩子。
  },

  // 使用ref="inputRef"在<input>元素上创建了一个引用，可以通过this.$refs.inputRef在Vue组件内部访问该元素。
  // 在mounted生命周期钩子中调用focusInput方法。$nextTick确保DOM更新完成后再尝试聚焦，这是因为直接在mounted钩子中聚焦可能由于DOM尚未完全渲染而失败。
  // focusInput方法将焦点设置到输入框上，这导致光标自动出现并开始闪烁。
  mounted() {
    this.focusInput();  // 组件挂载后，自动聚焦到输入框

    this.fetchPasswords();    // 页面加载时自动获取密码

    document.addEventListener('selectionchange', this.handleSelectionChange);

    this.$nextTick(() => {
      // 当组件挂载后设置 `isBackdropOnBlog` 值
      if (this.$refs.inputRef) { // 检查inputRef是否存在
        this.$refs.inputRef.focus();
      }
      this.isBackdropOnBlog = this.$route.path === '/blog';
    });
  },

  methods: {
    focusInput() {
      // 在DOM更新后聚焦到inputRef元素
      this.$nextTick(() => {
        if (this.$refs.inputRef) { // 检查inputRef是否存在
          this.$refs.inputRef.focus();
        }
      });
    },
    
  toggleDonationModal() {
    this.showDonationModal = !this.showDonationModal;
  },
  // 旋转动画方法
  triggerRotateAnimation() {
    const renovateIcon = this.$refs.renovateIcon;
    renovateIcon.classList.add('rotate-animation');
    renovateIcon.addEventListener('animationend', () => {
      renovateIcon.classList.remove('rotate-animation');
    }, { once: true });
  },

    async fetchPasswords() {
      try {
        const response = await generatePasswordAPI({
          length: this.rangeValue,
          uppercase: this.buttons.uppercase,
          lowercase: this.buttons.lowercase,
          number: this.buttons.number,
          complex: this.buttons.complex,
        });
        // 后端返回的密码列表在passwords字段中
        this.generatedPasswords = response.passwords;
      } catch (error) {
        console.error('Error fetching passwords:', error);
      }
    },

    copyPasswordToClipboard(password) {  // 双击选中
      navigator.clipboard.writeText(password).then(() => {
        this.tooltipMessage = '密码已成功复制';
        this.showTooltip = true;

        setTimeout(() => {
          this.showTooltip = false;
        }, 1000); // 1秒后隐藏tooltip
      }).catch(err => {
        console.error('Could not copy password: ', err);
      });
    },

    handleSelectionChange() {    // 滑动选中
    const selection = document.getSelection().toString();
    if (this.generatedPasswords.includes(selection)) {
      navigator.clipboard.writeText(selection).then(() => {
        this.tooltipMessage = '选中的密码已复制';
        this.showTooltip = true;
        setTimeout(() => {
          this.showTooltip = false;
        }, 1000); // 显示提示1秒后消失
      }).catch(err => console.error('复制失败:', err));
    }
  },

    beforeDestroy() {
    // 组件销毁前移除事件监听器，避免内存泄漏
      document.removeEventListener('selectionchange', this.handleSelectionChange);
    },



    toggleCheck(button) {
      // 切换指定按钮的选中状态
      this.buttons[button] = !this.buttons[button];
    },

    moveToBlog() {
      this.isBackdropOnBlog = true;    // 移动到blog
      this.$router.push('/blog'); // 导航到blog页面
    },
    moveToLock() {
      this.isBackdropOnBlog = false;     // 移动到lock
      this.$router.push('/'); // 导航到home页面
    },

    openGithub() {
    const url = "https://github.com/hukdoesn"; // GitHub仓库URL
    window.open(url, '_blank');
    },
  },

  watch: {
    rangeValue(newValue) {
      // 监视rangeValue的变化，保证其在0到30的范围内
      this.rangeValue = Math.max(0, Math.min(30, parseInt(newValue, 10) || 0));
    }
  },
  computed: {
  showSubContent() {
    // 检查当前路由，如果是 '/blog' 则不显示 sub-content
    return this.$route.path !== '/blog';
  }
}

}
</script>

<style>
html, body {
  height:100%;
  width:100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border: 0;
}


.container {
  display: flex;
  flex-direction: column;
  /* 修改为垂直排列 */
  justify-content: flex-start; /*确保子元素从顶部开始 */
  /* justify-content: space-between; */
  align-items: center;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #12141D;
}


/* 禁止用户拖拽图片 */
img {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Chrome/Safari/Opera */
  -khtml-user-select: none;
  /* Konqueror */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently not supported by any browser */
  -webkit-user-drag: none;
}

.support_button {
  position: relative;
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中对齐子元素 */
  justify-content: space-around; /* 子元素之间平均分布空间 */
  top: 20px;
  background-image: url('../assets/svg/support.svg'); /* 将背景板设置为背景图片 */
  background-size: contain; /* 背景图片覆盖整个容器 */
  background-repeat: no-repeat;
  left: 40%;
  width: 180px;
  height: 50px;
}


.text_support_github, .github {
  cursor: pointer;
}

.text_support_github img,
.github img {
  margin-right: 5px; /* 调整右边距 */
  vertical-align: middle; /* 确保图标和文本垂直居中对齐 */
}

.text_support_github span,
.github span {
  vertical-align: middle; /* 确保文本垂直居中对齐 */
}

.text_color {
  color: #FFFFFF;
  font-size: 15px;
}

.main {
  /* 新增的样式 */
  display: flex;
  flex-direction: row;
  /* 保持 sidebar 和 content 水平排列 */
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  /*调整main和text标题之间的距离 */
}

.sidebar {
  width: 86px;
  height: 552px;
  background-color: rgba(29, 32, 62, 0.3);
  position: relative;
  /* 添加相对定位 */
  overflow: hidden;
}

.mac-controls {
  display: flex;
  /* 设置 Flexbox 布局 */
  justify-content: center;
  /* 居中对齐 */
  gap: 8px;
  padding-top: 10px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  /* 圆形按钮 */
  cursor: pointer;
}

.control.close {
  background-color: #ff605c;
  /* 关闭按钮颜色 */
}

.control.minimize {
  background-color: #ffbd44;
  /* 最小化按钮颜色 */
}

.control.maximize {
  background-color: #00ca4e;
  /* 最大化按钮颜色 */
}

.backdrop-wrapper {
  position: absolute;
  /* 绝对定位*/
  top: 40%;
  /* top: 55%; */
  left: 3px;
  width: 86px;
  height: 86px;
  transform: translateY(-50%);
  /* 在垂直方向上向上移动元素的一半高度，以实现垂直居中效果 */
  overflow: hidden;
  /* 隐藏溢出元素边框的内容 */
  z-index: 9;
  /* 控制元素的堆叠顺序，较高的值位于顶部 */
  border-radius: 50%;
  /* 设置边框为圆形，值为50%时形成圆形 */
  filter: blur(8px) brightness(120%);
  /* 应用模糊效果并调整亮度为原亮度的120% */
  display: flex;
  justify-content: center;
  align-items: center;
}

.backdrop {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  /* 边框为圆形 */
  overflow: hidden;
  /* 隐藏溢出边框的内容 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  left: 4px;
  z-index: 11;
  /* 确保在 .decorate 上方 */
}

.lock {
  position: absolute;
  top: 40%;
  /* 垂直中心位置*/
  transform: translateY(-50%);
  left: 20%;
  z-index: 11;
  /* filter: brightness(1); */
  /*l调整亮度*/
}

.blog {
  position: absolute;
  top: 50%;
  left: 20%;
  z-index: 11;
}

.decorate {
  position: absolute;
  /* 设置绝对定位 */
  height: 552px;
  top: 0;
  right: 0;
  /* 使图片靠近右侧 */
  z-index: 10;
  /* 确保图片浮于control元素和mac-controls元素内容之上 */
  /* opacity: 0.8; 设置透明度以便于 .backdrop 颜色能透视出来 */
  padding: 0;
}


.content {
  position: relative;
  /* 添加相对定位 */
  flex-direction: column;
  /* 改为垂直排列 */
  display: flex;
  width: 990px;
  height: 552px;
  background-color: rgba(44, 47, 72, 0.5);
}

.sub-content {
  /* 新增的容器的样式 */
  display: flex;
  /* 使用 Flexbox */
  width: 100%;
  /* 占满全部可用宽度 */
  height: 100%;
  /* 占满全部可用高度 */
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
}

.text_title {
  position: relative; /* 为伪元素定位提供基准 */
  padding-top: 10px;
  top: 0;
  width: 100%;
  height: 40px;
  /* 定义样式、宽度和颜色 */
}

.text_title::after {
  content: ""; /* 伪元素需要content属性 */
  position: absolute;
  left: 0; 
  bottom: 0; /* 放置于text_title元素的底部 */
  width: 25%; /* 自定义边框的长度，这里设置为text_title宽度的50% */
  height: 1px; /* 边框的厚度 */
  background: rgba(255, 255, 255, 0.1); /* 边框的颜色和透明度 */
}


.figure {
  height: calc(100% - 50px);
  /*  .text_title 高度+padding上边距共50px，用100%父元素-50px=占比满 */
  display: flex;
  /* 可以帮助内容居中或对齐，视需要而定 */
  /* justify-content: center;  */
  align-items: center;
  /* 垂直居中 */
  padding: 0;
  /* 确保没有额外的内边距 */
  /* padding-left: 50px; */
  margin-left: 50px;
  width: 50%;
}

.figure img {
  max-height: 100%;
  /* 限制图片高度不超过 .figure 的高度 */
  width: auto;
  /* 保持图片的宽高比 */
}


.tutu {
  padding-left: 10px;
  /* position: relative; */
  /* 设置相对定位，为伪元素定位提供基准 */
  color: #fff;
  font-size: 17px;
  font-weight: bold;
}

.main_content {
  height: 100%;
  width: 65%;
  /* position: relative; */
}

.generated {
  /* margin-bottom: 10px; */
  position: relative;
  top: 10%;
}

.generated span {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}

.passwdbox {
  position: relative;
  top: 12%;
  width: 440px;
}

.text_passwdbox {
  position: relative;
  width: 440px;
  height: 98px;
}

.text_create {
  display: flex; /* 启用Flexbox布局 */
  flex-direction: column; /* 子元素沿垂直方向排列 */
  justify-content: center; /* 水平居中 */
  gap: 2px; /* 设置子元素之间的垂直间隔为1px */
  position: absolute;
  top: 8px;
  left: 15px;
  width: 80%;
  height: 88%;
}


.text_create span {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}

.renovate {
  display: inline-block; /* 让容器根据内容调整大小 */
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer; 
}

/* 旋转动画 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate-animation {
  animation: rotate 0.5s ease-in-out;
}


/* 给.copy元素应用Flex布局，以便在其内部居中对齐子元素 */
.copy {
  display: flex;
  /* 使用Flex布局 */
  justify-content: flex-end;
  /* 内容靠右对齐 */
  align-items: center;
  /* 新增，垂直居中对齐所有子元素 */
  position: relative;
  /* 相对定位 */
  width: 100%;
  /* 确保占满父元素的宽度 */
  height: 100%;
  margin: 15px 0 24px 0;
}

.copy_button {
  width: 86px;
  height: 48px;
  position: relative;
  cursor: pointer; 
  /* 相对定位 */
}

.text_copy {
  position: absolute;
  /* 绝对定位*/
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 通过将元素向左和向上各自移动50%的自身宽度和高度，可以实现将元素的中心点与其父容器的中心点对齐 */
}

.text_copy span {
  color: #FFFFFF;
  /* 文本颜色 */
  font-size: 15px;
}


.slider-container {
  position: relative;
  width: 100%;
  margin: 20px 0;
  /* 调整滑动选择器的位置 */
}

.range-slider {
  width: 100%;
  height: 100%;
  position: relative;
}

.range-slider__range {
  -webkit-appearance: none;
  width: calc(100% - (230px));
  height: 10px;
  border-radius: 5px;
  /* background: #d7dcdf; */
  background: rgba(0, 0, 0, 0.5);
  outline: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.range-slider__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  /* background: #2c3e50; */
  background: #FFFFFF;
  cursor: pointer;
  -webkit-transition: background 0.15s ease-in-out;
  transition: background 0.15s ease-in-out;
}

.range-slider__range::-webkit-slider-thumb:hover {
  background: #1abc9c;
}

.range-slider__range:active::-webkit-slider-thumb {
  background: #1abc9c;
}

.range-slider__range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 50%;
  /* background: #2c3e50; */
  background: #fff;
  cursor: pointer;
  -moz-transition: background 0.15s ease-in-out;
  transition: background 0.15s ease-in-out;
}

.range-slider__range::-moz-range-thumb:hover {
  background: #1abc9c;
}

.range-slider__range:active::-moz-range-thumb {
  background: #1abc9c;
}

.range-slider__range:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px #fff, 0 0 0 6px #1abc9c;
}

.range-slider__value {
  background-color: transparent;
  color: #FFFFFF;
  width: 20px;
  border: none;
  /* 移除边框 */
  text-align: center;
  /* 使文本居中 */

  line-height: 20px;
  /* 调整行高以垂直居中文本 */
  padding: 0;
  /* 调整填充以缩小输入框的大小 */
  /* 调整字体大小以适应较小的输入框 */
  font-size: 15px;
}

/* 增强样式：去除输入框的外焦点轮廓 */
.range-slider__value:focus {
  outline: none;
}

.password-length-label {
  color: #ffffff;
  font-size: 15px;
}



::-moz-range-track {
  background: #d7dcdf;
  border: 0;
}

input::-moz-focus-inner,
input::-moz-focus-outer {
  border: 0;
}

.option {
  margin-top: 40px;
}

.option_button {
  display: flex;  /* 启用Flexbox布局 */
  align-self: center; /* 垂直居中对齐子元素 */
  gap: 24px;  /* 设置子元素之间的间距 */
}

.characters span {
  color: #FFFFFF;
  font-size: 15px;
}

.characters {
  margin-bottom: 20px;
}

.main_button {
  display: flex; /* 启用Flexbox布局 */
  align-items: center; /* 垂直居中对齐子元素 */
  gap: 10px; /* 设置子元素之间的间距 */
}

.main_button, .lock, .blog img {
  cursor: pointer;  /*鼠标指针*/
}


.main_button span {
  color: #FFFFFF;
  font-size: 15px;
}

.text_button {
  user-select: none;  /*页面文字不能被选中*/
}

/* 复制弹窗 */

.tooltip {
  display: flex;
  align-items: center;
  position: fixed;
  top: 40px; 
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  /* background-color: #333; */
  color: #fff;
  font-size: 15px;
  /* border-radius: 4px; */
  z-index: 1000;
}

.tooltip img {
  margin-right: 8px;
}



.donation-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.modal-content h2 {
  text-align: center; /* 使文本居中对齐 */
}


.modal-content {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center; /* 确保子元素在交叉轴上居中 */
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  border-radius: 5px;
  padding: 20px;
}

.close-modal {
  float: right;
  font-size: 28px;
  cursor: pointer;
  align-self: flex-end; /* 对齐到右边 */
  margin-bottom: 10px; /* 调整到顶部的距离 */
}

.payment-options {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  padding-bottom: 20px;
}

.payment-options div {
  text-align: center;
}

.payment-options img {
  width: 200px; /* 二维码图片大小调整 */
}


.header-content {
  display: flex;
  align-items: center; /* 使图片和标题在垂直方向上居中对齐 */
  justify-content: center; /* 在水平方向上居中显示 */
  text-align: center; /* 确保h2内的文本居中对齐 */
  flex-wrap: wrap; /* 允许内容换行，以适应不同屏幕大小 */
  padding-bottom: 20px;
}

.cat-image {
  margin-right: 10px; /* 调整图片与标题之间的间距 */
  margin-left: 40px;
  width: 100px; /* 根据图片实际大小调整 */
  height: auto; /* 保持图片的原始宽高比 */
}



</style>