<script setup lang="ts">
import BaseButtonRound from '@/shared/ui/BaseButtonRound.vue';
import XSmIcon from '@/assets/icons/x-sm.svg';
import type { ICity } from '@/shared/model/types';

interface IProps {
  city: ICity;
  index: number;
  onDragStart: (index: number, event: DragEvent) => void;
  onDrop: (index: number) => void;
  onRemove: (id: string) => void;
}

defineProps<IProps>();
</script>

<template>
  <div
    class="ww-config-item"
    draggable="true"
    @dragstart="(event: DragEvent) => onDragStart(index, event)"
    @dragover.prevent
    @drop="() => onDrop(index)"
  >
    <span class="ww-config-item__label">{{ city.name }}</span>
    <BaseButtonRound
      class="ww-config-item__remove"
      size="md"
      @click="onRemove(city.id)"
    >
      <XSmIcon />
    </BaseButtonRound>
  </div>
</template>

<style scoped lang="scss">
.ww-config-item {
  @include flexRow(center, flex-start, 0.375);

  padding: 0.375rem 0.5rem;

  border-radius: 0.5rem;
  background: $color-neutral-50;
  
  cursor: grab;
}

.ww-config-item__label {
  flex: 1 1 auto;
  @include textBase(0.875rem);
}

.ww-config-item__remove {
  flex: 0 0 auto;
}
</style>
