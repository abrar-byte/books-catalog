import { buildMetadata, siteConfig } from "@/lib/seo"
import { objectAny } from "@/types"
import BookList from "./home/BookList"
import Hero from "./home/Hero"

import Newsletter from "./home/Newsletter"

export const metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  url: "/",
})

type HomePageProps = {
  searchParams: objectAny
}
export default async function Page({ searchParams }: HomePageProps) {
  const { page = 1, limit = 10 } = await searchParams
  return (
    <>
      <Hero />
      <BookList page={page} limit={limit} />
      <Newsletter />
    </>
  )
}
