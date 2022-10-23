<template>
  <div class="single-date-picker__calendar-month-header">
    <LeftIcon class="single-date-picker__arrow" @click="toggleMonth(-1)" />

    <div class="single-date-picker__year">{{ fullMonth }} {{ year }}</div>

    <RightIcon class="single-date-picker__arrow" @click="toggleMonth(1)" />
  </div>
</template>

<script>
import LeftIcon from '~icons/mdi/ChevronLeft';
import RightIcon from '~icons/mdi/ChevronRight';

export default {
  components: {
    LeftIcon,
    RightIcon,
  },
  inject: ['months'],
  props: {
    year: {
      type: Number,
      default: () => 1970,
    },
    month: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    fullMonth() {
      return this.months[this.month];
    },
  },
  methods: {
    toggleMonth(direction) {
      this.$emit('toggleMonth', direction);
    },
  },
};
</script>

<style lang="scss" scoped>
.single-date-picker__calendar-month-header {
  padding: 15px;
  background: var(--vsdp-primary-color);
  display: flex;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  align-items: center;
  color: var(--vsdp-secondary-color);

  .single-date-picker__year {
    font-weight: 900;
    font-size: 20px;
    text-transform: capitalize;
  }

  .single-date-picker__arrow {
    cursor: pointer;
  }
}
</style>
