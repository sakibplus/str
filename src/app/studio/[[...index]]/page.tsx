// This route is responsible for the built-in authoring environment
// You can learn more about the next-sanity package here:
// https://github.com/sanity-io/next-sanity

'use client'

import {NextStudio} from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
