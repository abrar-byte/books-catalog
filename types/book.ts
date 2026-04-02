export type BookCardBook = {
  id: number
  name: string
  slug: string
  price: number
  price_formatted: string
  image: string
  diskon: string
  weight: number
  type: number
  preorder: boolean
  mulai: string
  selesai: string
  sisastok: number
  sisastok_label: string
  jenispotongan: string
  potongan: number
  image_url: string
  final_price: number
  final_price_formatted: string
  video_available: boolean
  video: string | null
}
