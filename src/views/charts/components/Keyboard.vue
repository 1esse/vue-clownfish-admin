
<script setup lang="ts">
import * as echarts from 'echarts'
import type { Layout } from 'typings/layout'
import { ShallowRef } from 'vue'

const sidebarRelated = inject<Layout.SidebarRelated>('sidebarRelated')
const attrs = useAttrs()
const chartRef = ref()
const chart: ShallowRef<echarts.ECharts | null> = shallowRef(null)

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})
onBeforeUnmount(() => {
  if (!chart.value) {
    return
  }
  chart.value.dispose()
  chart.value = null
  window.removeEventListener('resize', resizeChart)
})
watch(() => sidebarRelated?.collapsed, () => {
  setTimeout(() => {
    resizeChart()
  }, 300)
})
function initChart() {
  chart.value = echarts.init(chartRef.value)
  const xAxisData = []
  const data = []
  const data2 = []
  for (let i = 0; i < 50; i++) {
    xAxisData.push(i)
    data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
    data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3)
  }
  const option: echarts.EChartsOption = {
    backgroundColor: '#fff',
    grid: {
      left: '3%',
      right: '3%'
    },
    xAxis: [
      {
        show: false,
        data: xAxisData
      },
      {
        show: false,
        data: xAxisData
      }
    ],
    visualMap: {
      show: false,
      min: 0,
      max: 50,
      dimension: 0,
      inRange: {
        color: ['#e6f7ff', '#1890ff', '#51c565', '#85e1a1', '#ff7875', '#d9363e']
      }
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#aaa'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ddd'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: 'back',
        type: 'bar',
        data: data2,
        z: 1,
        itemStyle: {
          opacity: 0.4,
          borderRadius: 5,
          shadowBlur: 3,
          shadowColor: '#111'
        }
      },
      {
        name: 'Simulate Shadow',
        type: 'line',
        data,
        z: 2,
        showSymbol: false,
        animationDelay: 0,
        animationEasing: 'linear',
        animationDuration: 1200,
        lineStyle: {
          color: 'transparent'
        },
        areaStyle: {
          color: '#fff',
          shadowBlur: 50,
          shadowColor: '#fff'
        }
      },
      {
        name: 'front',
        type: 'bar',
        data,
        xAxisIndex: 1,
        z: 3,
        itemStyle: {
          borderRadius: 5
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationEasingUpdate: 'elasticOut',
    animationDelay(idx) {
      return idx * 20
    },
    animationDelayUpdate(idx) {
      return idx * 20
    }
  }
  chart.value.setOption(option)
}

function resizeChart() {
  chart.value?.resize()
}
</script>
<template>
  <div ref="chartRef" v-bind="attrs" />
</template>
