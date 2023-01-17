import './App.css';
import Calendar from './components/calendar.tsx';
import { getAvailabilityByUserAndWeek } from './data/availability.ts'

function App() {
  const availability = getAvailabilityByUserAndWeek('1111', '1');
  console.log(`availability in App: ${JSON.stringify(availability)}`)

  return (
    <div className="App">
      <h1>Demo</h1>
      <Calendar availability={availability}></Calendar>
    </div>
  );
}

export default App;
