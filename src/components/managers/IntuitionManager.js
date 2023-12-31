export const IntuitionManager = {
  isValidMove: (x, y, playerIndex, players, values, width, height) => {
    const activePlayer = players[playerIndex];
    const opponentPlayer = players[!playerIndex ? 1 : 0];

    let isValid = activePlayer.x === -1; 

    if (x < 0 || x >= width || y < 0 || y >= height) {
      isValid = false;
    }
    
    else if (values[y][x]) {
     
      isValid = false;
    } else if (!isValid) {
      
      let isBlocked;

     
      if (
        x !== activePlayer.x &&
        y !== activePlayer.y &&
        Math.abs(activePlayer.x - x) !== Math.abs(activePlayer.y - y)
      ) {
        
        isBlocked = true;
        console.log(`Invalid move to ${x},${y}`);
      }
      
      else if (y < activePlayer.y && x < activePlayer.x) {
        
        let posy = activePlayer.y - 1;
        for (let posx = activePlayer.x - 1; posx > x; posx--) {
          if (values[posy][posx]) {
            isBlocked = true;
            break;
          }
          posy--;
        }
      } else if (y < activePlayer.y && x > activePlayer.x) {
       
        let posy = activePlayer.y - 1;
        for (let posx = activePlayer.x + 1; posx < x; posx++) {
          if (values[posy][posx]) {
            isBlocked = true;
            break;
          }
          posy--;
        }
      } else if (y > activePlayer.y && x < activePlayer.x) {
       
        let posy = activePlayer.y + 1;
        for (let posx = activePlayer.x - 1; posx > x; posx--) {
          if (values[posy][posx]) {
            isBlocked = true;
            break;
          }
          posy++;
        }
      } else if (y > activePlayer.y && x > activePlayer.x) {
       
        let posy = activePlayer.y + 1;
        for (let posx = activePlayer.x + 1; posx < x; posx++) {
          if (values[posy][posx]) {
            isBlocked = true;
            break;
          }
          posy++;
        }
      } else if (x > activePlayer.x) {
        
        for (let pos = activePlayer.x + 1; pos < x; pos++) {
          if (values[y][pos]) {
            isBlocked = true;
            break;
          }
        }
      } else if (x < activePlayer.x) {
      
        for (let pos = activePlayer.x - 1; pos > x; pos--) {
          if (values[y][pos]) {
            isBlocked = true;
            break;
          }
        }
      } else if (y > activePlayer.y) {
       
        for (let pos = activePlayer.y + 1; pos < y; pos++) {
          if (values[pos][x]) {
            isBlocked = true;
            break;
          }
        }
      } else if (y < activePlayer.y) {
       
        for (let pos = activePlayer.y - 1; pos > y; pos--) {
          if (values[pos][x]) {
            isBlocked = true;
            break;
          }
        }
      }

      isValid = !isBlocked;
    }

    return isValid;
  },

  availableMoves: (playerIndex, players, values, width, height) => {
    let moves = [];
    const activePlayer = players[playerIndex];

    if (activePlayer.x !== -1) {
      let x, y;

     
      for (y = activePlayer.y - 1; y >= 0; y--) {
        if (
          IntuitionManager.isValidMove(
            activePlayer.x,
            y,
            playerIndex,
            players,
            values,
            width,
            height
          )
        ) {
          moves.push({ x: activePlayer.x, y });
        } else {
          
          break;
        }
      }

     
      for (y = activePlayer.y + 1; y < height; y++) {
        if (
          IntuitionManager.isValidMove(
            activePlayer.x,
            y,
            playerIndex,
            players,
            values,
            width,
            height
          )
        ) {
          moves.push({ x: activePlayer.x, y });
        } else {
          
          break;
        }
      }

    
      for (x = activePlayer.x - 1; x >= 0; x--) {
        if (
          IntuitionManager.isValidMove(
            x,
            activePlayer.y,
            playerIndex,
            players,
            values,
            width,
            height
          )
        ) {
          moves.push({ x, y: activePlayer.y });
        } else {
          
          break;
        }
      }

     
      for (x = activePlayer.x + 1; x < width; x++) {
        if (
          IntuitionManager.isValidMove(
            x,
            activePlayer.y,
            playerIndex,
            players,
            values,
            width,
            height
          )
        ) {
          moves.push({ x, y: activePlayer.y });
        } else {
          
          break;
        }
      }

      
      x = activePlayer.x;
      for (y = activePlayer.y - 1; y >= 0; y--) {
        x--;
        if (x === -1) {
          break;
        }

        if (
          IntuitionManager.isValidMove(
            x,
            y,
            playerIndex,
            players,
            values,
            width,
            height
          )
        ) {
          moves.push({ x, y });
        } else {
          
          break;
        }
      }

      
      x = activePlayer.x;
      for (y = activePlayer.y - 1; y >= 0; y--) {
        x++;
        if (x >= width) {
          break;
        }

        if (
          IntuitionManager.isValidMove(
            x,
            y,
            playerIndex,
            players,
            values,
            width,
            height
          )
        ) {
          moves.push({ x, y });
        } else {
          
          break;
        }
      }

      
      x = activePlayer.x;
      for (y = activePlayer.y + 1; y < height; y++) {
        x--;
        if (x === -1) {
          break;
        }

        if (
          IntuitionManager.isValidMove(
            x,
            y,
            playerIndex,
            players,
            values,
            width,
            height
          )
        ) {
          moves.push({ x, y });
        } else {
          
          break;
        }
      }

     
      x = activePlayer.x;
      for (y = activePlayer.y + 1; y < height; y++) {
        x++;
        if (x >= width) {
          break;
        }

        if (
          IntuitionManager.isValidMove(
            x,
            y,
            playerIndex,
            players,
            values,
            width,
            height
          )
        ) {
          moves.push({ x, y });
        } else {
          // Path is blocked from going further.
          break;
        }
      }
    } else {
      moves = IntuitionManager.allMoves(
        playerIndex,
        players,
        width,
        height,
        width,
        height
      );
    }

    return moves;
  },

  allMoves: (playerIndex, players, width, height) => {
    const moves = [];

    // First move, all spaces are available. Second move, all spaces but 1 are available.
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (!playerIndex || x !== players[0].x || y !== players[0].y) {
          moves.push({ x, y });
        }
      }
    }

    return moves;
  },
};
