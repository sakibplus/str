'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating course descriptions from a given title.
 *
 * - generateCourseDescription - A function that takes a course title as input and returns a generated course description.
 * - GenerateCourseDescriptionInput - The input type for the generateCourseDescription function.
 * - GenerateCourseDescriptionOutput - The return type for the generateCourseDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the course.'),
});
export type GenerateCourseDescriptionInput = z.infer<
  typeof GenerateCourseDescriptionInputSchema
>;

const GenerateCourseDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated description of the course.'),
});
export type GenerateCourseDescriptionOutput = z.infer<
  typeof GenerateCourseDescriptionOutputSchema
>;

export async function generateCourseDescription(
  input: GenerateCourseDescriptionInput
): Promise<GenerateCourseDescriptionOutput> {
  return generateCourseDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseDescriptionPrompt',
  input: {schema: GenerateCourseDescriptionInputSchema},
  output: {schema: GenerateCourseDescriptionOutputSchema},
  prompt: `You are an expert course description writer. Please generate a compelling and informative description for the following course title:

Title: {{{title}}}

Description:`,
});

const generateCourseDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCourseDescriptionFlow',
    inputSchema: GenerateCourseDescriptionInputSchema,
    outputSchema: GenerateCourseDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
