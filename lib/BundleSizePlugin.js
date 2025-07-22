export default class BundleSizePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('BundleSizePlugin', stats => {
      if (process.env.NODE_ENV !== 'development') return;
      const info = stats.toJson({ assets: true });
      const assets = info.assets || [];
      const large = assets.filter(a => a.name.endsWith('.js') && (a.size || 0) > 300 * 1024);
      if (large.length) {
        console.warn('Bundle size warning:');
        for (const a of large) {
          console.warn(`${a.name} ${Math.round((a.size || 0) / 1024)}kb`);
        }
      }
    });
  }
}
