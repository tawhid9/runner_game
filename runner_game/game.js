const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = { x: 50, y: canvas.height - 150, width: 50, height: 50, speed: 5, jumpPower: 15, velocityY: 0, gravity: 0.6, jumping: false };
const enemy = { x: -50, y: canvas.height - 150, width: 50, height: 50, speed: 3 };
const obstacles = [{ x: 300, y: canvas.height - 100, width: 60, height: 40 }];
const coins = [{ x: 400, y: canvas.height - 120, width: 20, height: 20 }];

let score = 0;

function drawRect(obj, color) {
    ctx.fillStyle = color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(player, "blue");
    drawRect(enemy, "red");
    obstacles.forEach(obstacle => drawRect(obstacle, "black"));
    coins.forEach(coin => drawRect(coin, "yellow"));

    enemy.x += enemy.speed;
    if (enemy.x > canvas.width) enemy.x = -50;

    player.velocityY += player.gravity;
    player.y += player.velocityY;
    if (player.y >= canvas.height - 150) {
        player.y = canvas.height - 150;
        player.jumping = false;
    }

    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width && player.x + player.width > obstacle.x && player.y + player.height > obstacle.y) {
            alert("Game Over! Your Score: " + score);
            document.location.reload();
        }
    });

    coins.forEach((coin, index) => {
        if (player.x < coin.x + coin.width && player.x + player.width > coin.x && player.y + player.height > coin.y) {
            score += 10;
            coins.splice(index, 1);
        }
    });

    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 20, 20);

    requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && !player.jumping) {
        player.velocityY = -player.jumpPower;
        player.jumping = true;
    }
});

gameLoop();
