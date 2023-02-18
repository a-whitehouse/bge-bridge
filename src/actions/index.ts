import * as bge from "bge-core";

import { CardValue, PlayingCard, PokerHand } from "bge-playingcard";

import { CardGame } from "../game";
import { Player } from "../player";

export default async function main(game: CardGame) {

    await setup(game);

    while (game.players[0].hand.count > 0) {
        let highestCard: CardValue = 0;
        let winningPlayer: Player;

        for (let player of game.players) {
            await playerTurn(game, player);
            if (player.selectedCard.value > highestCard) {
                highestCard = player.selectedCard.value;
                winningPlayer = player;
            }
        }

        for (let player of game.players) {
            winningPlayer.wonCards.add(player.selectedCard);
            player.selectedCard = null;
            await game.delay.beat();
        }
    }

    let sortedPlayers = [...game.players].sort((a, b) => a.wonCards.count - b.wonCards.count);
    let winningPlayer = sortedPlayers[0];
    game.message.add("Player {0} is the winner!", winningPlayer.name);
}

async function setup(game: CardGame) {
    let deck = new bge.Deck(PlayingCard);
    deck.addRange(PlayingCard.generateDeck());
    deck.shuffle(game.random);
    deck.deal(game.players.map(x => x.hand), 3);
    game.addPlayerZones(x => x.createZone(), {
        avoid: game.tableCenter.footprint
    });
}

async function playerTurn(game: CardGame, player: Player) {
    console.log("Doing something.")
    player.selectedCard = await player.prompt.clickAny(player.hand, { message: 'Click on a card.' });
    player.hand.remove(player.selectedCard);
    await game.delay.beat();
}