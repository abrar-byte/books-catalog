import { BookCardBook } from "@/types/book"
import Image from "next/image"
import { Button } from "./ui/button"

type BookCardProps = {
  book: BookCardBook
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="flex h-full flex-col space-y-2 rounded-2xl border bg-white p-3 shadow-[0_10px_40px_-10px_rgba(236,72,153,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative m-1 aspect-square shrink-0 rounded-2xl bg-gray-100">
        {book?.image_url && (
          <Image
            src={book?.image_url}
            alt={book.name}
            className="aspect-square rounded-2xl object-cover"
            fill
          />
        )}
      </div>
      <div className="mt-2 flex min-h-0 flex-1 flex-col gap-2">
        <h1 className="text-sm font-medium md:text-base" title={book.name}>
          {book.name}
        </h1>
        <div className="mt-auto flex shrink-0 items-center justify-between gap-2">
          <div className="space-y-1">
            <span className="text-secondary md:text-lg">
              {book.final_price_formatted}
            </span>
            {parseInt(book?.diskon) > 0 && (
              <div className="flex items-center gap-1">
                <div className="rounded-md bg-orange-100 p-1 text-xs text-secondary">
                  {book?.diskon}
                  {book.jenispotongan === "persen" ? "%" : book.jenispotongan}
                </div>
                <span className="text-sm text-gray-400 line-through">
                  {book.price_formatted}
                </span>
              </div>
            )}
          </div>
          <Button
            size="lg"
            className="cursor-pointer rounded-full text-base hover:border-primary hover:bg-transparent hover:text-primary"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
