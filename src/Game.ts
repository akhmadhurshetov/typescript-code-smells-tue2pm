import { Board, CellSymbol } from './Board';
import { EMPTY_CELL } from './constants';

export class Game {
  private lastSymbol: CellSymbol = EMPTY_CELL;
  private readonly board: Board = new Board();

  public Play(symbol: CellSymbol, x: number, y: number): void {
    this.ensureValidMove(symbol, x, y);
    this.board.place(x, y, symbol);
    this.lastSymbol = symbol;
  }

  public Winner(): string {
    const winner = this.board.getWinner();
    return winner ?? EMPTY_CELL;
  }

  private ensureValidMove(symbol: CellSymbol, x: number, y: number): void {
    if (this.isFirstMoveIllegal(symbol)) {
      throw new Error('Invalid first player');
    }
    if (this.isSamePlayerTwice(symbol)) {
      throw new Error('Invalid next player');
    }
    if (this.board.at(x, y) !== EMPTY_CELL) {
      throw new Error('Invalid position');
    }
  }

  private isFirstMoveIllegal(symbol: CellSymbol): boolean {
    return this.lastSymbol === EMPTY_CELL && symbol === 'O';
  }

  private isSamePlayerTwice(symbol: CellSymbol): boolean {
    return this.lastSymbol !== EMPTY_CELL && this.lastSymbol === symbol;
  }
}
