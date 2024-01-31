import { formatElapsedTime, isWithin24Hours } from "./services/DateFormating";

test('test time format 2', async () => {
    const time = formatElapsedTime(1000);
    expect(time).toBe('0m 1s');
});

test('test time format 2 ', async () => {
    const time = formatElapsedTime(60000);
    expect(time).toBe('1m 0s');
});

test('test time format 3', async () => {
    const time = formatElapsedTime(61000);
    expect(time).toBe('1m 1s');
});

test('test time format 4', async () => {
    const time = formatElapsedTime(0);
    expect(time).toBe('0m 0s');
});

test('test time format 5', async () => {
    expect( function(){ formatElapsedTime(-100); } ).toThrow(new Error("elapsedTime cannot be negative"));
});

test('is within 24 hours 1 ', async () => {
    const isTrue = isWithin24Hours(new Date(), new Date(Date.now() - 85400000));
    expect(isTrue).toBe(true);
});

test('is within 24 hours 2', async () => {
    const isTrue = isWithin24Hours(new Date(), new Date(Date.now() + 85400000));
    expect(isTrue).toBe(true);
});

test('is within 24 hours 3', async () => {
    const isTrue = isWithin24Hours(new Date(), new Date(Date.now()));
    expect(isTrue).toBe(false);
});
