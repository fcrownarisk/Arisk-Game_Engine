class Player {
    constructor(name) {
      this.name = name;
      this.health = 100;
      this.position = 0;
      this.lives = 3;
    }
  
    move() {
      this.position += Math.floor(Math.random() * 3) + 1; // Move 1-3 steps
    }
  
    takeDamage(amount) {
      this.health -= amount;
      if (this.health <= 0) {
        this.lives--;
        this.health = 100;
        this.position = 0;
        console.log(`${this.name} lost a life! Remaining lives: ${this.lives}`);
      }
    }
  
    isAlive() {
      return this.lives > 0;
    }
  }
  
  class Deathloop {
    constructor() {
      this.player = new Player("Hero");
      this.traps = [5, 10, 15, 20, 25]; // Positions of traps
      this.goal = 30;
      this.attempts = 0;
    }
  
    run() {
      console.log("Welcome to the Deathloop!");
      console.log("Try to reach the goal at position 30 without losing all your lives.");
      console.log("Traps are placed at positions 5, 10, 15, 20, and 25.");
  
      while (this.player.isAlive() && this.player.position < this.goal) {
        this.attempts++;
        console.log(`\nAttempt ${this.attempts}`);
        console.log(`${this.player.name} is at position ${this.player.position}`);
  
        this.player.move();
        console.log(`${this.player.name} moved to position ${this.player.position}`);
  
        if (this.traps.includes(this.player.position)) {
          console.log("Oh no! You've hit a trap!");
          this.player.takeDamage(50);
        }
  
        if (this.player.position >= this.goal) {
          console.log("Congratulations! You've escaped the Deathloop!");
          return;
        }
  
        if (!this.player.isAlive()) {
          console.log("Game Over! You're stuck in the Deathloop forever.");
          return;
        }
      }
    }
  }
  
  // Create and run the Deathloop
  const game = new Deathloop();
  game.run();