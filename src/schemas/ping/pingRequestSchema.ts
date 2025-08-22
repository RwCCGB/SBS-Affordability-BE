import * as z from 'zod';

export const pingRequestSchema = z.object({
  checkBackendOnline: z.boolean(),
  checkDatabaseOnline: z.boolean(),
});
