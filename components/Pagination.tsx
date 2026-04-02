"use client"
import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import ReactPaginate from "react-paginate"
import * as Select from "@radix-ui/react-select"
import { cn } from "@/lib/utils"
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react"
type page = { current: number; take: number }

type PaginationProps = {
  hideNavigate?: boolean
  totalPages?: number
  totalItems?: number
  currentPage: number
  take: number
  pageQueryParam?: string
  onPageChange?: (page: number) => void
  onTakeChange?: (take: number) => void
  className?: string
}

const limitOptions = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 20, label: 20 },
  { value: 30, label: 30 },
  { value: 40, label: 40 },
  { value: 50, label: 50 },
]

const Pagination: React.FC<PaginationProps> = ({
  totalPages = 10,
  currentPage = 1,
  pageQueryParam = "page",
  onPageChange,
  onTakeChange,
  take,
  totalItems = 1,
  className,
  hideNavigate,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.set(pageQueryParam, pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1

    if (onPageChange) {
      onPageChange(newPage)
    } else {
      router.push(createPageURL(newPage), { scroll: false })
    }
  }

  const handleSelectTake = (value: number) => {
    if (onTakeChange) {
      onTakeChange(value)
    } else {
      const params = new URLSearchParams(searchParams?.toString() || "")
      params.set("limit", value.toString())
      params.delete("page")
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }

  return (
    <div
      className={cn("mb-5 flex items-center justify-center gap-10", className)}
    >
      <ReactPaginate
        className={`flex items-center gap-2 ${totalItems <= take ? "hidden" : " "}`}
        forcePage={currentPage - 1}
        pageCount={totalPages}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel={<RiArrowLeftSLine className="size-[18px]" aria-hidden />}
        nextLabel={<RiArrowRightSLine className="size-[18px]" aria-hidden />}
        breakLabel="..."
        breakClassName="mx-2 text-muted-foreground"
        pageClassName="cursor-pointer rounded-2xl border border-border bg-white py-1.5 shadow-[0_10px_40px_-10px_rgba(236,72,153,0.15)] transition-colors hover:border-primary/50 hover:text-primary"
        pageLinkClassName="px-4 py-2 text-foreground"
        disabledLinkClassName="pointer-events-none cursor-not-allowed opacity-40 text-muted-foreground hover:border-border hover:text-muted-foreground"
        previousLinkClassName={cn(
          hideNavigate && "!hidden lg:!hidden",
          "mr-4 hidden size-10 items-center justify-center rounded-2xl border border-border bg-white p-2 text-primary shadow-[0_10px_40px_-10px_rgba(236,72,153,0.15)] transition-colors hover:border-primary hover:bg-transparent hover:text-primary lg:flex"
        )}
        nextLinkClassName={cn(
          hideNavigate && "!hidden lg:!hidden",
          "ml-4 hidden size-10 items-center justify-center rounded-2xl border border-border bg-white p-2 text-primary shadow-[0_10px_40px_-10px_rgba(236,72,153,0.15)] transition-colors hover:border-primary hover:bg-transparent hover:text-primary lg:flex"
        )}
        activeLinkClassName="rounded-2xl bg-primary text-primary-foreground shadow-none hover:bg-primary hover:text-primary-foreground hover:border-transparent"
      />
      <Select.Root
        value={String(take)}
        onValueChange={(value: string) => handleSelectTake(parseInt(value))}
      >
        <Select.Trigger className="mt-3 inline-flex h-10 w-20 items-center justify-between rounded-2xl border border-border bg-white px-4 py-2 text-sm font-medium shadow-[0_10px_40px_-10px_rgba(236,72,153,0.15)] hover:border-primary/40 hover:text-primary focus:ring-0 focus:outline-none sm:mt-0">
          <Select.Value placeholder="Show items" />
          <Select.Icon className="ml-2">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="z-50 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_10px_40px_-10px_rgba(236,72,153,0.2)]">
            <Select.Viewport className="p-1">
              {limitOptions?.map((opt: any, iOpt: number) => {
                return (
                  <Select.Item
                    key={iOpt}
                    value={String(opt?.value)}
                    className="relative flex cursor-pointer items-center rounded-xl px-4 py-2 text-sm select-none hover:bg-orange-100/60 hover:text-secondary focus:bg-orange-100/60 focus:outline-none"
                  >
                    <Select.ItemText>{opt?.label}</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Select.ItemIndicator>
                  </Select.Item>
                )
              })}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
export default Pagination
