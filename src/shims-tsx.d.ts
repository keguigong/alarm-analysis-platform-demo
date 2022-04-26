import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  interface HTMLElement {
    clickOutsideEvent: (event: MouseEvent) => void
  }

  // Declare map
  interface Window {
    TMap: any
    BMapGL: any
    mapvgl: any
    _AMapSecurityConfig: any
    AMap: any
    Loca: any
  }
}
