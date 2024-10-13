import { Ref } from "vue";
import type { EChartsOption } from "echarts";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";
import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  RadarChart,
  ScatterChart,
} from "echarts/charts";

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
} from "echarts/components";

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,

  PictorialBarChart,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  ScatterChart,
]);

export default echarts;

export enum RenderType {
  SVGRenderer = "SVGRenderer",
  CanvasRenderer = "CanvasRenderer",
}

export enum ThemeType {
  Light = "light",
  Dark = "dark",
  Default = "default",
}

export function useChart(
  elRef: Ref<HTMLDivElement>,
  autoChartSize = false,
  animation: boolean = false,
  render: RenderType = RenderType.SVGRenderer,
  theme: ThemeType = ThemeType.Default
) {
  // Modus rendering
  echarts.use(render === RenderType.SVGRenderer ? SVGRenderer : CanvasRenderer);
  // contoh diagram
  let chartInstance: echarts.ECharts | null = null;

  // inisialisasi grafik
  const initCharts = () => {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    chartInstance = echarts.init(el, theme);
  };

  // Perbarui/atur konfigurasi
  const setOption = (option: EChartsOption) => {
    nextTick(() => {
      if (!chartInstance) {
        initCharts();
        if (!chartInstance) return;
      }

      chartInstance.setOption(option);
      hideLoading();
    });
  };

  // Dapatkan contoh grafik
  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts();
    }
    return chartInstance;
  }

  // ukuran pembaruan
  function resize() {
    chartInstance?.resize();
  }

  // Pantau ukuran elemen
  function watchEl() {
    // Tambahkan transisi ke elemen
    if (animation) {
      elRef.value.style.transition = "width 1s, height 1s";
    }
    const resizeObserver = new ResizeObserver((entries) => resize());
    resizeObserver.observe(elRef.value);
  }

  // tampilkan status pemuatan
  function showLoading() {
    if (!chartInstance) {
      initCharts();
    }
    chartInstance?.showLoading();
  }
  // tampilkan status pemuatan
  function hideLoading() {
    if (!chartInstance) {
      initCharts();
    }
    chartInstance?.hideLoading();
  }

  onMounted(() => {
    window.addEventListener("resize", resize);
    if (autoChartSize) watchEl();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resize);
  });

  return {
    setOption,
    getInstance,
    showLoading,
    hideLoading,
  };
}
