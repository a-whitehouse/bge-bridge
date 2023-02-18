import { display, Zone } from "bge-core";
import { CardGame } from "./game";

/**
 * This zone displays all the shared objects in the middle of the table.
 * This would be the place to `@display` a board, if your game has one.
 */
export class TableCenter extends Zone {
    private readonly _game: CardGame;

    constructor(game: CardGame) {
        super();

        this._game = game;

        this.width = 24;
        this.height = 26;
    }
}