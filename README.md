# Client-side visit counter
Prototype for counting the number of visits on a website client-side (JS), based on a visit duration time. Works with first-party cookies and localStorage.

## Usage

```javascript
console.log(storedVisits.visits.all); // Number of visits all time
console.log(storedVisits.visits.month); // Number of visits for the current month
console.log(storedVisits.visits.week); // Number of visits for the current week (starts on monday)
```
