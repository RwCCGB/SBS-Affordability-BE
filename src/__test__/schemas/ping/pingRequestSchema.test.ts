
import { pingRequestSchema } from '../../../schemas/ping/pingRequestSchema';

describe('pingRequestSchema', () => {
  it('schema returns true for a correctly formed request', async () => {
    //Arrange
    const json = {
      checkBackendOnline: true,
      checkDatabaseOnline: true,
    };

    //Act
    const data = pingRequestSchema.safeParse(json);

    const { success } = data;

    //Assert
    expect(success).toBeTruthy();
  });

  it('schema returns false for a badly formed request', async () => {
    //Arrange
    const json = {
      XXX: true,
      YYY: true,
    };

    //Act
    const data = pingRequestSchema.safeParse(json);
    const { success } = data;

    //Assert
    expect(success).toBeFalsy();
  });
});
