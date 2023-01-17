import { render, screen } from '@testing-library/react';
import Calendar from './calendar.tsx';

test('render correct table', () => {
  render(<Calendar/>);

  const calendarTitle = screen.getByText('Availability Calendar');
  expect(calendarTitle).toBeInTheDocument();
});
