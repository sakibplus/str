
'use server';
/**
 * @fileOverview A Genkit flow to seed initial data into the Sanity project.
 *
 * - seedSanityData - A function that triggers the data seeding process.
 */

import { ai } from '@/ai/genkit';
import { seedData } from '../../../sanity/seed';
import { z } from 'zod';

// No input is needed for this flow
const SeedSanityDataInputSchema = z.object({});
export type SeedSanityDataInput = z.infer<typeof SeedSanityDataInputSchema>;

// The output will be a success message
const SeedSanityDataOutputSchema = z.object({
  message: z.string().describe('The result message from the seeding process.'),
});
export type SeedSanityDataOutput = z.infer<
  typeof SeedSanityDataOutputSchema
>;

export async function seedSanityData(
  input?: SeedSanityDataInput
): Promise<SeedSanityDataOutput> {
  return seedSanityDataFlow(input || {});
}

const seedSanityDataFlow = ai.defineFlow(
  {
    name: 'seedSanityDataFlow',
    inputSchema: SeedSanityDataInputSchema,
    outputSchema: SeedSanityDataOutputSchema,
  },
  async () => {
    try {
      const resultMessage = await seedData();
      return { message: resultMessage };
    } catch (error: any) {
      console.error('Error in seedSanityDataFlow:', error);
      // It's better to throw the error so the client can handle it
      throw new Error(error.message || 'An unexpected error occurred during data seeding.');
    }
  }
);
