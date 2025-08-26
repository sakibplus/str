import { config } from 'dotenv';
config();

import '@/ai/flows/generate-course-description.ts';
import '@/ai/flows/user-account-creation.ts';
import '@/ai/flows/seed-sanity-data.ts';
