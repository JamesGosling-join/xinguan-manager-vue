<template>
  <div id="UserSwagger">
    <iframe src="http://localhost:8004/swagger-ui.html" id="mobsf"
            frameborder="0" style="position:absolute;"></iframe>
  </div>
</template>

<script>
  export default {
    name: "RepertoryServiceSwagger",
    data() {
      return {}
    },
    mounted() {
      /**
       * iframe-宽高自适应显示
       */
      function changeMobsfIframe() {
        const mobsf = document.getElementById('mobsf');
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        mobsf.style.width = (Number(deviceWidth) - 220) + 'px'; //数字是页面布局宽度差值
        mobsf.style.height = (Number(deviceHeight) - 80) + 'px'; //数字是页面布局高度差
      }

      changeMobsfIframe()

      window.onresize = function () {
        changeMobsfIframe()
      }
    }
  }
</script>

<style scoped>

</style>
