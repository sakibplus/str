import {definePlugin} from 'sanity'
import {route} from 'sanity/router'
import {RocketIcon} from '@sanity/icons'
import SeedContent from './SeedContent'

export const seedContentTool = definePlugin({
  name: 'seed-content-tool',
  tools: [
    {
      title: 'Seed Content',
      name: 'seed-content',
      icon: RocketIcon,
      component: SeedContent,
      router: route.create('/*'),
    },
  ],
})
