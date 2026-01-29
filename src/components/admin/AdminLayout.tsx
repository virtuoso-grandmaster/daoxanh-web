import { ReactNode, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  LayoutDashboard,
  FileText,
  Home,
  Package,
  LogOut,
  Loader2,
  Menu,
  X,
  Leaf,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { z } from "zod"

interface AdminLayoutProps {
  children: ReactNode
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Bài viết", icon: FileText },
  { href: "/admin/accommodations", label: "Lưu trú", icon: Home },
  { href: "/admin/packages", label: "Gói dịch vụ", icon: Package },
]

const authSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
})

function AdminLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const { signIn, signUp } = useAuth()
  const { toast } = useToast()

  const validateForm = () => {
    try {
      authSchema.parse({ email, password })
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {}
        err.errors.forEach((error) => {
          if (error.path[0] === "email") fieldErrors.email = error.message
          if (error.path[0] === "password") fieldErrors.password = error.message
        })
        setErrors(fieldErrors)
      }
      return false
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    const { error } = await signIn(email, password)
    setIsLoading(false)

    if (error) {
      toast({
        variant: "destructive",
        title: "Đăng nhập thất bại",
        description:
          error.message === "Invalid login credentials"
            ? "Email hoặc mật khẩu không đúng"
            : error.message,
      })
    } else {
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn quay lại!",
      })
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    const { error } = await signUp(email, password)
    setIsLoading(false)

    if (error) {
      toast({
        variant: "destructive",
        title: "Đăng ký thất bại",
        description:
          error.message === "User already registered"
            ? "Email này đã được đăng ký"
            : error.message,
      })
    } else {
      toast({
        title: "Đăng ký thành công",
        description:
          "Tài khoản đã được tạo. Vui lòng liên hệ quản trị viên để được cấp quyền admin.",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Đảo Xanh Admin</CardTitle>
          <CardDescription>
            <span>Đăng nhập để quản lý nội dung website</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">
                <span>Đăng nhập</span>
              </TabsTrigger>
              <TabsTrigger value="register">
                <span>Đăng ký</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Mật khẩu</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Đang đăng nhập...</span>
                    </>
                  ) : (
                    <span>Đăng nhập</span>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mật khẩu</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <span>Đăng ký</span>
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading, isAdmin, signOut } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) return <AdminLoginForm />

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span>Đang kiểm tra quyền...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop header */}
      <header className="hidden lg:flex sticky top-0 z-50 h-14 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">Đảo Xanh Admin</span>
        </div>
      </header>

      {/* Mobile header */}
      <header className="lg:hidden sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          <span>Đảo Xanh Admin</span>
        </div>
      </header>

      <div className="flex">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transition-transform lg:static lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = location.pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              <Separator />

              <Button
                variant="outline"
                className="w-full"
                onClick={signOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Đăng xuất</span>
              </Button>
            </div>
          </ScrollArea>
        </aside>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
