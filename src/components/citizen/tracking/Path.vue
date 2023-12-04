<script setup lang="ts">
import {reactive} from "vue";
import MapLine from "@/components/citizen/tracking/MapLine.vue";
import type {LineData} from "@/types/intefaces";



const greenColor = '#239F00'
const redColor = '#CD5C5C'
let currentColor: string = greenColor;

const {list, currentCheckpoint} = defineProps<{
  list: string[]
  currentCheckpoint: string
}>()

const linesRoute = reactive<LineData[]>([])

const checkpoints = reactive<{[key: string] : any}>({
  Tribuaguadelnorte: {
    x1:410.24,
    y1:13.25,
    color: 'transparent'
  },
  Tribuaguadelsur: {
    x1:406.38,
    y1:693.65,
    color: 'transparent'
  },
  Tribuairedelnorte  : {
    x1:556.44,
    y1:110.29,
    color: 'transparent'
  },
  Tribuairedeleste   : {
    x1:824.89,
    y1:462.19,
    color: 'transparent'
  },
  Tribuairedeloeste  : {
    x1:114.37,
    y1:170.66,
    color: 'transparent'
  },
  Tribuairedelsur  : {
    x1:285.28,
    y1:600.51,
    color: 'transparent'
  },
  BaSingSe     : {
    x1:677.81,
    y1:198.69,
    color: 'transparent'
  },
  Abadía        : {
    x1:337.43,
    y1:157.66,
    color: 'transparent'
  },
  Gaipan: {
    x1:500.78,
    y1:294.3,
    color: 'transparent'
  },
  SiWong: {
    x1:605.64,
    y1:386.51,
    color: 'transparent'
  },
  Capitalnacióndelfuego  : {
    x1:13.25,
    y1:357.65,
    color: 'transparent'
  },
  ShuJing      : {
    x1:233.12,
    y1:373.51,
    color: 'transparent'
  },
})


for (let i = 0; i < list.length - 1; i++) {
  checkpoints[list[i]]['color'] = currentColor
  if(list[i] === currentCheckpoint) {
    currentColor = redColor;
  }
  const data = {
    x1 : checkpoints[list[i]]['x1'],
    y1 : checkpoints[list[i]]['y1'],
    x2 : checkpoints[list[i+1]]['x1'],
    y2 : checkpoints[list[i+1]]['y1'],
    color: currentColor
  }
  linesRoute.push(data)
}
checkpoints[list[list.length-1]]['color'] = currentColor


</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" id="path" viewBox="0 0 838.14 706.9">
    <g id="Path">
      <MapLine v-for="data in linesRoute" :data="data"></MapLine>
      <circle cx="13.25" cy="357.65" r="13" :fill="checkpoints.Capitalnacióndelfuego.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
      <circle cx="233.12" cy="373.51" r="13" :fill="checkpoints.ShuJing.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
      <circle cx="337.43" cy="157.66" r="13" :fill="checkpoints.Abadía.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
      <circle cx="556.44" cy="110.29" r="13" :fill="checkpoints.Tribuairedelnorte.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
      <circle cx="410.24" cy="13.25" r="13"  :fill="checkpoints.Tribuaguadelnorte.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
      <circle cx="677.81" cy="198.69" r="13" :fill="checkpoints.BaSingSe.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
      <circle cx="824.89" cy="462.19" r="13" :fill="checkpoints.Tribuairedeleste.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
      <circle cx="500.78" cy="294.3" r="13"  :fill="checkpoints.Gaipan.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
      <circle cx="605.64" cy="386.51" r="13" :fill="checkpoints.SiWong.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
      <circle cx="285.28" cy="600.51" r="13" :fill="checkpoints.Tribuairedelsur.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
      <circle cx="406.38" cy="693.65" r="13" :fill="checkpoints.Tribuaguadelsur.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
      <circle cx="114.37" cy="170.66" r="13" :fill="checkpoints.Tribuairedeloeste.color" style="stroke-miterlimit: 10; stroke-width: .5px;"/>
    </g>
  </svg>
</template>

<style scoped>
svg{
  max-width: 838px;
  max-height: 706.9px;
}
</style>