const NextFederationPlugin = require("@module-federation/nextjs-mf");
const pkg = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "app1",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./app1": "./pages/index.tsx",
        },
        remotes: getRemotes(isServer),
        shared: {
          react: {
            requiredVersion: pkg.dependencies.react,
            singleton: true,
            strictVersion: true,
          },
          "react-dom": {
            requiredVersion: pkg.dependencies["react-dom"],
            singleton: true,
            strictVersion: true,
          },
        },
        extraOptions: {
          automaticAsyncBoundary: true,
        },
      })
    );

    return config;
  },
};

function getRemotes(isServer) {
  const location = isServer ? "ssr" : "chunks";
  return {
    portal: `portal@${process.env.PORTAL_HOST}_next/static/${location}/remoteEntry.js`,
  };
}

module.exports = nextConfig;
