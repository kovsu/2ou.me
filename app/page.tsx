import { blog, projects } from '@/.velite'
import { HomeClient } from '@/components/HomeClient'

export default function Home() {
  const latestPosts = blog
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  const latestProjects = projects.slice(0, 2)

  return (
    <HomeClient 
      projects={latestProjects} 
      posts={latestPosts} 
    />
  )
}
