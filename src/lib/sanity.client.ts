import { createClient, type SanityClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

// Regular expression to validate Sanity project ID
const projectIdRegex = /^[a-z0-9-]+$/

let clientInstance: SanityClient | null = null;

if (projectId && projectIdRegex.test(projectId)) {
  clientInstance = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // set to `false` to bypass the edge cache
  });
} else {
  console.warn(
    'Sanity projectId is not defined or invalid. Make sure to set NEXT_PUBLIC_SANITY_PROJECT_ID in your .env.local file.'
  );
}

export const client = clientInstance;
