import { Button } from "@/components/ui/button";
import db from "@/db/db"
import { Product } from "@prisma/client";
import Link from "next/link";

function getMostPopularProducts() {
  return db.product.findMany(
    { where: {isAvaliableForPurchase: true}, 
    orderBy: { orders: { _count: "desc"}},
    take: 6
  })
}

function getNewestProducts() {
  return db.product.findMany({
    where: { isAvaliableForPurchase: true },
    orderBy: { createdAt: "desc" }, 
    take: 6 
  });
}

export default function HomePage() {
  return <main className="space-y-12">
    <ProductGridSection title="Mais Populares" productsFetcher={getMostPopularProducts}/>
    <ProductGridSection title="Recentes" productsFetcher={getNewestProducts}/>
  </main>
}

type ProductGridSectionProps = {
  title: string
  productsFetcher: () => Promise<Product[]>
}

function ProductGridSection( { productsFetcher, title}: ProductGridSectionProps) {
  return (
  <div className="space-y-4">
    <div className="flex gap-4 ">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Button asChild variant={"outline"}>
        <Link href="/products">Ver Mais</Link>
      </Button>
    </div>
  </div>
  )
}

