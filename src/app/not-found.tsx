import Link from "next/link"
import Image from "next/image"
import Button from "@/components/ui/Button"

const designerImage = "/designer.png"

function NotFound () {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen gap-5">
      <Image
        src={designerImage}
        alt="404 - Not Found"
        width={200}
        height={100}
        priority // inmediate download
        className="object-contain" // maintain proportions
      />
      <h1 className="text-7xl">404</h1>
      <h2 className="text-5xl">Pagina no encontrada</h2>
      <Link href="/">
        <Button
          text="Volver"
          size="lg"
        />
      </Link>
    </section>
  )
}

export default NotFound