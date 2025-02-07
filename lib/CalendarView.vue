<template>
  <div class="single-date-picker__calendar-view">
    <CalendarMonthHeader
      :year="year"
      :month="month"
      @toggleMonth="toggleMonth"
    />
    <CalendarMonth
      :dates-per-week="datesPerWeek"
      :is-today="isToday"
      :is-selected="isSelected"
      :week-start-day="weekStartDay"
      @selectDate="selectDate"
    />
  </div>
</template>

<script>
import CalendarMonthHeader from './components/CalendarMonthHeader.vue';
import CalendarMonth from './components/CalendarMonth.vue';

const NUM_DAYS_IN_WEEK = 7;
const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];
const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default {
  name: 'CalendarView',
  components: {
    CalendarMonthHeader,
    CalendarMonth,
  },
  props: {
    date: {
      type: Object,
      default: () => null,
    },
    firstDayOfWeek: {
      type: Number,
      default: 0,
      validator: value => value >= 0 && value <= 6,
    },
    months: {
      type: Array,
      default: () => MONTHS,
    },
    dayNames: {
      type: Array,
      default: () => DAY_NAMES,
    },
  },
  provide() {
    return {
      months: this.months,
      dayNames: this.dayNames,
    };
  },
  data() {
    return {
      year: 0,
      month: 0,
      todayDate: 0,
      todayYear: 0,
      todayMonth: 0,
      selectedDate: null,
      weekStartDay: 0,
    };
  },
  computed: {
    numDays() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    firstDay() {
      const startDay =
        new Date(this.year, this.month, 1).getDay() - this.weekStartDay;
      if (startDay < 0) return NUM_DAYS_IN_WEEK - Math.abs(startDay);

      return startDay;
    },
    lastDay() {
      const lastDay =
        new Date(this.year, this.month + 1, 0).getDay() - this.weekStartDay;
      if (lastDay < 0) return NUM_DAYS_IN_WEEK - Math.abs(lastDay);

      return lastDay;
    },
    numDaysInFirstWeek() {
      return NUM_DAYS_IN_WEEK - this.firstDay;
    },
    numDaysInLastWeek() {
      return this.lastDay + 1;
    },
    numWeeks() {
      const daysLeft =
        this.numDays - this.numDaysInFirstWeek - this.numDaysInLastWeek;
      return daysLeft / 7 + 2;
    },
    numFullWeeks() {
      return this.numWeeks - 2;
    },
    datesInFirstWeek() {
      return this.generateDatesInWeek(
        1,
        this.firstDay,
        this.numDaysInFirstWeek
      );
    },
    datesInLastWeek() {
      return this.generateDatesInWeek(
        this.numDays - this.numDaysInLastWeek + 1,
        0,
        this.numDaysInLastWeek
      );
    },
    datesInMiddleWeeks() {
      const startDates = [];
      for (let i = 0; i < this.numFullWeeks; i += 1) {
        startDates[i] = this.datesInFirstWeek[6] + 1 + i * 7;
      }
      return startDates.map(startDate => {
        return this.generateDatesInWeek(startDate, 0, 7);
      });
    },
    datesPerWeek() {
      return [
        this.datesInFirstWeek,
        ...this.datesInMiddleWeeks,
        this.datesInLastWeek,
      ];
    },
    isCurrentMonth() {
      return this.todayMonth === this.month;
    },
    isCurrentYear() {
      return this.todayYear === this.year;
    },
    isToday() {
      return this.isCurrentMonth && this.isCurrentYear ? this.todayDate : 0;
    },
    isSelected() {
      if (this.selectedDate) {
        return this.selectedDate.year === this.year &&
          this.selectedDate.month === this.month
          ? this.selectedDate.date
          : 0;
      }
      return 0;
    },
  },
  watch: {
    date(val) {
      this.setDate(val);
    },
  },
  created() {
    const date = new Date();
    if (this.date) {
      this.setDate(this.date);
    } else {
      this.year = date.getFullYear();
      this.month = date.getMonth();
    }
    this.todayDate = date.getDate();
    this.todayYear = date.getFullYear();
    this.todayMonth = date.getMonth();

    this.weekStartDay =
      this.firstDayOfWeek >= 0 && this.firstDayOfWeek <= 6
        ? this.firstDayOfWeek
        : 0;
  },
  methods: {
    generateDatesInWeek(startDate, startDay, numDays) {
      const datesInWeek = new Array(7).fill(0);
      for (let i = 0; i < numDays; i += 1) {
        datesInWeek[startDay + i] = startDate + i;
      }
      return datesInWeek;
    },
    toggleMonth(direction) {
      let newMonth = this.month + Number(direction);
      let newYear = this.year;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
      if (newYear >= 1970) {
        this.month = newMonth;
        this.year = newYear;
      }
    },
    selectDate(date) {
      if (date) {
        this.selectedDate = {
          year: this.year,
          month: this.month,
          date,
        };
        this.$emit('selectDate', this.selectedDate);
      }
    },
    setDate(date) {
      this.year = date.year;
      this.month = date.month;
      this.selectedDate = this.date;
    },
  },
};
</script>

<style lang="scss">
@import './assets/variables.css';
</style>

<style scoped>
.single-date-picker__calendar-view {
  font-family: Arial, sans-serif;
  max-width: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
