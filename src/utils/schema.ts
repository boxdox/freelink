import { z } from 'zod'

export const linkSchema = z.object({
  name: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'name is required',
  }),
  url: z.string().url({ message: 'invalid url' }),
  icon: z.union([z.string(), z.string().url()]).optional(),
})

const backgroundSchema = z.union([
  z.object({
    color: z
      .string()
      .min(1, 'color is required if `background image` is not provided'),
    backgroundImage: z.string().optional(),
  }),
  z.object({
    color: z.string().optional(),
    backgroundImage: z
      .string()
      .min(1, 'background image is required if `color` is not provided'),
  }),
])

export const themeSchema = z.object({
  accentColor: z.string().default('#39e09b'),
  background: z.union([z.string(), backgroundSchema]),
})

export const schema = z.object({
  title: z.string({
    invalid_type_error: 'title must be a string',
    required_error: 'title is required',
  }),
  tagline: z.string().optional(),
  slug: z.string().optional(),
  main: z.boolean().optional(),
  profilePicture: z.string().optional(),
  theme: z.union([
    themeSchema,
    z.string({
      required_error: 'theme name is required if theme object is not provided',
    }),
  ]),
  links: z.array(linkSchema),
})

export type ILinkConfig = z.infer<typeof schema>
export type IThemeOptions = z.infer<typeof themeSchema>
export type ILink = z.infer<typeof linkSchema>
