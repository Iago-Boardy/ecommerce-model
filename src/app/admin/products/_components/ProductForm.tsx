"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { addProduct } from "../../_actions/product"
import { useFormState, useFormStatus } from "react-dom" 

export function ProductForm() {
  const [error, action] = useFormState(addProduct, {})
  const [priceInCents, setPriceInCents] = useState<number>() 

  return <>
  <form action={action} className="space-y-8">
    <div className="space-y-2">
      <Label htmlFor="name">Nome</Label>
      <Input type="text" id="name" name="name"/>
      {error.name && <div className="text-destructive">{error.name}</div>}
    </div>

    <div className="space-y-2">
      <Label htmlFor="priceInCents">Preço pago em centavos</Label>
      <Input type="number" id="priceInCents" name="priceInCents" value={priceInCents} onChange={e => setPriceInCents(Number(e.target.value) || undefined )}/>
      <div className="text-muted-foreground">{formatCurrency((priceInCents || 0) / 100)}</div>
      {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
    </div>

    <div className="space-y-2">
      <Label htmlFor="description">Descrição</Label>
      <Textarea id="description" name="description"/>
      {error.description && <div className="text-destructive">{error.description}</div>}
    </div>

    <div className="space-y-2">
      <Label htmlFor="file">Arquivo</Label>
      <Input type="file" id="file" name="file"/>
      {error.file && <div className="text-destructive">{error.file}</div>}
    </div>

    <div className="space-y-2">
      <Label htmlFor="image">Imagem</Label>
      <Input type="file" id="image" name="image"/>
      {error.image && <div className="text-destructive">{error.image}</div>}
    </div>
    <SubmitButton/>
  </form>
  
  </>
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>  
      {pending ? "Salvando..." : "Salvar"}
    </Button>
  );
}
