import { z } from 'zod'

export const linkSchema = z.object({
  name: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'name is required',
  }),
  url: z.string().url({ message: 'invalid url' }),
  icon: z.union([z.string(), z.string().url()]).optional(),
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
  theme: z.string().nullable(),
  links: z.array(linkSchema),
})

export type ILinkConfig = z.infer<typeof schema>
export type ILink = z.infer<typeof linkSchema>
