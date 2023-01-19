CREATE TABLE Availability (
  id VARCHAR(255),
  year INTEGER (4),
  weekNumber INTEGER (2),
  availability JSON
);

-- TODO: Only for local test purpose
INSERT INTO Availability (id, year, weeknumber, availability)
VALUES ('111',  2023, 1, '{"2023010209": "y"}');
