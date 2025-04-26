export type GridPoint = { row: number; col: number };

const randomRow = Math.floor(Math.random() * 10);
export const levelPatterns: Record<number, GridPoint[]> = {
  1: [
    ...Array.from({ length: 10 }, (_, i) => ({ row: randomRow, col: i })),
  ],

  2: [
    { row: 2, col: 4 }, { row: 1, col: 5 },
    { row: 1, col: 6 }, { row: 1, col: 7 },
    { row: 2, col: 8 }, { row: 3, col: 8 },
    { row: 4, col: 8 }, { row: 5, col: 8 },
    { row: 7, col: 7 }, { row: 8, col: 6 },
    { row: 9, col: 4 }, { row: 8, col: 2 },
    { row: 7, col: 1 }, { row: 5, col: 0 },
    { row: 4, col: 0 }, { row: 3, col: 0 },
    { row: 2, col: 0 }, { row: 1, col: 1 },
    { row: 1, col: 2 }, { row: 1, col: 3 },
  ],

  3: [
    { row: 8, col: 0 }, { row: 6, col: 1 },
    { row: 4, col: 2 }, { row: 2, col: 3 },
    { row: 0, col: 4 }, { row: 2, col: 5 },
    { row: 4, col: 6 }, { row: 6, col: 7 },
    { row: 8, col: 8 }, { row: 6, col: 5 },
    { row: 3, col: 0 }, { row: 3, col: 4 },
    { row: 3, col: 8 }, { row: 6, col: 3 },
  ],
};
