import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@backend": "http://localhost:3333", // Define the alias to point to your backend URL
    },
  },
  server: {
    proxy: {
      "^/@backend": {
        // Use regex to match the alias
        target: "http://localhost:3333", // Your backend server URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/@backend/, ""), // Remove the alias prefix when forwarding to the backend
      },
    },
  },
});
