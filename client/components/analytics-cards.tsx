import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react"

const analyticsData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+15.2%",
    icon: ShoppingCart,
  },
  {
    title: "Products Sold",
    value: "2,845",
    change: "+12.5%",
    icon: Package,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+2.4%",
    icon: TrendingUp,
  },
]

export function AnalyticsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {analyticsData.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6a717d]">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-[#ba8a5b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#312f2f]">{item.value}</div>
            <p className="text-xs text-green-500 mt-1">{item.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

