<script setup lang="ts">
interface IProps {
  icon: string;
  width?: string | number;
  height?: string | number;
  color?: string | null;
  stroke?: string | null;
  pointer?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  width: 16,
  height: 16,
  color: null,
  stroke: null,
  pointer: false
});

const iconRef = shallowRef<unknown>(null);

onMounted(async () => {
  const { default: svg } = await import(`../../assets/icons/${props.icon}.svg`);
  iconRef.value = svg;
});

const styles = computed(() => ({
  width: typeof props.width === 'number' ? props.width + 'px' : props.width,
  height: typeof props.height === 'number' ? props.height + 'px' : props.height,
  color: props.color || undefined, 
  stroke: props.stroke || undefined,   
  cursor: props.pointer ? 'pointer' : 'default'
}));
</script>

<template>
  <component
    :is="iconRef"
    v-if="iconRef"
    :style="styles"
  />
</template>
