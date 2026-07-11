/// <reference types="astro/client" />

interface Window {
  adminApi: (url: string, options?: RequestInit) => Promise<any>;
  formatRupiah: (value: unknown) => string;
  formatDate: (value: unknown) => string;
  showAdminToast: (message: string, type?: "success" | "error") => void;
}
