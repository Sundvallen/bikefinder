import esbuildServe from "esbuild-serve";

esbuildServe(
  {
    entryPoints: ["./src/index.tsx"],
    bundle: true,
    sourcemap: true,
    outfile: "/public/bundle.js",
    define: { "process.env.NODE_ENV": '"development"' },
    loader: {
      ".ts": "tsx",
      ".svg": "file",
      ".css": "css",
    },
  },
  {
    port: 3000,
    root: "./public",
  }
);
