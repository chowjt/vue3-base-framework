<template>
  <button
    class="base-button"
    :class="[`base-button--${type}`, { 'base-button--disabled': disabled }]"
    :type="nativeType"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  nativeType: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

function handleClick(event) {
  emit('click', event)
}
</script>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;

  &--primary {
    background-color: $primary-color;
    &:hover {
      opacity: 0.8;
    }
  }

  &--success {
    background-color: $success-color;
    &:hover {
      opacity: 0.8;
    }
  }

  &--warning {
    background-color: $warning-color;
    &:hover {
      opacity: 0.8;
    }
  }

  &--danger {
    background-color: $danger-color;
    &:hover {
      opacity: 0.8;
    }
  }

  &--info {
    background-color: $info-color;
    &:hover {
      opacity: 0.8;
    }
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
