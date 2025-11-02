import { BOARD_DIMENSION, EMPTY_CELL } from './constants';

/**
 * A simple 2‑D grid to hold tic‑tac‑toe symbols.
 *
 * The public methods are intentionally minimal: you can query a cell (`at`),
 * place a symbol (`place`), check if the board is full (`isFull`),
 * and determine if someone has won (`getWinner`).
 */
export type CellSymbol = 'X' | 'O' | typeof EMPTY_CELL;

export class Board {
  private grid: CellSymbol[][];

  constructor() {
    // initialise an empty grid
    this.grid = Array.from({ length: BOARD_DIMENSION }, () =>
      Array.from({ length: BOARD_DIMENSION }, () => EMPTY_CELL)
    );
  }

  public at(row: number, col: number): CellSymbol {
    this.assertInBounds(row, col);
    return this.grid[row][col];
  }

  public place(row: number, col: number, symbol: CellSymbol): void {
    this.assertInBounds(row, col);
    if (this.grid[row][col] !== EMPTY_CELL) {
      throw new Error('Cell already occupied');
    }
    this.grid[row][col] = symbol;
  }

  public isFull(): boolean {
    return this.grid.every((row) => row.every((cell) => cell !== EMPTY_CELL));
  }

  /**
   * Returns 'X' or 'O' if a winning line (row, column or diagonal) exists,
   * otherwise returns null.
   */
  public getWinner(): CellSymbol | null {
    // rows
    for (let r = 0; r < BOARD_DIMENSION; r++) {
      const winner = this.winnerOfCells(this.row(r));
      if (winner) return winner;
    }
    // columns
    for (let c = 0; c < BOARD_DIMENSION; c++) {
      const winner = this.winnerOfCells(this.column(c));
      if (winner) return winner;
    }
    // diagonals
    const diag1 = this.winnerOfCells(this.mainDiagonal());
    if (diag1) return diag1;
    const diag2 = this.winnerOfCells(this.antiDiagonal());
    if (diag2) return diag2;

    return null;
  }

  // ----------- internal helpers -----------

  private row(r: number): CellSymbol[] {
    this.assertRow(r);
    return this.grid[r];
  }

  private column(c: number): CellSymbol[] {
    this.assertCol(c);
    return this.grid.map((row) => row[c]);
  }

  private mainDiagonal(): CellSymbol[] {
    const diag: CellSymbol[] = [];
    for (let i = 0; i < BOARD_DIMENSION; i++) {
      diag.push(this.grid[i][i]);
    }
    return diag;
  }

  private antiDiagonal(): CellSymbol[] {
    const diag: CellSymbol[] = [];
    for (let i = 0; i < BOARD_DIMENSION; i++) {
      diag.push(this.grid[i][BOARD_DIMENSION - 1 - i]);
    }
    return diag;
  }

  private winnerOfCells(cells: CellSymbol[]): CellSymbol | null {
    const [first, ...rest] = cells;
    if (first === EMPTY_CELL) return null;
    return rest.every((s) => s === first) ? first : null;
    // returns the winning symbol if all cells match; otherwise null
  }

  private assertInBounds(row: number, col: number): void {
    this.assertRow(row);
    this.assertCol(col);
  }
  private assertRow(row: number): void {
    if (row < 0 || row >= BOARD_DIMENSION) {
      throw new Error('Row out of bounds');
    }
  }
  private assertCol(col: number): void {
    if (col < 0 || col >= BOARD_DIMENSION) {
      throw new Error('Column out of bounds');
    }
  }
}
