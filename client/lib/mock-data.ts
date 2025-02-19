import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  addresses: Address[];
  wishlist: string[];
  orderHistory: Order[];
};

export type Address = {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductSize = {
  name: string;
  dimensions: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  material: string;
  reviews: Review[];
  estimatedDelivery: string;
  createdAt: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
  color: string;
  size: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingDetails: Address;
  paymentMethod: string;
  discountCode?: string;
  trackingNumber?: string;
};

export type Review = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  date: string;
};

export type Notification = {
  id: string;
  userId: string;
  message: string;
  date: string;
  read: boolean;
};

type State = {
  users: User[];
  currentUser: User | null;
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  notifications: Notification[];
  addUser: (user: User) => void;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addToCart: (
    productId: string,
    quantity: number,
    color: string,
    size: string
  ) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (
    productId: string,
    quantity: number,
    color: string,
    size: string
  ) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addToWishlist: (userId: string, productId: string) => void;
  removeFromWishlist: (userId: string, productId: string) => void;
  addAddress: (userId: string, address: Address) => void;
  updateAddress: (userId: string, address: Address) => void;
  deleteAddress: (userId: string, addressId: string) => void;
  updateUserProfile: (userId: string, updates: Partial<User>) => void;
  addReview: (review: Review) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string) => void;
  applyDiscountCode: (orderId: string, discountCode: string) => void;
  setCurrentUser: (user: User) => void;
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      products: [],
      cart: [],
      orders: [],
      notifications: [],
      addUser: user => set(state => ({ users: [...state.users, user] })),
      login: (email, password) => {
        const user = get().users.find(
          u => u.email === email && u.password === password
        );
        if (user) {
          set({ currentUser: user });
          return user;
        }
        return null;
      },
      logout: () => set({ currentUser: null }),
      addProduct: product =>
        set(state => ({ products: [...state.products, product] })),
      updateProduct: updatedProduct =>
        set(state => ({
          products: state.products.map(product =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        })),
      deleteProduct: productId =>
        set(state => ({
          products: state.products.filter(product => product.id !== productId)
        })),
      addToCart: (productId, quantity, color, size) =>
        set(state => {
          const existingItem = state.cart.find(
            item =>
              item.productId === productId &&
              item.color === color &&
              item.size === size
          );
          if (existingItem) {
            return {
              cart: state.cart.map(item =>
                item.productId === productId &&
                item.color === color &&
                item.size === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          } else {
            return {
              cart: [...state.cart, { productId, quantity, color, size }]
            };
          }
        }),
      removeFromCart: productId =>
        set(state => ({
          cart: state.cart.filter(item => item.productId !== productId)
        })),
      updateCartItem: (productId, quantity, color, size) =>
        set(state => ({
          cart: state.cart.map(item =>
            item.productId === productId
              ? { ...item, quantity, color, size }
              : item
          )
        })),
      clearCart: () => set({ cart: [] }),
      addOrder: order => set(state => ({ orders: [...state.orders, order] })),
      updateOrderStatus: (orderId, status) =>
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        })),
      addToWishlist: (userId, productId) =>
        set(state => ({
          users: state.users.map(user =>
            user.id === userId
              ? { ...user, wishlist: [...user.wishlist, productId] }
              : user
          )
        })),
      removeFromWishlist: (userId, productId) =>
        set(state => ({
          users: state.users.map(user =>
            user.id === userId
              ? {
                  ...user,
                  wishlist: user.wishlist.filter(id => id !== productId)
                }
              : user
          )
        })),
      addAddress: (userId, address) =>
        set(state => ({
          users: state.users.map(user =>
            user.id === userId
              ? { ...user, addresses: [...user.addresses, address] }
              : user
          )
        })),
      updateAddress: (userId, updatedAddress) =>
        set(state => ({
          users: state.users.map(user =>
            user.id === userId
              ? {
                  ...user,
                  addresses: user.addresses.map(address =>
                    address.id === updatedAddress.id ? updatedAddress : address
                  )
                }
              : user
          )
        })),
      deleteAddress: (userId, addressId) =>
        set(state => ({
          users: state.users.map(user =>
            user.id === userId
              ? {
                  ...user,
                  addresses: user.addresses.filter(
                    address => address.id !== addressId
                  )
                }
              : user
          )
        })),
      updateUserProfile: (userId, updates) =>
        set(state => ({
          users: state.users.map(user =>
            user.id === userId ? { ...user, ...updates } : user
          )
        })),
      addReview: review =>
        set(state => ({
          products: state.products.map(product =>
            product.id === review.productId
              ? { ...product, reviews: [...product.reviews, review] }
              : product
          )
        })),
      addNotification: notification =>
        set(state => ({
          notifications: [...state.notifications, notification]
        })),
      markNotificationAsRead: notificationId =>
        set(state => ({
          notifications: state.notifications.map(notification =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification
          )
        })),
      applyDiscountCode: (orderId, discountCode) =>
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, discountCode } : order
          )
        })),
      setCurrentUser: user => set({ currentUser: user })
    }),
    {
      name: 'furniture-management-store'
    }
  )
);

