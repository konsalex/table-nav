Nothing to see here

Inspo from AGGrid:

1. Enter will get you inside the first focusable element inside the cell if any (this is only for the header, not the body)
2. Enter will get you to the cell below if you are in a body cell
3. Space in header does nothing
4. Space in cells triggers a click in clickable elements (checkboxes, buttons, etc)
5. CMD+C in cell copies the text in the cell, but this is not mine?!


Also GRID by ARIA specs:
https://w3c.github.io/aria-practices/#grid

Right Arrow: Moves focus one cell to the right. If focus is on the right-most cell in the row, focus does not move.
Left Arrow: Moves focus one cell to the left. If focus is on the left-most cell in the row, focus does not move.
Down Arrow: Moves focus one cell down. If focus is on the bottom cell in the column, focus does not move.
Up Arrow: Moves focus one cell Up. If focus is on the top cell in the column, focus does not move.
Page Down: Moves focus down an author-determined number of rows, typically scrolling so the bottom row in the currently visible set of rows becomes one of the first visible rows. If focus is in the last row of the grid, focus does not move.
Page Up: Moves focus up an author-determined number of rows, typically scrolling so the top row in the currently visible set of rows becomes one of the last visible rows. If focus is in the first row of the grid, focus does not move.
Home: moves focus to the first cell in the row that contains focus.
End: moves focus to the last cell in the row that contains focus.
Control + Home: moves focus to the first cell in the first row.
Control + End: moves focus to the last cell in the last row.