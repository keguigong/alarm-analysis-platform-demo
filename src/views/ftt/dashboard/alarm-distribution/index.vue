<template>
  <board-cell-card></board-cell-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BoardCellCard } from '@/components'

@Component({
  components: {
    BoardCellCard
  }
})
export default class AlarmDistribution extends Vue {}
</script>
