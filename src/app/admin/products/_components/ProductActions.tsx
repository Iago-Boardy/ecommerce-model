'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions/product";

export function ActiveToggleDropdownItem({ id, isAvailableForPurchase }: { id: string, isAvailableForPurchase: boolean }) {
  const [isPending, startTransition] = useTransition()
  return ( 
    <DropdownMenuItem
      disabled={isPending}
      onSelect={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase)
        })
      }}
    >
      {isAvailableForPurchase ? "Desativar" : "Ativar"}
    </DropdownMenuItem>
  )
}

export function DeleteDropdownItem({ id, disabled }: { id: string, disabled: boolean }) {
  const [isPending, startTransition] = useTransition()
  return ( 
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPending}
      onSelect={() => {
        startTransition(async () => {
          await deleteProduct(id)
        })
      }}
    >
      Delete
    </DropdownMenuItem>
  )
}