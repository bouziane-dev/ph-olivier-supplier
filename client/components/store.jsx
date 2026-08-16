"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { INITIAL_NOTIFICATIONS, INITIAL_ORDERS } from "@/lib/data";
import { nowLabel } from "@/lib/format";

const StoreContext = createContext(null);

const KEYS = {
  cart: "adl-cart",
  orders: "adl-orders",
  notifications: "adl-notifications",
  session: "adl-session",
};

const readStorage = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readStorage(KEYS.cart, []));
    setOrders(readStorage(KEYS.orders, INITIAL_ORDERS));
    setNotifications(readStorage(KEYS.notifications, INITIAL_NOTIFICATIONS));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(KEYS.cart, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(KEYS.orders, JSON.stringify(orders));
  }, [orders, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      KEYS.notifications,
      JSON.stringify(notifications)
    );
  }, [notifications, hydrated]);

  const showToast = useCallback((message) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const addToCart = useCallback(
    (product, qty = 1) => {
      setCart((prev) =>
        prev.some((item) => item.id === product.id)
          ? prev.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + qty }
                : item
            )
          : [...prev, { ...product, quantity: qty }]
      );
      showToast(`${product.name} ajouté au panier`);
    },
    [showToast]
  );

  const updateQuantity = useCallback((id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = useCallback(
    (delivery, notes) => {
      const id = `#ADL-${Math.floor(6000 + Math.random() * 3000)}`;
      const order = {
        id,
        date: nowLabel(),
        status: "En attente",
        total: cartTotal,
        eta: "Livraison estimée sous 24 h",
        lines: cart,
        delivery,
        notes,
      };
      setOrders((prev) => [order, ...prev]);
      setNotifications((prev) => [
        {
          id: `n-${Date.now()}`,
          type: "order",
          title: `Commande ${id} reçue`,
          message:
            "Votre commande a bien été enregistrée et est en attente de confirmation.",
          time: "À l'instant",
          read: false,
        },
        ...prev,
      ]);
      setCart([]);
      return order;
    },
    [cart, cartTotal]
  );

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const login = useCallback(
    (name) => {
      window.localStorage.setItem(KEYS.session, JSON.stringify({ name }));
    },
    []
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem(KEYS.session);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        hydrated,
        cart,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        orders,
        placeOrder,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllRead,
        toast,
        showToast,
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
