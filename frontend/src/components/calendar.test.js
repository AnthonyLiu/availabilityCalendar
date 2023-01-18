import { render, screen } from '@testing-library/react';
import Calendar from './calendar.tsx';

/**
 * the unit test could be verbose, I just add some samples here
 */

test('render the title and table header', () => {
  render(<Calendar year='2023' weekNumber='1' availability={{}}/>);

  const calendarTitle = screen.getByText('Availability Calendar');
  expect(calendarTitle).toBeInTheDocument();
  const mondayShortName = screen.getByText('Mon');
  expect(mondayShortName).toBeInTheDocument();
});

test('render a table with only one available hour', () => {
  const { container  } = render(<Calendar year='2023' weekNumber='1' availability={{"2023010200": "y"}}/>);

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const availabilityHours = container.getElementsByClassName('green');
  expect(availabilityHours.length).toBe(1);
});

