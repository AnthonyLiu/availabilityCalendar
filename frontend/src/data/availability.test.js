import { getAvailabilityByUserAndWeek } from "./availability";

describe('getAvailabilityByUserAndWeek', () => {
  test('should not return null', () => {
    const data = getAvailabilityByUserAndWeek('1', '1');
    expect(data.userId).not.toBeNull();
    expect(data.weekNumber).not.toBeNull();
    expect(data.availability).not.toBeNull();
  });
})