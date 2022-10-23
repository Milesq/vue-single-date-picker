<template>
  <table class="single-date-picker__calendar-month">
    <thead>
      <CalendarWeekHeader
        v-for="(day, index) in dayNames"
        :key="index"
        :day="day"
      />
    </thead>
    <tbody>
      <CalendarWeek
        v-for="(week, index) in datesPerWeek"
        :key="index"
        :week="week"
        :is-today="isToday"
        :is-selected="isSelected"
        @selectDate="selectDate"
      />
    </tbody>
  </table>
</template>

<script>
import CalendarWeekHeader from './CalendarWeekHeader.vue';
import CalendarWeek from './CalendarWeek.vue';

export default {
  components: {
    CalendarWeekHeader,
    CalendarWeek,
  },
  inject: ['dayNames'],
  props: {
    datesPerWeek: {
      type: Array,
      default: () => [],
    },
    isToday: {
      type: Number,
      default: 0,
    },
    isSelected: {
      type: Number,
      default: 0,
    },
    weekStartDay: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.rotateDaysInWeek(this.dayNames, this.weekStartDay);
  },
  methods: {
    selectDate(date) {
      this.$emit('selectDate', date);
    },
    rotateDaysInWeek(dayNames, shifts) {
      while (shifts--) {
        var temp = dayNames.shift();
        dayNames.push(temp);
      }
    },
  },
};
</script>

<style scoped>
.single-date-picker__calendar-month {
  width: 100%;
  padding: 10px;
}
</style>
