class Tictactoe {
    constructor(playerOneName, playerTwoName) {
        this.multiplayer = false;
        if (playerOneName && playerTwoName) {
            this.multiplayer = true;
            this.playerOneName = playerOneName;
            this.playerTwoName = playerTwoName
        }
        this.player = 1;
        this.next = false;
        this.tictactoe = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        
        this.box = Array.from(document.getElementsByClassName("checkbox"));

        this.box.forEach(v => {
            v.addEventListener("click", this.click, true);
        })
        
        document.getElementById("retry").addEventListener("click", this.refresh);

        this.winner = true;

        document.getElementsByClassName("setup")[0].style.display = "none";
    }

    bot = () => {
        let arr = [];
        for (let i = 0; i < this.tictactoe.length; i++) {
            for (let j = 0; j < this.tictactoe[i].length; j++) {
                if (i == 0) {
                    arr.push([i, j])
                }

                if (i == 1) {
                    arr.push([i, j + 4])
                }

                if (i == 2) {
                    arr.push([i, j + 7])
                }
            }
        }
        let randomArr = Math.floor(Math.random() * 2);
        let randomNestArr = Math.floor(Math.random() * 2);
        console.log(arr)
        console.log(randomArr, randomNestArr)
        console.log(arr[randomArr], arr[randomArr][randomNestArr])
        // while (this.check(arr[randomArr, randomNestArr])) {

        // }
    }

    refresh = () => {
        document.getElementsByClassName("overlay")[0].style.display = "none";
        document.getElementsByClassName("box")[0].innerHTML = `
        <button class="checkbox" value="1"></button>     
        <button class="checkbox" value="2"></button>     
        <button class="checkbox" value="3"></button>     
        <button class="checkbox" value="4"></button>     
        <button class="checkbox" value="5"></button>     
        <button class="checkbox" value="6"></button>     
        <button class="checkbox" value="7"></button>     
        <button class="checkbox" value="8"></button>     
        <button class="checkbox" value="9"></button>  
        `
        game("", this.multiplayer ? "multiplayer" : "solo");
    }

    end(winner) {
        if (winner) {
            document.getElementsByClassName("overlay")[0].style.display = "flex";
            document.getElementById("winner").textContent = `Player ${(this.multiplayer ? this.player == 1 ? this.playerOneName : this.playerTwoName : "Bot") } Win The Game!`;
        } else {
            document.getElementsByClassName("overlay")[0].style.display = "flex";
            document.getElementById("winner").textContent = `Draw!`;
        }
    }

    win = player => {
        //horizontal check;
        for (let i = 0; i < this.tictactoe.length; i++) {
            for (let j = 0; j < this.tictactoe[i].length; j++) {
                if (this.tictactoe[i][j] != player) {
                    this.winner = false;
                    break;
                } else {
                    this.winner = true;
                }
                if (j == 2 && this.winner) {
                    break;
                }
            }
            if (this.winner) {
                break;
            }
        }

        //vertical check
        if (!this.winner) {
        for (let i = 0; i < this.tictactoe.length; i++) {
            for (let j = 0; j < this.tictactoe[i].length; j++) {
                if (this.tictactoe[j][i] != player) {
                    this.winner = false;
                    break;
                } else {
                    this.winner = true;
                }
                if (j == 2 && this.winner) {
                    break;
                }
            }
            if (this.winner) {
                break;
            }
        }
    }

        //diagonal checking
        if (!this.winner) {
            for (let i = 0; i < this.tictactoe.length; i++) {
                if (this.tictactoe[i][i] != player) {
                    this.winner = false;
                    break;
                } else {
                    this.winner = true;
                }
                if (i == 2 && this.winner) {
                    break;
                }
            }
        }

        //diagonal checking
        if (!this.winner) {
            for (let i = this.tictactoe.length - 1; i >= 0; i--) {
                if (this.tictactoe[(this.tictactoe.length - 1) - i][i] != player) {
                    this.winner = false;
                    break;
                } else {
                    this.winner = true;
                }
                if (i == 0 && this.winner) {
                    break;
                }
            }
        }

        //checking draw
        if (!this.winner) {
            this.winner = true;
            for (let i = 0; i < this.tictactoe.length; i++) {
                for (let j = 0; j < this.tictactoe[i].length; j++) {
                    if (this.tictactoe[i][j] == 0) {
                        this.winner = false;
                        break;
                    }
                    if (i == 2 && j == 2) {
                        this.end(!this.winner)
                        return;
                    }
                }
                if (!this.winner) break;
            }
        }

        if (this.winner) {
            this.end(this.winner);
        }

        return false;
    }

    check = i => {
        if (i > 6) {
            if (!this.tictactoe[2][i - 7]) {
                this.tictactoe[2][i - 7] = this.player;
                this.next = true;
            } else {
                this.next = false;
            }
        } else if (i > 3) {
            if (!this.tictactoe[1][i - 4]) {
                this.tictactoe[1][i - 4] = this.player;
                this.next = true;
            } else {
                this.next = false;
            }
        } else if (i > 0) {
            if (!this.tictactoe[0][i - 1]) {
                this.tictactoe[0][i - 1] = this.player;
                this.next = true;
            } else {
                this.next = false;
            }
        }

        if (this.next) {
            this.win(this.player);
        }
    }

    click = box => {
        if (box.target.classList.contains("checkbox")) {
            this.check(box.target.value);
            if (this.next) {
                if (this.multiplayer) {
                    if (this.player == 1) {
                        box.target.classList.add("player1")
                        box.target.innerHTML = `<span id="satu"></span><span id="dua"></span>`
                        this.player = 2;
                    } else {
                        box.target.classList.add("player2")
                        box.target.innerHTML = `<span></span>`
                        this.player = 1;
                    }
                } else {
                    if (this.player == 1) {
                        box.target.classList.add("player1")
                        box.target.innerHTML = `<span id="satu"></span><span id="dua"></span>`
                        this.player = 2;
                    }
                }
            }
        }
    }
}

let game = (e, state = "solo") => {
    if (state == "multiplayer") {
        let playerOneName = document.getElementById("player1").value;
        let playerTwoName = document.getElementById("player2").value;
        if (!playerOneName || !playerTwoName) {
            alert("Nama Player Tidak Boleh Kosong!");
            return false;
        }
        new Tictactoe(playerOneName, playerTwoName);
    } else {
        new Tictactoe();
    }
}

document.getElementById("multiplayer").addEventListener("click", function(e) {
    game(e, this.value)
})

document.getElementById("solo").addEventListener("click", function(e) {
    game(e, this.value)
})