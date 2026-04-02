import type { Metadata } from "next"

interface BuildMetadataParams {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noindex?: boolean
}

export function buildMetadata({
  title,
  description,
  keywords = [],
  image = siteConfig.ogImage,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  noindex = false,
}: BuildMetadataParams): Metadata {
  const brand = siteConfig.shortName
  const fullTitle =
    title.includes(brand) || title.includes(siteConfig.legalName)
      ? title
      : `${title} | ${brand}`
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const ogImage = image.startsWith("http") ? image : `${siteConfig.url}${image}`

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    robots: noindex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "id_ID",
      type: type === "article" ? "article" : "website",
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }

  return metadata
}

export function generateStructuredData({
  type,
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}: {
  type: "WebSite" | "Article" | "Organization" | "Product"
  title: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: {
    name: string
    url?: string
  }
}) {
  const base = {
    "@context": "https://schema.org",
  }

  switch (type) {
    case "WebSite":
      return {
        ...base,
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
      }

    case "Article":
      return {
        ...base,
        "@type": "Article",
        headline: title,
        description,
        image: image ? `${siteConfig.url}${image}` : undefined,
        datePublished,
        dateModified: dateModified || datePublished,
        author: author
          ? {
              "@type": "Person",
              name: author.name,
              url: author.url,
            }
          : undefined,
        publisher: {
          "@type": "Organization",
          name: siteConfig.legalName,
          url: siteConfig.url,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}${siteConfig.logoPath}`,
          },
        },
      }

    case "Organization":
      return {
        ...base,
        "@type": "Organization",
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logoPath}`,
        telephone: siteConfig.phone,
        areaServed: "Indonesia",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Jl. Banyuanyar Selatan No.01, RT.02/RW.XII, Banyuanyar, Kec. Banjarsari",
          addressLocality: "Kota Surakarta",
          addressRegion: "Jawa Tengah",
          postalCode: "57137",
          addressCountry: "ID",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phone,
          email: siteConfig.email,
          contactType: "customer service",
          areaServed: "Indonesia",
          availableLanguage: "Indonesian",
        },
      }

    case "Product":
      return {
        ...base,
        "@type": "Product",
        name: title,
        description,
        image: image ? `${siteConfig.url}${image}` : undefined,
        brand: {
          "@type": "Brand",
          name: siteConfig.name,
        },
        offers: {
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
        },
      }

    default:
      return base
  }
}

export function generateBreadcrumbData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

export const siteConfig = {
  name: "Ziyadbooks",
  shortName: "Ziyadbooks",
  legalName: "CV Ziyad Visi Media",
  description:
    "Ziyadbooks — toko buku online Ziyad Visi Media. Buku anak, parenting, edukasi Islami, merchandise, dan edutoys. Layanan pelanggan 24/7.",
  url: "https://ziyadbooks.com",
  email: "official@ziyadbooks.com",
  phone: "+62271727027",
  phoneDisplay: "0271-727027",
  location:
    "Jl. Banyuanyar Selatan No.01, RT.02/RW.XII, Banyuanyar, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57137",
  logoPath: "/images/logo-header.svg",

  socials: {
    tiktok: "https://www.tiktok.com/@ziyadbooks.official",
    telegram: "https://t.me/ZiyadbooksOfficial",
    instagram: "https://www.instagram.com/ziyadbooks.official/?hl=id",
    facebook: "https://www.facebook.com/ziyadbooks/about/",
    whatsapp: "https://wa.me/6282243431114",
  },

  keywords: [
    "buku anak",
    "penerbit buku islami",
    "ziyadbooks",
    "ziyad visi media",
    "buku parenting",
    "toko buku online",
    "surakarta",
  ],
  author: "Ziyad Visi Media",
  ogImage: "/images/logo-header.svg",
}
