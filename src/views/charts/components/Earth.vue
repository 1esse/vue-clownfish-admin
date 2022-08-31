
<script setup lang="ts">
import * as echarts from 'echarts'
import type { Layout } from 'types/layout'
import { onMounted, ref, onBeforeUnmount, shallowRef, ShallowRef, inject, watch, useAttrs } from 'vue'
import 'echarts-gl'
import img_bathymetry from '../images/earth/bathymetry.jpg'
import img_earth from '../images/earth/earth.jpg'
import img_night from '../images/earth/night.jpg'
import img_starfield from '../images/earth/starfield.jpg'
import img_clouds from '../images/earth/clouds.png'

const sidebarRelated = inject<Layout.SidebarRelated>('sidebarRelated')
const attrs = useAttrs()
const chartRef = ref()
const chart: ShallowRef<echarts.ECharts | null> = shallowRef(null)

onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart)
    if (chart.value) {
        chart.value.dispose()
        chart.value = null
    }
})
watch(() => sidebarRelated?.collapsed, () => {
    setTimeout(() => {
        resizeChart()
    }, 300)
})
function initChart() {
    chart.value = echarts.init(chartRef.value)
    const option: echarts.EChartsOption = {
        backgroundColor: '#000',
        globe: {
            baseTexture: img_earth,
            heightTexture: img_bathymetry,
            displacementScale: 0.1,
            shading: 'lambert',
            environment: img_starfield,
            light: {
                ambient: {
                    intensity: 0.1
                },
                main: {
                    intensity: 1.5
                }
            },
            layers: [
                {
                    type: 'blend',
                    blendTo: 'emission',
                    texture: img_night
                },
                {
                    type: 'overlay',
                    texture: img_clouds,
                    shading: 'lambert',
                    distance: 5
                }
            ]
        },
        series: []
    }
    option && chart.value.setOption(option)
}

function resizeChart() {
    chart.value?.resize()
}
</script>
<template>
    <div ref="chartRef" v-bind="attrs" />
</template>
    