import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // allows access via your local IP address
        port: 5173, // optional: specify port (default is 5173)
    },
});
