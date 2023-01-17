import './App.css';
import Calendar from './components/calendar.tsx';
import { getAvailabilityByUserAndWeek } from './data/availability.ts'

function App() {
  const year = '2023'; // this should be required in api params and frontend, eg, display date of the week
  const weekNumber = '1';
  const availability = getAvailabilityByUserAndWeek('1111', year, weekNumber);
  return (
    <div className="App">
      <h1>Demo</h1>
      <Calendar year={year} weekNumber={weekNumber} availability={availability}></Calendar>
    </div>
  );
}

export default App;
