// Game logic: movement, collisions, restart, apple eating

import { showTheSnake, appleShow } from './board.js';

export let snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];

export let position = "right";
export let isMoving = false;
let intervalValid = null;
let intervalApple = null;
let ateApple = false;
let spawnApple = true;

// Move snake in the current direction
export function moveTheSnake() {
    const newHead = findNextHead();
    snake.unshift(newHead);

    if (!ateApple) {
        snake.pop();
    } else {
        ateApple = false;
    }

    showTheSnake();
    checkWallCollision();
    checkSelfCollision();
    checkAppleCollision();
}

// Starts moving
export function startMoving() {
    if (!isMoving && position !== " ") {
        intervalValid = setInterval(moveTheSnake, 170);
        isMoving = true;

        if (spawnApple) {
            appleShow();
            spawnApple = false;
        }
        intervalApple = setInterval(appleShow, 8000);
    }
}

// Stops movement and apple spawn
export function stopMoving() {
    clearInterval(intervalValid);
    clearInterval(intervalApple);
    intervalValid = null;
    intervalApple = null;
    isMoving = false;
}

// Sets the direction
export function setDirection(dir) {
    position = dir;
}

// Gets current direction
export function getDirection() {
    return position;
}

// Prevent snake from reversing
export function isOppositeDirection(newDir) {
    const opposite = {
        up: "down",
        down: "up",
        left: "right",
        right: "left"
    };
    return opposite[newDir] === position;
}

// New head based on current direction
function findNextHead() {
    const head = snake[0];
    switch (position) {
        case "up": return { x: head.x, y: head.y - 1 };
        case "down": return { x: head.x, y: head.y + 1 };
        case "left": return { x: head.x - 1, y: head.y };
        case "right": return { x: head.x + 1, y: head.y };
        default: return head;
    }
}

// Wall collision
function checkWallCollision() {
    const { x, y } = snake[0];
    if (x < 0 || x > 19 || y < 0 || y > 19) {
        restartGame();
    }
}

// Self-collision
function checkSelfCollision() {
    const [head, ...body] = snake;
    if (body.some(part => part.x === head.x && part.y === head.y)) {
        restartGame();
    }
}

// Apple eating
function checkAppleCollision() {
    const $apple = $('.apple');
    if ($apple.length === 0) return;

    const ax = Number($apple.data('x'));
    const ay = Number($apple.data('y'));

    if (snake[0].x === ax && snake[0].y === ay) {
        $apple.removeClass('apple').text('');
        ateApple = true;
        clearInterval(intervalApple);
        intervalApple = setInterval(appleShow, 4000);
    }
}

// Reset state
function restartGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    position = "right";
    showTheSnake();
    stopMoving();
    spawnApple = true;
}
