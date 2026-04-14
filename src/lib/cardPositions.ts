export function getCardPosition(index: number, columns: number = 4) {
  const row = Math.floor(index / columns);
  const isReverse = row % 2 === 1;
  const colInRow = index % columns;
  const col = isReverse ? (columns - 1 - colInRow) : colInRow;

  return {
    row,
    col,
    isReverse
  };
}
