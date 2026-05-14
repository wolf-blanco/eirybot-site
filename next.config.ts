import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    async rewrites() {
        return [
            {
                source: "/api/unsubscribe",
                destination: "https://us-central1-eirybot-dashboard.cloudfunctions.net/unsubscribe_webhook",
            },
        ];
    },
};

export default nextConfig;
