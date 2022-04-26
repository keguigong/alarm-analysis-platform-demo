declare module '*.vue' {
  import Vue from 'vue'
  import * as echarts from 'echarts'

  declare module 'vue/types/vue' {
    interface Vue {
      $echarts: typeof echarts
    }
  }
  export default Vue
}
