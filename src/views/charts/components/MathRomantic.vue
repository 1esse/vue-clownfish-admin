
<script setup lang="ts">
import * as echarts from 'echarts'
import type { Layout } from 'types/layout'
import { onMounted, ref, onBeforeUnmount, shallowRef, ShallowRef, inject, watch, useAttrs } from 'vue'

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
    const data = []
    for (let i = 0; i <= 100; i++) {
        let theta = (i / 100) * 360
        let r = 5 * (1 + Math.sin((theta / 180) * Math.PI))
        data.push([r, theta])
    }
    const option: echarts.EChartsOption = {
        backgroundColor: '#fff',
        title: {
            text: '极坐标展示-数学的浪漫'
        },
        legend: {
            data: ['line']
        },
        polar: {},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        angleAxis: {
            type: 'value',
            startAngle: 0
        },
        radiusAxis: {},
        series: [
            {
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                data: data
            }
        ]
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
        