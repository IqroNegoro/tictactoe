class Tictactoe {
    constructor(box) {
        this.player = 1;
        this.count = 0;
        this.next = false;
        this.tictactoe = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        
        box.forEach(v => {
            v.addEventListener("click", this.click, true);
        })
        
        document.getElementById("retry").addEventListener("click", this.refresh);

        this.winner = true;
        this.box = box;
    }

    refresh() {
        document.getElementById("overlay").style.display = "none";
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
        game();
    }

    end(winner) {
        if (winner) {
            document.getElementById("overlay").style.display = "flex";
            document.getElementById("winner").textContent = `Player ${this.player} Winner!`;
        } else {
            document.getElementById("overlay").style.display = "flex";
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

        if (this.winner) {
            this.end(this.winner);
        }
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
            this.count += 1;
            console.log(this.count)
            if (this.count == 9) {
                this.end(this.winner);
            }

            this.check(box.target.value);
            
            if (this.next) {
                if (this.player == 1) {
                box.target.classList.add("player1")
                box.target.innerHTML = `<span id="satu"></span><span id="dua"></span>`
                this.player = 2;
            } else {
                box.target.classList.add("player2")
                box.target.innerHTML = `<span></span>`
                this.player = 1;
            }
        }
    }
    }
    
}

let game = () => {
    new Tictactoe(Array.from(document.getElementsByClassName("checkbox")));
}

game();