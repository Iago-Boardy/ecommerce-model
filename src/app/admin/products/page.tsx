import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, XCircle } from "lucide-react";

export default function AdminProductPages() {
  return <>
    <div className="flex justify-between items-center gap-4">
      <PageHeader>Produtos</PageHeader>
      <Button asChild>
        <Link href="/admin/products/new">Adicione um Produto</Link>
      </Button>
    </div>

    <ProductsTable />

  </>
}

async function ProductsTable() {
  const products = await db.product.findMany({ 
    select: {
     id: true, 
     name: true, 
     priceInCents: true, 
     isAvaliableForPurchase: true, 
     _count: { select: { orders: true}}  
    },
    orderBy: { name: "asc"}
  })

  if (products.length === 0) return <p>Nenhum Produto Encontrado</p>

  return <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Disponível para Compra</span>
          </TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Pedidos</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
          {products.map(product =>(
            <TableRow key={product.id}>
              <TableCell>

                {product.isAvaliableForPurchase ? //CONTINUAR CODANDO AQUI PARA PUXAR AS INFORMACOES DO BANCO DE DADOS E PRINTAR ELAS AQUI NESSA TABLE
                <> <CheckCircle2/> </> : 
                <> <XCircle/> </>}

              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </>
}