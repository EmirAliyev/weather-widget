<script setup lang="ts">
import SvgIcon from '@/shared/components/SvgIcon.vue';
import BaseButtonRound from '@/shared/ui/BaseButtonRound.vue';
import XSmIcon from '@/assets/icons/x-sm.svg';

interface IProps {
  title?: string;
  isConfig?: boolean;
}

withDefaults(defineProps<IProps>(), {
  title: 'Weather',
  isConfig: false
});

const emit = defineEmits<{
  (e: 'toggle-config'): void;
}>();
</script>

<template>
  <header class="ww-header">
    <div class="ww-header__title">{{ title }}</div>
    <BaseButtonRound size="lg" @click="emit('toggle-config')">
      <XSmIcon v-if="isConfig" width="12px" height="12px" />
      <SvgIcon v-else icon="gear" stroke="white" pointer width="18px" height="18px"/>
    </BaseButtonRound>
  </header>
</template>

<style scoped lang="scss">
.ww-header {
  @include flexRow(center, space-between);
  margin-bottom: 0.5rem;
}

.ww-header__title {
  @include headingBase($color-neutral-text-100);
}

</style>
