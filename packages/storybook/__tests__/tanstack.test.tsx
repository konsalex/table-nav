import { ExpandingTable } from '@table-nav/storybook/stories/TanstackExpanding';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

/**
 * Will render a table of
 */
test('<Expanding table />', async () => {
  const { container } = render(<ExpandingTable />);

  // const firstRowF
  /**
   * Prefer querying by role to improve accessibility
   * https://testing-library.com/docs/dom-testing-library/api-accessibility/
   */
  // fireEvent.click(screen.getByRole('button'));

  // expect(handleClick).toHaveBeenCalledTimes(1);
  // expect(screen.getByRole('button')).toHaveTextContent('Demo Button');
});
