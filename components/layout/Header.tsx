import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button"
const menu = [{ title: "Catalog", url: "#catalog" }]
const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="wrapper flex h-20 items-center justify-between md:px-[60px]">
        <Link href="/">
          <Image
            src="/images/logo-header.svg"
            alt="Logo"
            width={310}
            height={30}
            className="h-[30px] w-auto cursor-pointer md:h-[30px]"
          />
        </Link>
        <nav className="font-manrope hidden items-center justify-center gap-x-6 text-lg md:flex">
          {menu.map((item, i) => (
            <Button
              asChild
              key={i}
              className="rounded-full p-2 text-base hover:border-primary hover:bg-transparent hover:text-primary"
            >
              <Link href={item.url}>{item.title}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
