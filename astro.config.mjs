import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://a6340374-stack.github.io',
  output: 'static',
  publicDir: 'public',
  build: {
    format: 'directory',
  },
});
