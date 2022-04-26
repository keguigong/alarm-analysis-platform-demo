<template>
  <div class="content">
    <abnormal-list class="list" />
    <list-bottom :value="pageOptions" @change="handlePageChange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ListBottom } from '@/components'
import AbnormalList from './abnormal-list.vue'

@Component({
  components: {
    ListBottom,
    AbnormalList
  }
})
export default class AbnormalContent extends Vue {
  state = {
    totalResults: 0,
    query: {
      pageNo: 1,
      pageSize: 10,
      sortBy: ''
    }
  }

  get pageOptions() {
    let {
      totalResults,
      query: { pageNo, pageSize }
    } = this.state
    return {
      totalResults,
      pageNo,
      pageSize
    }
  }

  handlePageChange(value: any) {}
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.list {
  flex: 1;
}
</style>
