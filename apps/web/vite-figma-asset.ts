/**
 * Resolves figma:asset/... imports to a placeholder so the build works without Figma/Make assets.
 * Replace with real assets in public/figma-assets/ and a resolve alias if you have the export.
 */
export function figmaAssetPlugin() {
  const placeholderPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  return {
    name: 'figma-asset',
    enforce: 'pre',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) return '\0' + id;
      return null;
    },
    load(id: string) {
      if (id.startsWith('\0figma:asset/')) {
        return `export default ${JSON.stringify(placeholderPng)};`;
      }
      return null;
    },
  };
}
