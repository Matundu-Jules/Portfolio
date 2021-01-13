window.onload = function () {
  var canvasWidth = 900;
  var canvasHeight = 600;
  var blockSize = 30;
  var ctx;
  var delay = 100;
  var snakers;
  var applers;
  var widthInBlocks = canvasWidth / blockSize;
  var heightInBlocks = canvasHeight / blockSize;
  var score;
  var timeout;

  init();

  function init() {
    canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "30px solid #0C120C";
    canvas.style.margin = "30px auto";
    canvas.style.display = "block";
    canvas.style.backgroundColor = "#ECF39E";
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    snakers = new Snake(
      [
        [6, 4],
        [5, 4],
        [4, 4],
        [3, 4],
        [2, 4],
      ],
      "right"
    );
    applers = new Apple([10, 10]);
    score = 0;
    refreshCanvas();
  }

  function refreshCanvas() {
    snakers.advance();

    if (snakers.checkCollision()) {
      gameOver();
    } else {
      if (snakers.isEatingApple(applers)) {
        score++;
        snakers.ateApple = true;
        do {
          applers.setNewPosition();
        } while (applers.isOnSnake(snakers));
      }
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawScore();
      snakers.draw();
      applers.draw();
      timeout = setTimeout(refreshCanvas, delay); // On stocke le setTimeout dans la var timeout.
    }
  }

  function gameOver() {
    ctx.save();
    ctx.font = "bold 70px sans-serif";
    ctx.fillStyle = "#080C08";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "#D0F4EA";
    ctx.lineWidth = 5;
    var centreX = canvasWidth / 2;
    var centreY = canvasHeight / 2;
    ctx.strokeText("Game Over", centreX, centreY - 180);
    ctx.fillText("Game Over", centreX, centreY - 180);
    ctx.font = "bold 20px sans-serif";
    ctx.strokeText(
      "Appuyer sur la touche Espace pour rejouer.",
      centreX,
      centreY - 120
    );
    ctx.fillText(
      "Appuyer sur la touche Espace pour rejouer.",
      centreX,
      centreY - 120
    );
    ctx.restore();
  }

  function restart() {
    snakers = new Snake(
      [
        [6, 4],
        [5, 4],
        [4, 4],
        [3, 4],
        [2, 4],
      ],
      "right"
    );
    applers = new Apple([10, 10]);
    score = 0;
    clearTimeout(timeout); // Reinitialiser le timeout.
    refreshCanvas();
  }

  function drawScore() {
    ctx.save();
    ctx.font = "bold 180px sans-serif";
    ctx.fillStyle = "#182518";
    ctx.globalAlpha = 0.8;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var centreX = canvasWidth / 2;
    var centreY = canvasHeight / 2;
    ctx.fillText(score.toString(), centreX, centreY);
    ctx.restore();
  }

  function drawBlock(ctx, position) {
    var x = position[0] * blockSize;
    var y = position[1] * blockSize;
    ctx.fillRect(x, y, blockSize, blockSize);
  }

  function Snake(body, direction) {
    this.body = body;
    this.direction = direction;
    this.ateApple = false;

    this.draw = function () {
      ctx.save();
      ctx.fillStyle = "#4F772D";

      for (var i = 0; i < this.body.length; i++) {
        drawBlock(ctx, this.body[i]);
      }

      ctx.restore();
    };

    this.advance = function () {
      var nextPosition = this.body[0].slice();

      switch (this.direction) {
        case "left":
          nextPosition[0] -= 1;
          break;

        case "right":
          nextPosition[0] += 1;
          break;

        case "down":
          nextPosition[1] += 1;
          break;

        case "up":
          nextPosition[1] -= 1;
          break;

        default:
          throw "Invalid Direction !";
      }
      this.body.unshift(nextPosition);

      if (!this.ateApple) {
        this.body.pop();
      } else {
        this.ateApple = false;
      }
    };

    this.setDirection = function (newDirection) {
      var allowedDirections;

      switch (this.direction) {
        case "left":
        case "right":
          allowedDirections = ["up", "down"];
          break;

        case "down":
        case "up":
          allowedDirections = ["left", "right"];
          break;

        default:
          throw "Invalid Direction !";
      }

      if (allowedDirections.indexOf(newDirection) > -1) {
        this.direction = newDirection;
      }
    };

    this.checkCollision = function () {
      var wallCollision = false;
      var snakeCollision = false;
      var head = this.body[0];
      var rest = this.body.slice(1);
      var snakeX = head[0];
      var snakeY = head[1];
      var minX = 0;
      var minY = 0;
      var maxX = widthInBlocks - 1;
      var maxY = heightInBlocks - 1;
      var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
      var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

      if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
        wallCollision = true;
      }

      for (var i = 0; i < rest.length; i++) {
        if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
          snakeCollision = true;
        }
      }

      return wallCollision || snakeCollision;
    };

    this.isEatingApple = function (appleToEat) {
      var head = this.body[0];

      if (
        head[0] === appleToEat.position[0] &&
        head[1] === appleToEat.position[1]
      ) {
        return true;
      } else {
        return false;
      }
    };
  }

  function Apple(position) {
    this.position = position;
    this.draw = function () {
      ctx.save();
      ctx.fillStyle = "#9E2B25";
      ctx.beginPath();
      var radius = blockSize / 2;
      var x = this.position[0] * blockSize + radius;
      var y = this.position[1] * blockSize + radius;
      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.restore();
    };

    this.setNewPosition = function () {
      var newX = Math.round(Math.random() * (widthInBlocks - 1));
      var newY = Math.round(Math.random() * (heightInBlocks - 1));
      this.position = [newX, newY];
    };

    this.isOnSnake = function (snakeToCheck) {
      var isOnSnake = false;

      for (var i = 0; i < snakeToCheck.body.length; i++) {
        if (
          this.position[0] === snakeToCheck.body[i][0] &&
          this.position[1] === snakeToCheck.body[i][1]
        ) {
          isOnSnake = true;
        }
      }
      return isOnSnake;
    };
  }

  document.onkeydown = function handleKeyDown(e) {
    var key = e.keyCode;
    var newDirection;
    switch (key) {
      case 37:
        newDirection = "left";
        break;

      case 38:
        newDirection = "up";
        break;

      case 39:
        newDirection = "right";
        break;

      case 40:
        newDirection = "down";
        break;

      case 32:
        restart();
        return;

      default:
        return;
    }
    snakers.setDirection(newDirection);
  };
};
