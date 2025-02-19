"use client"

import { useStore } from "@/lib/mock-data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function WishlistPage() {
  const currentUser = useStore((state) => state.currentUser)
  const products = useStore((state) => state.products)
  const removeFromWishlist = useStore((state) => state.removeFromWishlist)
  const addToCart = useStore((state) => state.addToCart)

  if (!currentUser) {
    return <div>Please log in to view your wishlist.</div>
  }

  const wishlistProducts = products.filter((product) => currentUser.wishlist.includes(product.id))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <Link href={`/products/${product.id}`}>
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <div className="flex justify-between w-full items-center mb-2">
                    <h3 className="font-semibold text-[#312f2f]">{product.name}</h3>
                    <span className="text-[#ba8a5b] font-medium">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-[#6a717d] mb-4">{product.category}</p>
                </CardFooter>
              </Link>
              <div className="p-4 pt-0 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => removeFromWishlist(currentUser.id, product.id)}
                  className="flex-1 mr-2"
                >
                  Remove
                </Button>
                <Button
                  className="flex-1 ml-2 bg-[#ba8a5b] hover:bg-[#a67b4d] text-white"
                  onClick={() => addToCart(product.id, 1, product.colors[0].name, product.sizes[0].name)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

