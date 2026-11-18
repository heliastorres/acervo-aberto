import { build, context } from 'esbuild';
import { cp, mkdir, rm } from 'node:fs/promises';

const dev = process.argv.includes('--dev');
const options = {
  entryPoints: ['src/main.jsx'],
  bundle: true,
  minify: !dev,
  jsx: 'automatic',
  outdir: dev ? 'public/assets' : 'dist/assets',
  assetNames: '[name]-[hash]',
  loader: { '.woff2': 'file' },
  define: { 'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production') },
  logLevel: 'info'
};

if (dev) {
  // O servidor entrega a página local e recompila os arquivos quando houver alterações.
  const app = await context(options);
  await app.watch();
  const { port } = await app.serve({ servedir: 'public', host: '127.0.0.1', port: 5173 });
  console.log('Abra http://127.0.0.1:' + port);
} else {
  await rm('dist', { recursive: true, force: true });
  await mkdir('dist', { recursive: true });
  await cp('public', 'dist', { recursive: true, filter: source => source !== 'public/assets' });
  await build(options);
}
