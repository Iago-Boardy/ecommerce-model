import { ProductCard } from "@/components/Product";
import { Button } from "@/components/ui/button";
import db from "@/db/db"
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
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

async function ProductGridSection( { productsFetcher, title}: ProductGridSectionProps) {
  return (
  <div className="space-y-4">
    <div className="flex gap-4 ">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Button asChild variant={"outline"}>
        <Link href="/products" className="space-x-2">
          <span>Ver Mais</span>
          <ArrowRight className="size-4"/>
        </Link>
      </Button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {(await (await productsFetcher()).map(product => (
        <ProductCard key={product.id} {...product}/> //Aqui estamos mapeando os componentes puxando do banco de dados em ProductCard
      )))}
      
    </div>
  
  </div>
  )
}

