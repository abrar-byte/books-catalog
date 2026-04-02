import BookCard from "@/components/BookCard"
import { BookCardBook } from "@/types/book"
import { getList } from "@/services/server"
import React, { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Pagination from "@/components/Pagination"

type BookListProps = {
  page: number
  limit: number
}

export default async function BookList({ page, limit }: BookListProps) {
  const books = await getList(
    `ecommerce/products/all/category?page=${page}&limit=${limit}`,
    ["books-list"]
  )

  return (
    <section id="catalog" className="wrapper py-15">
      <h1 className="mb-10 font-heading text-3xl font-extrabold">
        Temukan Buku Pilihan Untuk Anak
      </h1>

      <Suspense
        fallback={
          <div className="contents">
            <BookListSkeleton count={limit} />
          </div>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {!!books?.data?.length ? (
            books.data.map((book: BookCardBook) => (
              <BookCard key={book.id} book={book} />
            ))
          ) : (
            <div className="contents">
              <p className="col-span-full py-10 text-center font-heading text-2xl font-bold">
                Belum ada buku yang ditemukan
              </p>
            </div>
          )}
        </div>

        <Pagination
          take={Number(limit)}
          totalItems={books?.total || 0}
          totalPages={books?.last_page || 1}
          currentPage={Number(page)}
          className="mt-10"
        />
      </Suspense>
    </section>
  )
}

function BookListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: Math.max(4, Math.min(count, 12)) }).map(
        (_, index) => (
          <div
            key={index}
            className="flex min-h-88 flex-col gap-2 rounded-2xl border bg-white p-3 shadow-[0_10px_40px_-10px_rgba(236,72,153,0.15)]"
          >
            <Skeleton className="mx-1 aspect-square shrink-0 rounded-2xl" />
            <div className="mt-2 flex min-h-0 flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-full max-w-[95%]" />
              <Skeleton className="h-4 w-3/4" />
              <div className="mt-auto flex shrink-0 items-center justify-between gap-2">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-10 w-28 rounded-full" />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}
