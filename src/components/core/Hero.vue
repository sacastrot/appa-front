<script setup lang="ts">
import {onMounted, ref} from "vue";

const width = ref<number>(window.innerWidth);
const normalMobile = 410;
const laptop = 1024;
const tablet = 768;
const desktop = 1440;
const desktopLarge = 1920;
onMounted(() => {
  window.addEventListener("resize", () => {
    width.value = window.innerWidth;
  })
})
</script>
<template>
  <!--  For small mobile screens-->

  <svg v-if="width < normalMobile" class="background" id="Capa_1" width="100%" height="260" data-name="Capa 1"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 260" preserveAspectRatio="none">
    <path
        d="m320,0H0v148.8l21.94,19.52c21.94,20.33,65.38,60.17,109.25,74.81,43.87,14.64,87.31,4.88,131.18-19.51,15.24-10.15,41.83-26.73,57.63-47.91V0Z"
        style="fill: #000; opacity: 0.4; fill-rule: evenodd; stroke-width: 0px;"/>
    <foreignObject>
      <h1>Registrar paquete</h1>
    </foreignObject>
  </svg>

  <svg v-if="width < normalMobile" class="touch" id="Capa_1" data-name="Capa 1" width="100%" height="260"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 260" preserveAspectRatio="none">
    <path
        d="m320,0H0v148.8l21.94,19.52c21.94,20.33,65.38,60.17,109.25,74.81,43.87,14.64,87.31,4.88,131.18-19.51,15.24-10.15,41.83-26.73,57.63-47.91V0Z"
        style="fill: #9bbfe1; fill-rule: evenodd; stroke-width: 0px;"/>
    <defs>
      <clipPath id="clip-touch">
        <path
            d="m320,0H0v148.8l21.94,19.52c21.94,20.33,65.38,60.17,109.25,74.81,43.87,14.64,87.31,4.88,131.18-19.51,15.24-10.15,41.83-26.73,57.63-47.91V0Z"
            style="fill: #9bbfe1; fill-rule: evenodd; stroke-width: 0px;"/>
      </clipPath>
    </defs>
    <image x="0" y="0" width="320" height="260" xlink:href="/img/hero-mobile.png" clip-path="url(#clip-touch)"
           preserveAspectRatio="xMidYMid slice"/>
  </svg>

  <!--  For normal mobile-->

  <svg v-if="width >= normalMobile && (width < tablet)" class="background" id="Capa_1" width="100%" height="250"
       data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 250" preserveAspectRatio="none">
    <path
        d="m410,0H0v148.8l28.1,19.52c28.1,20.33,83.76,60.17,139.97,74.81,56.21,14.64,111.87,4.88,168.08-19.51,19.53-10.15,53.6-26.73,73.84-47.91V0Z"
        style="fill: #000; opacity: 0.4; fill-rule: evenodd; stroke-width: 0px;"/>
    <foreignObject>
      <h1>Registrar paquete</h1>
    </foreignObject>
  </svg>

  <svg v-if="width >= normalMobile && (width < tablet)" class="touch" id="Capa_1" data-name="Capa 1" width="100%"
       height="250"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 250" preserveAspectRatio="none">
    <path
        d="m410,0H0v148.8l28.1,19.52c28.1,20.33,83.76,60.17,139.97,74.81,56.21,14.64,111.87,4.88,168.08-19.51,19.53-10.15,53.6-26.73,73.84-47.91V0Z"
        style="fill: #9bbfe1; fill-rule: evenodd; stroke-width: 0px;"/>
    <defs>
      <clipPath id="clip-touch">
        <path
            d="m410,0H0v148.8l28.1,19.52c28.1,20.33,83.76,60.17,139.97,74.81,56.21,14.64,111.87,4.88,168.08-19.51,19.53-10.15,53.6-26.73,73.84-47.91V0Z"
            style="fill: #9bbfe1; fill-rule: evenodd; stroke-width: 0px;"/>
      </clipPath>
    </defs>
    <image x="0" y="0" width="410" height="250" xlink:href="/img/hero-mobile-normal.png" clip-path="url(#clip-touch)"
           preserveAspectRatio="xMidYMid slice"/>
  </svg>

  <!--  For tablet devices-->

  <svg v-if="width >= tablet && (width < laptop)" class="background" id="Capa_1" width="100%" height="250"
       data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 768 250" preserveAspectRatio="none">
    <path
        d="m768,0H0v148.8l52.65,19.52c52.65,20.33,156.9,60.17,262.19,74.81,105.29,14.64,209.55,4.88,314.84-19.51,36.58-10.15,100.4-26.73,138.32-47.91V0Z"
        style="fill: #000; opacity: 0.4; fill-rule: evenodd; stroke-width: 0px;"/>
    <foreignObject>
      <h1>Registrar paquete</h1>
    </foreignObject>
  </svg>

  <svg v-if="width >= tablet && (width < laptop)" class="touch" id="Capa_1" data-name="Capa 1" width="100%" height="250"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 768 250" preserveAspectRatio="none">
    <path
        d="m768,0H0v148.8l52.65,19.52c52.65,20.33,156.9,60.17,262.19,74.81,105.29,14.64,209.55,4.88,314.84-19.51,36.58-10.15,100.4-26.73,138.32-47.91V0Z"
        style="fill: #9bbfe1; fill-rule: evenodd; stroke-width: 0px;"/>
    <defs>
      <clipPath id="clip-touch">
        <path
            d="m768,0H0v148.8l52.65,19.52c52.65,20.33,156.9,60.17,262.19,74.81,105.29,14.64,209.55,4.88,314.84-19.51,36.58-10.15,100.4-26.73,138.32-47.91V0Z"
            style="fill: #9bbfe1; fill-rule: evenodd; stroke-width: 0px;"/>
      </clipPath>
    </defs>
    <image x="0" y="0" width="768" height="250" xlink:href="/img/hero.png" clip-path="url(#clip-touch)"
           preserveAspectRatio="xMidYMid slice"/>
  </svg>

  <!--  For laptop devices  -->

  <svg v-if="width >= laptop && (width < desktop)" class="background" id="Capa_1" width="100%" height="250"
       data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 250" preserveAspectRatio="none">
    <path
        d="m0,238.17l56.89-16.56c56.89-17.35,170.67-51.26,284.44-40.22,113.78,11.83,227.56,68.61,341.33,68.61s227.56-56.78,284.44-85.17l56.89-28.39V0H0v238.17Z"
        style="fill: #000; opacity: 0.4; fill-rule: evenodd;stroke-width: 0px;"/>
    <foreignObject>
      <h1>Registrar paquete</h1>
    </foreignObject>
  </svg>

  <svg v-if="width >= laptop && (width < desktop)" class="touch" id="Capa_1" data-name="Capa 1" width="100%"
       height="250"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 250" preserveAspectRatio="none">
    <path
        d="m0,238.17l56.89-16.56c56.89-17.35,170.67-51.26,284.44-40.22,113.78,11.83,227.56,68.61,341.33,68.61s227.56-56.78,284.44-85.17l56.89-28.39V0H0v238.17Z"
        style="fill: #9bbfe1; fill-rule: evenodd; opacity: .8; stroke-width: 0px;"/>
    <defs>
      <clipPath id="clip-touch">
        <path
            d="m0,238.17l56.89-16.56c56.89-17.35,170.67-51.26,284.44-40.22,113.78,11.83,227.56,68.61,341.33,68.61s227.56-56.78,284.44-85.17l56.89-28.39V0H0v238.17Z"
            style="fill: #9bbfe1; fill-rule: evenodd; opacity: .8; stroke-width: 0px;"/>
      </clipPath>
    </defs>
    <image x="calc(50% - 767px / 2)" y="0" width="767" height="333" xlink:href="/img/hero.png" clip-path="url(#clip-touch)"
           preserveAspectRatio="xMidYMid slice"/>
  </svg>


  <!--  For desktop screens-->
  <svg v-if="width >= desktop && (width < desktopLarge)" class="background" id="Capa_1" width="100%" height="317" data-name="Capa 1"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 317" preserveAspectRatio="none">
    <path d="m0,302l80-21c80-22,240-65,400-51,160,15,320,87,480,87s320-72,400-108l80-36V0H0v302Z"
          style="fill: #000; fill-rule: evenodd; opacity: .3; stroke-width: 0px;"/>
    <foreignObject>
      <h1>Registrar paquete</h1>
    </foreignObject>
  </svg>

  <svg v-if="width >= desktop && (width < desktopLarge)" xmlns="http://www.w3.org/2000/svg" width="100%" height="317" viewBox="0 0 1440 317"
       fill="none"
       preserveAspectRatio="none">
    <path width="100%" fill-rule="evenodd" clip-rule="evenodd"
          d="M0 302L80 281C160 259 320 216 480 230C640 245 800 317 960 317C1120 317 1280 245 1360 209L1440 173V0H1360C1280 0 1120 0 960 0C800 0 640 0 480 0C320 0 160 0 80 0H0V302Z"
          fill="#9BBFE1"/>
    <defs>
      <clipPath id="miRecorte">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0 302L80 281C160 259 320 216 480 230C640 245 800 317 960 317C1120 317 1280 245 1360 209L1440 173V0H1360C1280 0 1120 0 960 0C800 0 640 0 480 0C320 0 160 0 80 0H0V302Z"
              fill="#fff"/>
      </clipPath>
    </defs>
    <image x="calc(50% - 767px / 2)" y="0" width="767" height="333" xlink:href="/img/hero.png" clip-path="url(#miRecorte)" preserveAspectRatio="xMidYMid slice"/>
  </svg>

  <!--  For large desktops-->

  <svg v-if="width >= desktopLarge" class="background" id="Capa_1" width="100%" height="280" data-name="Capa 1"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 280" preserveAspectRatio="none">
    <path d="m0,266.75l106.67-18.55c106.67-19.43,320-57.41,533.33-45.05,213.33,13.25,426.67,76.85,640,76.85s426.67-63.6,533.33-95.39l106.67-31.8V0H0v266.75Z" style="fill: #000; fill-rule: evenodd; opacity: .4; stroke-width: 0px;"/>
    <foreignObject>
      <h1>Registrar paquete</h1>
    </foreignObject>
  </svg>

  <svg v-if="width >= desktopLarge" xmlns="http://www.w3.org/2000/svg" width="100%" height="280" viewBox="0 0 1920 280"
       fill="none"
       preserveAspectRatio="none">
    <path d="m0,266.75l106.67-18.55c106.67-19.43,320-57.41,533.33-45.05,213.33,13.25,426.67,76.85,640,76.85s426.67-63.6,533.33-95.39l106.67-31.8V0H0v266.75Z" style="fill: #9bbfe1; fill-rule: evenodd; opacity: .8; stroke-width: 0px;"/>
    <defs>
      <clipPath id="miRecorte">
        <path d="m0,266.75l106.67-18.55c106.67-19.43,320-57.41,533.33-45.05,213.33,13.25,426.67,76.85,640,76.85s426.67-63.6,533.33-95.39l106.67-31.8V0H0v266.75Z" style="fill: #9bbfe1; fill-rule: evenodd; opacity: .8; stroke-width: 0px;"/>
      </clipPath>
    </defs>
    <image x="calc(50% - 767px / 2)" y="0" width="767" height="333" xlink:href="/img/hero.png" clip-path="url(#miRecorte)" preserveAspectRatio="xMidYMid slice"/>
  </svg>

</template>

<style scoped>
svg {
  display: block;
}

h1 {
  font-size: 3rem;
  text-align: center;
  color: white;
  font-family: Inter, sans-serif;
  font-weight: bold;
}

foreignObject {
  x: calc(50% - 125px);
  y: 40%;
  width: 250px;
  height: 100%;
}

.background {
  position: absolute;
}
</style>