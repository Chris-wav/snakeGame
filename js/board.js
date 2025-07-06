// Board creation and rendering snake/apple

import { snake } from './logic.js';

// Creates a 20x20 board grid
export function createTheBoard() {
    const $board = $('.game-board');
    for (let i = 0; i < 400; i++) {
        const x = i % 20;
        const y = Math.floor(i / 20);
        $board.append(`<div class="cell" data-x="${x}" data-y="${y}"></div>`);
    }
    showTheSnake();
}

// Shows the snake on the board
export function showTheSnake() {
    $('.cell').each(function () {
        const x = $(this).data('x');
        const y = $(this).data('y');
        const isSnake = snake.some(part => part.x === x && part.y === y);
        $(this).toggleClass('snake', isSnake);
    });
}

// Spawns a random apple on the grid
export function appleShow() {
    $('.cell').removeClass('apple').text('');
    const $cells = $('.cell');
    const $random = $cells.eq(Math.floor(Math.random() * $cells.length));
    $random.addClass('apple').text('🍎');
}

// Removes any apple from the grid
export function disappearApple() {
    $('.apple').removeClass('apple').text('');
}
