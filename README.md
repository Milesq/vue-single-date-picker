## Demo
https://jiayingy.github.io/vue-single-date-picker/

## How to use

Import package
```javascript
import { CalendarView } from 'vue-single-date-picker'

export default {
  components: {
    CalendarView,
  },
}
```

Create component in your template
```html
<CalendarView />
```

### Styles
1. This library uses Google Material Icon pack. Refer to [here](https://google.github.io/material-design-icons/) on how to include it in your project.

2. In your css/scss file,
```
@import '~vue-single-date-picker/dist/vue-single-date-picker.css';
```
### Props
|Props|arguments|remarks|
|:--|:--|:--|
|date|```{ year: <Number>, month: <Number>, date: <Number> }```|E.g. 1 Jan 2020 <br> {year: 2020, month: 0, date: 1}|
|first-day-of-week|```firstDayOfWeek: <Number>```|(0: Sunday ... 6: Saturday) <br> E.g. start week on Monday <br> :first-day-of-week="1"|

### Events
|events|arguments|remarks|
|:--|:--|:--|
|@selectDate|```{ year: <Number>, month: <Number>, date: <Number> }```|E.g. 1 Jan 2020 <br> {year: 2020, month: 0, date: 1}|
