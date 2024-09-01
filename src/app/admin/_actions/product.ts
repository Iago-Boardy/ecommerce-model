"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises" //usamos isso para salvar imagens
import { notFound, redirect } from "next/navigation"

const fileSchema = z.instanceof(File, { message: "Required "})
const imageSchema = fileSchema.refine(file => file.size == 0 || file.type.startsWith("image/"))

const addSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  description: z.string().min(1, { message: "A descrição é obrigatória." }),
  priceInCents: z
    .preprocess((value) => {
      const parsed = parseFloat(value as string);
      return isNaN(parsed) ? undefined : parsed;
    }, z.number()
    .int({ message: "O preço deve ser um número inteiro." })
    .min(1, { message: "O preço deve ser maior que 0." })
    .or(z.undefined()) 
    .default(0)
    .refine(value => value !== undefined, { message: "O preço é obrigatório." })),
  file: fileSchema.refine(file => file.size > 0, { message: "O arquivo é obrigatório." }),
  image: imageSchema.refine(file => file.size > 0, { message: "A imagem é obrigatória." }),
});



export async function addProduct(prevState: unknown, formData: FormData) { //actions devem ser async e alem disso, devemos cuidar com a questao de prevState que serve pra adicionar msg de erro
  const result = addSchema.safeParse(Object.fromEntries(formData.entries())) // retorna um object com informacoes validadas
   if (result.success == false) {
      return result.error.formErrors.fieldErrors
   }

   const data = result.data

   await fs.mkdir("products", { recursive: true})
   const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
   await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

   await fs.mkdir("public/products", { recursive: true})
   const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
   await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

   await db.product.create({ data: {
    isAvaliableForPurchase: false,
    name: data.name,
    description: data.description,
    priceInCents: data.priceInCents,
    filePath,
    imagePath,
   }})

   redirect("/admin/products")
}

export async function toggleProductAvailability(id: string, isAvaliableForPurchase: boolean) {
  await db.product.update({ where: {id}, data: { isAvaliableForPurchase}} )
}

export async function deleteProduct(id:string) {
  const product = await db.product.delete({where: { id}})
  if (product == null) return notFound()
}