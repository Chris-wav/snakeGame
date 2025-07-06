// Main entry point of the game
import { createTheBoard } from './board.js';
import { setupControls } from './controls.js';

$(document).ready(function () {
    createTheBoard();
    setupControls();
});

