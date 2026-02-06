import { defineConfig, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    blog: {
      name: 'Blog',
      pattern: 'blog/**/*.mdx',
      schema: s
        .object({
          title: s.string(),
          description: s.string(),
          date: s.string(),
          category: s.string().optional(),
          tags: s.array(s.string()).optional(),
          slug: s.path(),
          body: s.mdx(),
          toc: s.toc(),
        })
        .transform((data) => ({
          ...data,
          slug: data.slug.replace(/^blog\//, ''),
        })),
    },
    projects: {
      name: 'Project',
      pattern: 'projects/**/*.md',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        logo: s.string(),
        link: s.string(),
        github: s.string().optional(),
        type: s.enum(['personal', 'maintainer']).default('personal'),
        body: s.markdown().optional(),
      }),
    },
  },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'vesper',
          keepBackground: false,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'vesper',
          keepBackground: false,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})
