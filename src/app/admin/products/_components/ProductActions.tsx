import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useTransition } from "react";
import { toggleProductAvailability } from "../../_actions/product";

export function ActiveToggleDropdownItem( { id, isAvailableForPurchase}: { id:string, isAvailableForPurchase: boolean}) {
  const [isPending, startTransition] = useTransition()
 return <DropdownMenuItem onClick={() =>  {
  startTransition(async () => {
    await toggleProductAvailability(id, !isAvailableForPurchase)
  })
 }}>

 </DropdownMenuItem>
}

export function DeleteDropdownItem() {
  
}