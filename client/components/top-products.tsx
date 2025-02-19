import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const topProducts = [
  {
    name: "Modern Sofa",
    sales: 123,
    revenue: "$110,450",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Dining Chair",
    sales: 98,
    revenue: "$14,700",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Coffee Table",
    sales: 87,
    revenue: "$26,100",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Bookshelf",
    sales: 76,
    revenue: "$45,600",
    image: "/placeholder.svg?height=50&width=50",
  },
]

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-[#312f2f]">{product.name}</h3>
                <p className="text-sm text-[#6a717d]">{product.sales} sales</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#ba8a5b]">{product.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

