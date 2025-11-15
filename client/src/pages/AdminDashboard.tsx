import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Lock, Search, Filter, Plus, Edit, Trash2, Check, X, Package, ShoppingCart, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema } from "@shared/schema";
import type { InsertProduct, Product, Order, Review } from "@shared/schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminDashboard() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("adminToken");
    if (stored) {
      setAuthToken(stored);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        throw new Error("Invalid password");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setAuthToken(data.token);
      localStorage.setItem("adminToken", data.token);
      toast({
        title: "Admin Access Granted",
        description: "Welcome to BM Creations Admin Dashboard",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Incorrect password",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(password);
  };

  const handleLogout = async () => {
    if (authToken) {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }
    setAuthToken(null);
    localStorage.removeItem("adminToken");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  if (!authToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-950/20 to-black p-4">
        <Card className="w-full max-w-md border-purple-500/30 bg-black/90">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="w-12 h-12 text-purple-500 neon-glow" />
            </div>
            <CardTitle className="text-3xl font-orbitron neon-text">Admin Login</CardTitle>
            <CardDescription>Enter password to access admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  data-testid="input-admin-password"
                  className="bg-black/50 border-purple-500/30"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                data-testid="button-admin-login"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-orbitron font-bold neon-text mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage orders, products, and reviews</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-purple-500/30">
            <TabsTrigger value="orders" data-testid="tab-orders">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="products" data-testid="tab-products">
              <Package className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="reviews" data-testid="tab-reviews">
              <Star className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersTab authToken={authToken} />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTab authToken={authToken} />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsTab authToken={authToken} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OrdersTab({ authToken }: { authToken: string }) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { toast } = useToast();

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders", statusFilter],
    queryFn: async () => {
      const response = await fetch(
        `/api/admin/orders?${statusFilter !== "all" ? `status=${statusFilter}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      return response.json();
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({
        title: "Status Updated",
        description: "Order status updated successfully. Discord notification sent.",
      });
      setShowConfirmDialog(false);
      setSelectedOrder(null);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status",
      });
    },
  });

  const handleStatusChange = (order: Order, status: string) => {
    setSelectedOrder(order);
    setNewStatus(status);
    setShowConfirmDialog(true);
  };

  const confirmStatusUpdate = () => {
    if (selectedOrder && newStatus) {
      updateStatusMutation.mutate({
        orderId: selectedOrder.id,
        status: newStatus,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-400";
      case "processing":
        return "text-blue-400";
      case "completed":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const filteredOrders = orders?.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.imvuId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <Card className="border-purple-500/30 bg-black/80">
        <CardHeader>
          <CardTitle className="font-exo2">Order Management</CardTitle>
          <CardDescription>View and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by Order ID, Email, or IMVU ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-orders"
                  className="pl-10 bg-black/50 border-purple-500/30"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="status-filter" className="sr-only">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  id="status-filter"
                  data-testid="select-status-filter"
                  className="bg-black/50 border-purple-500/30"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-400">Loading orders...</p>
            </div>
          ) : filteredOrders && filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} data-testid={`row-order-${order.id}`}>
                      <TableCell className="font-mono text-sm" data-testid={`text-order-id-${order.id}`}>
                        {order.orderId}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{order.imvuId}</div>
                          <div className="text-xs text-gray-400">{order.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{order.paymentMethod}</div>
                          {order.transactionId && (
                            <div className="text-xs text-gray-400 font-mono">
                              {order.transactionId}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium uppercase text-sm ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-400">
                        {format(new Date(order.createdAt), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(status) => handleStatusChange(order, status)}
                        >
                          <SelectTrigger
                            className="w-32 h-8 text-xs"
                            data-testid={`select-status-${order.id}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No orders found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-black/95 border-purple-500/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-orbitron">Confirm Status Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update the status of order{" "}
              <span className="font-mono text-purple-400">{selectedOrder?.orderId}</span> to{" "}
              <span className={`font-medium uppercase ${getStatusColor(newStatus)}`}>
                {newStatus}
              </span>
              ? This will send a Discord notification to the customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-update">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmStatusUpdate}
              data-testid="button-confirm-update"
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? "Updating..." : "Confirm Update"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function ProductsTab({ authToken }: { authToken: string }) {
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      type: "",
      imageUrl: "",
      videoUrl: "",
      isGift: false,
      features: [],
      loginMethod: "",
      vipRequired: false,
      sexRoomNeeded: false,
      pcSupport: true,
      mobileSupport: true,
    },
  });

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category,
        type: editingProduct.type,
        imageUrl: editingProduct.imageUrl,
        videoUrl: editingProduct.videoUrl || "",
        isGift: editingProduct.isGift || false,
        features: editingProduct.features || [],
        loginMethod: editingProduct.loginMethod || "",
        vipRequired: editingProduct.vipRequired || false,
        sexRoomNeeded: editingProduct.sexRoomNeeded || false,
        pcSupport: editingProduct.pcSupport !== undefined ? editingProduct.pcSupport : true,
        mobileSupport: editingProduct.mobileSupport !== undefined ? editingProduct.mobileSupport : true,
      });
      setImagePreview(editingProduct.imageUrl);
    } else {
      form.reset({
        name: "",
        description: "",
        price: 0,
        category: "",
        type: "",
        imageUrl: "",
        videoUrl: "",
        isGift: false,
        features: [],
        loginMethod: "",
        vipRequired: false,
        sexRoomNeeded: false,
        pcSupport: true,
        mobileSupport: true,
      });
      setImagePreview(null);
    }
  }, [editingProduct, form]);

  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Created",
        description: "New product added successfully",
      });
      setShowProductDialog(false);
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create product",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProduct> }) => {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Updated",
        description: "Product updated successfully",
      });
      setShowProductDialog(false);
      setEditingProduct(null);
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update product",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Deleted",
        description: "Product removed successfully",
      });
      setDeletingProductId(null);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
      });
    },
  });

  const onSubmit = (data: InsertProduct) => {
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data });
    } else {
      createProductMutation.mutate(data);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowProductDialog(true);
  };

  const handleDelete = (id: string) => {
    setDeletingProductId(id);
  };

  const confirmDelete = () => {
    if (deletingProductId) {
      deleteProductMutation.mutate(deletingProductId);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload-media", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      form.setValue("imageUrl", data.url);
      setImagePreview(data.url);
      
      toast({
        title: "Image Uploaded",
        description: "Product image uploaded successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Failed to upload image",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload-media", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      const data = await response.json();
      form.setValue("videoUrl", data.url);
      
      toast({
        title: "Video Uploaded",
        description: "Product video uploaded successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Failed to upload video",
      });
    } finally {
      setUploadingVideo(false);
    }
  };

  return (
    <>
      <Card className="border-purple-500/30 bg-black/80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-exo2">Product Management</CardTitle>
              <CardDescription>Manage product catalog</CardDescription>
            </div>
            <Button
              onClick={() => {
                setEditingProduct(null);
                setShowProductDialog(true);
              }}
              data-testid="button-add-product"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-400">Loading products...</p>
            </div>
          ) : products && products.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} data-testid={`row-product-${product.id}`}>
                      <TableCell className="font-medium" data-testid={`text-product-name-${product.id}`}>{product.name}</TableCell>
                      <TableCell data-testid={`text-product-category-${product.id}`}>{product.category}</TableCell>
                      <TableCell data-testid={`text-product-type-${product.id}`}>{product.type}</TableCell>
                      <TableCell className="text-purple-400" data-testid={`text-product-price-${product.id}`}>${(product.price / 100).toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(product)}
                            data-testid={`button-edit-product-${product.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(product.id)}
                            data-testid={`button-delete-product-${product.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No products found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="bg-black/95 border-purple-500/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-orbitron">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update product details" : "Create a new product in your catalog"}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Premium Trigger Pack" data-testid="input-product-name" className="bg-black/50 border-purple-500/30" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Detailed product description" data-testid="input-product-description" className="bg-black/50 border-purple-500/30" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="24.99"
                          value={field.value ? (field.value / 100).toFixed(2) : ""}
                          onChange={(e) => {
                            const dollars = parseFloat(e.target.value) || 0;
                            field.onChange(Math.round(dollars * 100));
                          }}
                          data-testid="input-product-price"
                          className="bg-black/50 border-purple-500/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Triggers" data-testid="input-product-category" className="bg-black/50 border-purple-500/30" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Premium" data-testid="input-product-type" className="bg-black/50 border-purple-500/30" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <FormControl>
                          <Input {...field} placeholder="Enter image URL or upload below" data-testid="input-product-image" className="bg-black/50 border-purple-500/30 flex-1" />
                        </FormControl>
                        <label htmlFor="image-upload">
                          <Button
                            type="button"
                            variant="outline"
                            disabled={uploadingImage}
                            className="border-purple-500/30"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            data-testid="button-upload-image"
                          >
                            {uploadingImage ? "Uploading..." : "Upload File"}
                          </Button>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          data-testid="input-image-file"
                        />
                      </div>
                      {(field.value || imagePreview) && (
                        <div className="relative w-32 h-32 border border-purple-500/30 rounded-md overflow-hidden">
                          <img
                            src={field.value || imagePreview || ""}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            data-testid="preview-product-image"
                          />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Video (Optional)</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input {...field} value={field.value || ""} placeholder="Enter video URL or upload below" data-testid="input-product-video" className="bg-black/50 border-purple-500/30 flex-1" />
                      </FormControl>
                      <label htmlFor="video-upload">
                        <Button
                          type="button"
                          variant="outline"
                          disabled={uploadingVideo}
                          className="border-purple-500/30"
                          onClick={() => document.getElementById('video-upload')?.click()}
                          data-testid="button-upload-video"
                        >
                          {uploadingVideo ? "Uploading..." : "Upload File"}
                        </Button>
                      </label>
                      <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                        data-testid="input-video-file"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="border-t border-purple-500/20 pt-4 mt-4">
                <h3 className="text-sm font-semibold mb-3 text-purple-400">Product Features</h3>
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features (one per line)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value?.join('\n') || ""}
                          onChange={(e) => field.onChange(e.target.value.split('\n').filter(f => f.trim()))}
                          placeholder="High-quality animations&#10;Permanent access&#10;Compatible with all rooms"
                          rows={5}
                          data-testid="input-product-features"
                          className="bg-black/50 border-purple-500/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="border-t border-purple-500/20 pt-4 mt-4">
                <h3 className="text-sm font-semibold mb-3 text-purple-400">Requirements</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="loginMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Login Method (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="e.g., IMVU Account Login" data-testid="input-product-login-method" className="bg-black/50 border-purple-500/30" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="vipRequired"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-vip-required"
                              className="border-purple-500/30"
                            />
                          </FormControl>
                          <FormLabel className="!mt-0 cursor-pointer">VIP Required</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sexRoomNeeded"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-sex-room-needed"
                              className="border-purple-500/30"
                            />
                          </FormControl>
                          <FormLabel className="!mt-0 cursor-pointer">Sex Room Needed</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-purple-500/20 pt-4 mt-4">
                <h3 className="text-sm font-semibold mb-3 text-purple-400">Platform Support & Options</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pcSupport"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-pc-support"
                              className="border-purple-500/30"
                            />
                          </FormControl>
                          <FormLabel className="!mt-0 cursor-pointer">PC Support</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="mobileSupport"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-mobile-support"
                              className="border-purple-500/30"
                            />
                          </FormControl>
                          <FormLabel className="!mt-0 cursor-pointer">Mobile Support</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="isGift"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-is-gift"
                            className="border-purple-500/30"
                          />
                        </FormControl>
                        <FormLabel className="!mt-0 cursor-pointer">Gift Item (shows pink GIFT badge)</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowProductDialog(false);
                    setEditingProduct(null);
                    form.reset();
                  }}
                  data-testid="button-cancel-product"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createProductMutation.isPending || updateProductMutation.isPending}
                  data-testid="button-save-product"
                >
                  {createProductMutation.isPending || updateProductMutation.isPending
                    ? "Saving..."
                    : editingProduct
                    ? "Update Product"
                    : "Create Product"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingProductId} onOpenChange={() => setDeletingProductId(null)}>
        <AlertDialogContent className="bg-black/95 border-purple-500/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-orbitron">Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteProductMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteProductMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function ReviewsTab({ authToken }: { authToken: string }) {
  const [reviewFilter, setReviewFilter] = useState<string>("all");
  const { toast } = useToast();

  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["/api/admin/reviews", reviewFilter],
    queryFn: async () => {
      const response = await fetch(
        `/api/admin/reviews?${reviewFilter !== "all" ? `status=${reviewFilter}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      return response.json();
    },
  });

  const approveReviewMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ action: "approve" }),
      });
      if (!response.ok) {
        throw new Error("Failed to approve review");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      toast({
        title: "Review Approved",
        description: "Review is now visible to customers",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve review",
      });
    },
  });

  const rejectReviewMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ action: "reject" }),
      });
      if (!response.ok) {
        throw new Error("Failed to reject review");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      toast({
        title: "Review Rejected",
        description: "Review has been removed",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject review",
      });
    },
  });

  const getRatingStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const pendingReviews = reviews?.filter(r => !r.approved);
  const approvedReviews = reviews?.filter(r => r.approved);

  return (
    <Card className="border-purple-500/30 bg-black/80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-exo2">Review Management</CardTitle>
            <CardDescription>Approve or reject customer reviews</CardDescription>
          </div>
          <Select value={reviewFilter} onValueChange={setReviewFilter}>
            <SelectTrigger className="w-48 bg-black/50 border-purple-500/30" data-testid="select-review-filter">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-400">Loading reviews...</p>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {(reviewFilter === "all" || reviewFilter === "pending") && pendingReviews && pendingReviews.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-4">Pending Reviews ({pendingReviews.length})</h3>
                <div className="space-y-4">
                  {pendingReviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 bg-black/50 rounded-lg border border-yellow-500/30"
                      data-testid={`review-${review.id}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium" data-testid={`text-review-customer-${review.id}`}>{review.customerName}</div>
                          <div className="text-sm text-gray-400" data-testid={`text-review-email-${review.id}`}>{review.email}</div>
                        </div>
                        <div className="text-yellow-400 text-lg" data-testid={`text-review-rating-${review.id}`}>{getRatingStars(review.rating)}</div>
                      </div>
                      <p className="text-sm text-gray-300 mb-3" data-testid={`text-review-text-${review.id}`}>{review.reviewText}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => approveReviewMutation.mutate(review.id)}
                          disabled={approveReviewMutation.isPending}
                          data-testid={`button-approve-review-${review.id}`}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => rejectReviewMutation.mutate(review.id)}
                          disabled={rejectReviewMutation.isPending}
                          data-testid={`button-reject-review-${review.id}`}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(reviewFilter === "pending" || reviewFilter === "all") && (!pendingReviews || pendingReviews.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-400">No pending reviews</p>
              </div>
            )}

            {reviewFilter === "all" && approvedReviews && approvedReviews.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-4">Approved Reviews ({approvedReviews.length})</h3>
                <div className="space-y-4">
                  {approvedReviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 bg-black/50 rounded-lg border border-green-500/30"
                      data-testid={`review-approved-${review.id}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium" data-testid={`text-approved-customer-${review.id}`}>{review.customerName}</div>
                          <div className="text-sm text-gray-400" data-testid={`text-approved-email-${review.id}`}>{review.email}</div>
                        </div>
                        <div className="text-purple-400 text-lg" data-testid={`text-approved-rating-${review.id}`}>{getRatingStars(review.rating)}</div>
                      </div>
                      <p className="text-sm text-gray-300" data-testid={`text-approved-text-${review.id}`}>{review.reviewText}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No reviews found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
