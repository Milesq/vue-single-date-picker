<script setup>
import { CalendarView } from '../lib/lib';
</script>

<template>
  <h1>single date picker</h1>

  <calendar-view />
</template>

<style lang="scss">
#app {
  color: #0d1e44;
  margin: auto;
  padding: 30px;
  text-align: center;
}

#single-date-picker {
  margin: auto;
}

h1 {
  color: #ececec;
  background: linear-gradient(to right, #e0caca, #d4b8ca, #c7a3b5);
  background-clip: text;
  font-size: 60px;
  font-weight: 300;
  font-family: 'Lato', Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
