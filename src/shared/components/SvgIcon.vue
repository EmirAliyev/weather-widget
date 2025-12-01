<script setup>

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  width: {
    type: [String, Number],
    default: 16
  },
  height: {
    type: [String, Number],
    default: 16
  },
  color: {
    type: String,
    default: null
  },
  stroke: {
    type: String,
    default: null
  },
  pointer: {
    type: Boolean,
    default: false
  }
});

const iconRef = shallowRef(null);

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