// Initialize with some mock data
const initializeMockData = () => {
  const { addUser, addProduct, addOrder } = useStore.getState();

  // Add mock users
  addUser({
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    addresses: [],
    wishlist: [],
    orderHistory: []
  });
  addUser({
    id: '2',
    username: 'user',
    email: 'user@example.com',
    password: 'user12345678',
    role: 'user',
    addresses: [],
    wishlist: [],
    orderHistory: []
  });

  // Add mock products
  const categories = ['Chairs', 'Sofas', 'Tables', 'Beds', 'Storage'];
  const products = [
    {
      id: '1',
      name: 'Modern Wooden Chair',
      category: 'Chairs',
      price: 199,
      description:
        'A comfortable modern wooden chair with customizable colors and sizes.',
      image: 'https://via.placeholder.com/300?text=Wooden+Chair',
      stock: 50,
      colors: [
        { name: 'Natural', hex: '#D2B48C' },
        { name: 'Walnut', hex: '#5C4033' },
        { name: 'Ebony', hex: '#3D2B1F' }
      ],
      sizes: [
        { name: 'Small', dimensions: '18"W x 20"D x 30"H' },
        { name: 'Medium', dimensions: '20"W x 22"D x 32"H' },
        { name: 'Large', dimensions: '22"W x 24"D x 34"H' }
      ],
      material: 'Oak',
      reviews: [],
      estimatedDelivery: '3-5 business days',
      createdAt: '2023-01-15T00:00:00.000Z'
    },
    {
      id: '2',
      name: 'Elegant Sofa',
      category: 'Sofas',
      price: 899,
      description:
        'A luxurious and elegant sofa with multiple color options and sizes.',
      image: '/images/elegant-sofa.jpg',
      stock: 30,
      colors: [
        { name: 'Beige', hex: '#F5F5DC' },
        { name: 'Gray', hex: '#808080' },
        { name: 'Navy', hex: '#000080' }
      ],
      sizes: [
        { name: 'Loveseat', dimensions: '58"W x 38"D x 34"H' },
        { name: '3-Seater', dimensions: '84"W x 38"D x 34"H' },
        { name: 'Sectional', dimensions: '104"W x 84"D x 34"H' }
      ],
      material: 'Leather',
      reviews: [],
      estimatedDelivery: '7-10 business days',
      createdAt: '2023-02-20T00:00:00.000Z'
    },
    {
      id: '3',
      name: 'Coffee Table',
      category: 'Tables',
      price: 299,
      description:
        'A stylish coffee table for your living room with various finishes and sizes.',
      image: '/images/coffee-table.jpg',
      stock: 40,
      colors: [
        { name: 'Oak', hex: '#DEBB87' },
        { name: 'Mahogany', hex: '#C04000' },
        { name: 'White', hex: '#FFFFFF' }
      ],
      sizes: [
        { name: 'Small', dimensions: '36"W x 24"D x 18"H' },
        { name: 'Medium', dimensions: '42"W x 28"D x 18"H' },
        { name: 'Large', dimensions: '48"W x 30"D x 18"H' }
      ],
      material: 'Wood and Glass',
      reviews: [],
      estimatedDelivery: '5-7 business days',
      createdAt: '2023-03-10T00:00:00.000Z'
    },
    {
      id: '4',
      name: 'Queen Size Bed',
      category: 'Beds',
      price: 599,
      description:
        'A comfortable queen size bed with a modern design and various color options.',
      image: '/images/queen-bed.jpg',
      stock: 25,
      colors: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Black', hex: '#000000' },
        { name: 'Gray', hex: '#808080' }
      ],
      sizes: [{ name: 'Queen', dimensions: '60"W x 80"L' }],
      material: 'Wood and Upholstered Headboard',
      reviews: [],
      estimatedDelivery: '7-14 business days',
      createdAt: '2023-04-05T00:00:00.000Z'
    },
    {
      id: '5',
      name: 'Wardrobe',
      category: 'Storage',
      price: 499,
      description:
        'A spacious wardrobe with multiple compartments and color options.',
      image: '/images/wardrobe.jpg',
      stock: 35,
      colors: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Oak', hex: '#DEBB87' },
        { name: 'Espresso', hex: '#3E2723' }
      ],
      sizes: [
        { name: '2-Door', dimensions: '47"W x 22"D x 71"H' },
        { name: '3-Door', dimensions: '71"W x 22"D x 71"H' },
        { name: '4-Door', dimensions: '94"W x 22"D x 71"H' }
      ],
      material: 'Engineered Wood',
      reviews: [],
      estimatedDelivery: '10-15 business days',
      createdAt: '2023-05-01T00:00:00.000Z'
    }
  ];

  products.forEach(product => addProduct(product));

  // Add mock orders
  const orders = [
    {
      id: '1',
      userId: '2',
      items: [
        { productId: '1', quantity: 2, color: 'Natural', size: 'Medium' }
      ],
      total: 398,
      status: 'delivered',
      date: '2023-01-20T00:00:00.000Z',
      shippingDetails: {
        id: '1',
        name: 'John Doe',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        country: 'USA'
      },
      paymentMethod: 'Credit Card',
      discountCode: 'NEWYEAR2023',
      trackingNumber: 'TRACK123456'
    },
    {
      id: '2',
      userId: '2',
      items: [
        { productId: '2', quantity: 1, color: 'Beige', size: 'Loveseat' }
      ],
      total: 899,
      status: 'processing',
      date: '2023-02-15T00:00:00.000Z',
      shippingDetails: {
        id: '2',
        name: 'Jane Smith',
        street: '456 Elm St',
        city: 'Othertown',
        state: 'NY',
        zipCode: '67890',
        country: 'USA'
      },
      paymentMethod: 'PayPal'
    }
    // Add more orders as needed
  ];

  orders.forEach(order => addOrder(order));
};

initializeMockData();
