import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

function ProductsTable() {
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
          
      </TableBody>
    </Table>
  </>
}