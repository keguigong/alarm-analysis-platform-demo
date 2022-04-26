import { VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'

export default {
  clickOutside: {
    bind: function (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
      el.clickOutsideEvent = function (event) {
        // here I check that click was outside the el and his children
        if (!(el == event.target || el.contains(event.target as Node | null))) {
          // and if it did, call method provided in attribute value
          const context = vnode.context
          if (typeof context !== 'undefined') {
            context[binding.expression as keyof Vue](event)
          }
        }
      }
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el: HTMLElement) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    }
  }
}
