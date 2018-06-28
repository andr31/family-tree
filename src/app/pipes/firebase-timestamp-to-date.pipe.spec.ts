import { FirebaseTimestampToDatePipe } from './firebase-timestamp-to-date.pipe';

describe('FirebaseTimestampToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FirebaseTimestampToDatePipe();
    expect(pipe).toBeTruthy();
  });
});
