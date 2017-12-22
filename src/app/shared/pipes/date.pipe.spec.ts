import { Iso8601Date, CustomDate } from './date.pipe';

describe('Iso8601Date', () => {

  let pipe;

  beforeEach(() => {
    pipe = new Iso8601Date();
  });

  it('should return date in ISO8601 format: yyyy-mm-ddThh:mm:ss', () => {
    const date = '1212-12-12T12:12:12';

    let iso8601Date = pipe.transform(new Date(date));

    expect(iso8601Date).toBe(date);
  });
});

describe('CustomDate', () => {

  let pipe;

  beforeEach(() => {
    pipe = new CustomDate();
  });

  it('should return date in date in custom format: yyyy-mm-dd hh:mm', () => {
    const date = '1212-12-12 12:12';

    let customDate = pipe.transform(new Date(date));

    expect(customDate).toBe(date);
  });
});
