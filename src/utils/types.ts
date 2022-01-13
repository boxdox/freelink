import { z } from 'zod'

import { schema, themeSchema, linkSchema } from './schema'

export type ILinkConfig = z.infer<typeof schema>
export type IThemeOptions = z.infer<typeof themeSchema>
export type ILink = z.infer<typeof linkSchema>
