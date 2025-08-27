import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'
import {seedContentTool} from './sanity/plugins/seed-content'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  // You can render a static page or a specific component if the project ID is not set.
  // For now, we'll just throw an error during build time.
  // In a real app, you might want to handle this more gracefully.
  console.error('Sanity project ID and dataset must be defined in .env.local');
}


export default defineConfig({
  basePath: '/studio',
  name: 'skillshikhun_studio',
  title: 'SkillShikhun Studio',
  projectId: projectId || '',
  dataset: dataset || '',

  plugins: [structureTool(), visionTool(), seedContentTool()],

  schema: {
    types: schemaTypes,
  },
})
