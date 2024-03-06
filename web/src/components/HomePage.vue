<template>
  <div class="container">
    <span class="heading">Pass&nbsp;Gen</span>
    <span class="subtitle">PassGen是一个在线生成随机密码的工具。更安全的密码可保护您的隐私和安全</span>
    <div class="intro-content">
      <div class="passbox">
        <div class="mac-controls">
          <span class="control close"></span>
          <span class="control minimize"></span>
          <span class="control maximize"></span>
        </div>
      </div>
      <div class="sidebar-svg">
        <svg width="88" height="678" viewBox="0 0 88 678" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_bd_84_1553)">
          <path d="M69 0H88V677.5H69V519.261C69 505.265 62.3412 492.104 51.0652 483.813L18.9348 460.187C7.65879 451.896 1 438.735 1 424.739V130.261C1 116.265 7.65879 103.104 18.9348 94.8126L51.0652 71.1874C62.3412 62.8962 69 49.7349 69 35.7387V0Z" fill="#383A57" fill-opacity="0.5" shape-rendering="crispEdges"/>
          </g>
          <defs>
          <filter id="filter0_bd_84_1553" x="-29" y="-30" width="147" height="737.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="15"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_84_1553"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-1"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"/>
          <feBlend mode="normal" in2="effect1_backgroundBlur_84_1553" result="effect2_dropShadow_84_1553"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_84_1553" result="shape"/>
          </filter>
          </defs>
        </svg>
      </div>
      <div class="sidebar-svg1">
      </div>
    </div>
    <div class="sidebar">
    </div>
  </div>
</template>

<script>
</script>

<style>
html,
body {
  width: 100vw;
  height: 100vh;
  background-color: #12141D;
  margin: 0;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
}

.heading {
  position: absolute;
  top: 0;
  transform: translateY(-20%);
  width: 100%;
  margin: 60px 0;
  text-align: center;
  /* 18px是最小字体大小，30px是最大字体大小，5vw是根据视口宽度调整的理想字体大小 */
  font-size: clamp(18px, 5vw, 60px); 
  /* 设置元素的背景为一个线性渐变，指定了渐变的起止位置 */
  background: linear-gradient(137.34deg, #a73ee7 40.76%, #00ebff 60%), #ffffffe6;
  /* 将背景仅裁剪至文本，使得背景仅在文本的形状内可见 */
  -webkit-background-clip: text !important;
  /* 将文本颜色设置为透明，使得文本形状展示为背景渐变 */
  -webkit-text-fill-color: transparent;

}

.subtitle {
  position: absolute;
  top: 150px;
  font-size: clamp(8px, 5vw, 25px);
  color: #ffffffe6;
  /* 设置最小字体大小 */
}

.intro-content { 
  width: 65vw;
  height: 60vh;
  background-color: rgb(197, 191, 191);
  border-radius: 10px;
  /* 相对定位 */
  position: relative;
  top: 80px; /* 向下移动100像素 */
}

.sidebar-svg {
  position: absolute; /* 使用绝对定位 */
  top: 0;
  left: 0;
  /* width: 100%;
  height: 100%; */
}

/* .png {
  width: 100px;
  height: 66vh;
} */


/* 媒体查询 */
@media (max-height: 500px) {

  .heading,
  .subtitle {
    position: static;
    /* 调整定位以防止内容重叠 */
    transform: none;
    margin: 20px 0;
    /* 调整了所有方向的间距 */
  }

  .container {
    flex-direction: column;
    /* 调整布局以适应更小的高度 */
  }
  .sidebar {
  top: 351px;
  left: 182px;
  width: 86px;
  height: 552px;
  background: #1d203e4d;
  backdrop-filter: blur(20px);
  }
/* 在原有样式下添加 */

}
.passbox {
  background-color: #282c34; /* 暗色主题背景色 */
  width: 65vw;
  height: 60vh;
  border-radius: 5px; /* 轻微圆角 */
  padding: 20px; /* 内边距 */
  color: #abb2bf; /* 文字颜色 */
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace; /* 代码字体 */
}

.mac-controls {
  display: flex;
  justify-content: start;
  gap: 8px; /* 控制按钮之间的间隔 */
  padding-bottom: 10px; /* 与代码内容之间的距离 */
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%; /* 圆形按钮 */
  cursor: pointer;
}

.control.close {
  background-color: #ff605c; /* 关闭按钮颜色 */
}

.control.minimize {
  background-color: #ffbd44; /* 最小化按钮颜色 */
}

.control.maximize {
  background-color: #00ca4e; /* 最大化按钮颜色 */
}


</style>
