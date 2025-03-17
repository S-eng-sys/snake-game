const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const boxSize = 20;
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;

// Game Loop
function gameLoop() {
    if (checkCollision()) {
        alert("Game Over! Your score: " + score);
        resetGame();
    }
    drawBoard();
    drawSnake();
    drawFood();
    moveSnake();
}

// Draw the game board
function drawBoard() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "green";
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Move the snake
function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "UP": head.y -= boxSize; break;
        case "DOWN": head.y += boxSize; break;
        case "LEFT": head.x -= boxSize; break;
        case "RIGHT": head.x += boxSize; break;
    }

    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        food = generateFood();
    } else {
        snake.pop(); // Remove tail if no food eaten
    }
}

// Check for collision
function checkCollision() {
    const head = snake[0];
    // Collision with walls
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        return true;
    }
    // Collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Generate food at a random position
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    const y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
    return { x, y };
}

// Reset the game
function resetGame() {
    snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
    direction = "RIGHT";
    score = 0;
    document.getElementById("score").textContent = score;
    food = generateFood();
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp": if (direction !== "DOWN") direction = "UP"; break;
        case "ArrowDown": if (direction !== "UP") direction = "DOWN"; break;
        case "ArrowLeft": if (direction !== "RIGHT") direction = "LEFT"; break;
        case "ArrowRight": if (direction !== "LEFT") direction = "RIGHT"; break;
    }
});

// Start the game loop
setInterval(gameLoop, 150);
