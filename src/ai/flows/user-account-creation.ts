'use server';

/**
 * @fileOverview This file defines a Genkit flow for user account creation and access to relevant tutorial information based on login status.
 *
 * - userAccountCreation - A function that orchestrates the user account creation process and information retrieval.
 * - UserAccountCreationInput - The input type for the userAccountCreation function.
 * - UserAccountCreationOutput - The return type for the userAccountCreation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UserAccountCreationInputSchema = z.object({
  loginStatus: z
    .boolean()
    .describe('The login status of the user (true if logged in, false otherwise).'),
  tutorialInfo: z
    .string()
    .describe('Tutorial information from the linked website.'),
});
export type UserAccountCreationInput = z.infer<typeof UserAccountCreationInputSchema>;

const UserAccountCreationOutputSchema = z.object({
  relevantInformation: z
    .string()
    .describe('Information relevant to the user based on their login status.'),
});
export type UserAccountCreationOutput = z.infer<typeof UserAccountCreationOutputSchema>;

export async function userAccountCreation(input: UserAccountCreationInput): Promise<UserAccountCreationOutput> {
  return userAccountCreationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'userAccountCreationPrompt',
  input: {schema: UserAccountCreationInputSchema},
  output: {schema: UserAccountCreationOutputSchema},
  prompt: `Based on the user's login status and the tutorial information provided, determine the relevant information to display to the user.\n\nLogin Status: {{loginStatus}}\nTutorial Information: {{tutorialInfo}}\n\nProvide the relevant information.`,
});

const userAccountCreationFlow = ai.defineFlow(
  {
    name: 'userAccountCreationFlow',
    inputSchema: UserAccountCreationInputSchema,
    outputSchema: UserAccountCreationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
