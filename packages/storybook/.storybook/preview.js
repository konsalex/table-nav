import '../stories/index.css';
import '@neo4j-ndl/base/lib/neo4j-ds-styles.css';
import '../stories/output.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
