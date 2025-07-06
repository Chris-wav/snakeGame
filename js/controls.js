// Controls: keyboard input and direction handling

import {
    startMoving,
    stopMoving,
    isMoving,
    getDirection,
    isOppositeDirection,
    setDirection
} from './logic.js';

export function setupControls() {
    $(document).on('keydown', function (e) {
        const key = e.key.toLowerCase();

        if (key === ' ') {
            isMoving() ? stopMoving() : startMoving();
            return;
        }

        const newDir = keyToDirection(key);
        if (newDir && !isOppositeDirection(newDir)) {
            setDirection(newDir);
            if (!isMoving) startMoving();
        }
    });
}

// Maps key input to direction
function keyToDirection(key) {
    if (key === 'w' || key === 'arrowup') return 'up';
    if (key === 's' || key === 'arrowdown') return 'down';
    if (key === 'a' || key === 'arrowleft') return 'left';
    if (key === 'd' || key === 'arrowright') return 'right';
    return null;
}
