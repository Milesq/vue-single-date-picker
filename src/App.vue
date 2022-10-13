<script setup>
import { CalendarView } from '../lib/lib';
</script>

<template>
  <h1>single date picker</h1>

  <calendar-view />
</template>

<style>
body {
  background-color: #ececec;
}

#app {
  color: #0d1e44;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<style lang="scss" scoped>
h1 {
  width: 100%;
  color: #ececec;
  background: linear-gradient(to right, #e0caca, #d4b8ca, #c7a3b5);
  background-clip: text;
  font-size: 60px;
  font-weight: 300;
  font-family: Arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 15px;
  box-shadow: 2px 2px 15px -3px rgba(0, 0, 0, 0.3);
}
</style>
