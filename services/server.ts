import { baseURL } from "@/lib/constants"

function productListFallback(
  partial: Partial<{ status: boolean; message: string; code: number }> = {}
) {
  return {
    status: partial.status ?? false,
    message: partial.message ?? "",
    code: partial.code ?? 0,
    data: {
      current_page: 1,
      data: [] as Record<string, unknown>[],
      first_page_url: "",
      from: 0,
      last_page: 0,
      next_page_url: null as string | null,
      per_page: 10,
      prev_page_url: null as string | null,
      to: 0,
      total: 0,
    },
  }
}

export async function getList(table: string, tags: string[]) {
  try {
    const res = await fetch(`${baseURL}/${table}`, {
      next: {
        revalidate: 300,
        tags,
      },
    })

    if (!res.ok) {
      const body = await res.text()
      console.error("getList error:", res.status, body)
      return productListFallback({
        message: "Gagal mengambil data produk",
        code: res.status,
      }).data
    }
    const result = await res.json()
    return result?.data
  } catch (error) {
    console.error("getList error:", error)
    return productListFallback({
      message: "Gagal mengambil data produk",
    }).data
  }
}
