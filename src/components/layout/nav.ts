import { Home, Users, Map, ShoppingBag, User } from "lucide-react";

export const navItems = [
  { label: "홈", icon: Home, path: "/" },
  { label: "채널", icon: Users, path: "/social" },
  { label: "GO", icon: Map, path: "/go", isFloating: true },
  { label: "쇼핑", icon: ShoppingBag, path: "/shop" },
  { label: "MY", icon: User, path: "/profile" },
];
