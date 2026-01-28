'use client'

import * as runtime from 'react/jsx-runtime'
import { useMemo, ComponentPropsWithoutRef, useState, memo } from 'react'
import { Icon } from '@iconify/react'
import { GitHubCard } from './GitHubCard'
import { LinkCard } from './LinkCard'
import { ImageGallery, GalleryImage } from './ImageGallery'
import { Callout } from './Callout'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 text-muted-foreground/50 hover:text-foreground/80 transition-colors"
      aria-label="Copy code"
    >
      {copied ? (
        <Icon icon="carbon:checkmark" className="w-4 h-4" />
      ) : (
        <Icon icon="carbon:copy" className="w-4 h-4" />
      )}
    </button>
  )
}

function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  const [text, setText] = useState('')

  return (
    <figure data-rehype-pretty-code-figure="" className="relative">
      <CopyButton text={text} />
      <pre
        ref={(node) => {
          if (node) setText(node.textContent || '')
        }}
        {...props}
      >
        {children}
      </pre>
    </figure>
  )
}

const mdxComponents = {
  GitHubCard,
  LinkCard,
  ImageGallery,
  GalleryImage,
  Callout,
  pre: Pre,
  figure: ({ children, ...props }: ComponentPropsWithoutRef<'figure'>) => {
    const figureProps = props as { 'data-rehype-pretty-code-figure'?: string }
    if (figureProps['data-rehype-pretty-code-figure'] !== undefined) {
      return <>{children}</>
    }
    return <figure {...props}>{children}</figure>
  },
}

function getMDXComponent(code: string) {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXContentProps {
  code: string
  className?: string
}

const MDXRenderer = memo(function MDXRenderer({
  Component,
}: {
  Component: React.ComponentType<{ components: typeof mdxComponents }>
}) {
  return <Component components={mdxComponents} />
})

export function MDXContent({ code, className }: MDXContentProps) {
  const Component = useMemo(() => getMDXComponent(code), [code])

  if (!Component) {
    return <div className={className}>Failed to load content</div>
  }

  return (
    <div className={className}>
      <MDXRenderer Component={Component} />
    </div>
  )
}
