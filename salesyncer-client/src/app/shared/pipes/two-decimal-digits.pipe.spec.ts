import { TwoDecimalDigitsPipe } from './two-decimal-digits.pipe';

describe('TwoDecimalDigitsPipe', () => {
  it('create an instance', () => {
    const pipe = new TwoDecimalDigitsPipe();
    expect(pipe).toBeTruthy();
  });
});
