import React from "react"
import Link from "next/link"
import { RiTelegram2Line } from "@remixicon/react"
import { Button } from "@/components/ui/button"
export default function Newsletter() {
  return (
    <section className="wrapper pt-5 pb-20">
      <div className="rounded-xl border border-[#e3e8f2] bg-white p-6 text-center shadow-sm">
        <h3 className="font-heading text-4xl font-extrabold">
          Dapatkan Promo dan Buku Baru Setiap Bulan!
        </h3>
        <p className="mt-2 text-lg font-semibold text-slate-600">
          Bergabung dengan telegram Ziyad Books untuk info & penawaran
          eksklusif.
        </p>
        <div className="mt-5 flex items-center justify-center">
          <Button asChild>
            <Link
              className="flex items-center gap-1"
              href="https://t.me/ZiyadbooksOfficial"
              target="_blank"
            >
              <RiTelegram2Line className="text-5xl" />
              <span className="text-lg font-semibold">
                Telegram Ziyad Books
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
