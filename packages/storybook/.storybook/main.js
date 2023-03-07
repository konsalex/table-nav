import { mergeConfig } from 'vite';
import path from 'path';

export default {
  framework: '@storybook/react-vite',
  features: {
    storyStoreV7: true,
  },
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  docs: {
    autodocs: true,
    docsPage: true,
    defaultName: 'Docs',
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        rollupOptions: {
          external: ['@storybook/window'],
        },
      },
      resolve: {
        alias: {
          '@cos/table-keynav/src': path.resolve(
            __dirname,
            '../../table-keynav/src'
          ),
        },
      },
    });
  },
};
