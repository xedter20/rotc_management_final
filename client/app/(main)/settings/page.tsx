"use client"

import { useState } from "react"
import { useStore } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  const currentUser = useStore((state) => state.currentUser)
  const updateUserProfile = useStore((state) => state.updateUserProfile)
  const addAddress = useStore((state) => state.addAddress)
  const updateAddress = useStore((state) => state.updateAddress)
  const deleteAddress = useStore((state) => state.deleteAddress)

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  if (!currentUser) {
    return <div>Please log in to view your settings.</div>
  }

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const updates = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
    }
    updateUserProfile(currentUser.id, updates)
  }

  const handleAddAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addAddress(currentUser.id, { id: Date.now().toString(), ...newAddress })
    setNewAddress({ name: "", street: "", city: "", state: "", zipCode: "", country: "" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details here.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" defaultValue={currentUser.username} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={currentUser.email} />
                  </div>
                </div>
                <Button type="submit" className="mt-4">
                  Save changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle>Addresses</CardTitle>
              <CardDescription>Manage your shipping addresses.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentUser.addresses.map((address) => (
                  <div key={address.id} className="border p-4 rounded-md">
                    <h3 className="font-semibold">{address.name}</h3>
                    <p>{address.street}</p>
                    <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
                    <p>{address.country}</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteAddress(currentUser.id, address.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <form onSubmit={handleAddAddress}>
                <h3 className="font-semibold mb-2">Add New Address</h3>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="street">Street</Label>
                    <Input
                      id="street"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        value={newAddress.zipCode}
                        onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={newAddress.country}
                        onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="mt-4">
                  Add Address
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders and their status.</CardDescription>
            </CardHeader>
            <CardContent>
              {currentUser.orderHistory.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {currentUser.orderHistory.map((order) => (
                    <div key={order.id} className="border p-4 rounded-md">
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                      <p>Total: ${order.total.toFixed(2)}</p>
                      <p>Status: {order.status}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

