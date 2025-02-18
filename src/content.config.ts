import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { DEFAULT_FRONTMATTER as d } from '@/config'

const posts = defineCollection({
  loader: glob({ base: './posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    titleIcon: z.string().default(d.titleIcon),
    titleColor: z.string().default(d.titleColor),
    publishDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    tags: z.string().array().optional(),
    categories: z.string().array().default(d.categories),
    description: z.string().default(d.description),
    top: z.number().optional(), // The number of top posts to display on the home page
    password: z.string().optional(),
    encrypt: z.object({
      description: z.string().default(d.encrypt.description),
      placeholder: z.string().default(d.encrypt.placeholder),
    }).default({}),
    bodyJoin: z.string().array().optional()
  }),
})

export const collections = { posts }
