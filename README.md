# The Last Battle

---

## Overview

This game is a simple 2D strategy game where you play against the computer. In the game, you have a grid, like a big square cut into smaller squares. These small squares are where the game happens. Your job is to pick your soldiers, like an infantryman, a tank, or a sniper, and then they fight against the computer's soldiers.[Click here to play the game!](https://wiry-shoes.surge.sh/)

---

## Gameplay

### Map:

The map is a grid represented in JavaScript as an array, with each box having an index. The map has 3 sectors:

- Team base: where team players respawn
- Battle area: in the middle of the map, acting as a link between the bases.
- Enemy base: where enemy players respawn

### Teams:

- Characters: There are three types of characters: infantryman, tank, and sniper. Each has a unique damage output: 5 for the infantryman, 30 for the tank, and 10 for the sniper, also, they need to cooldown: 5 seconds for infantryman, 20 for the tank and 10 for the sniper.
- Format: 10 vs 10 combat. (AI enemies may add more players to win the battle)
- Control: Players deploy forces against AI-controlled enemies.
- AI Behavior: Characters exhibit intelligent behaviors, choosing the closest enemy for combat.

### Mechanics

- Movement: Players and CPU characters move along the grid, with each grid box corresponding to one array index.
- Combat: Characters engage with the nearest enemy. CPU characters scan the grid to select an enemy and shoot at them.

### Modes:

- Team Deathmatch: A standard fight-to-the-end team battle. The first team to reach 20 kills wins.

---

## How to play:

Easy to play; just click the button of the character type you want to deploy. Characters will fight enemy characters to defeat them and win the battle.

---

## Frequently asked questions(FAQ):

- **Why the game looks bad?**
  - The game doesn't offer a visually appealing style or enjoyable gameplay. Its main focus is on the player characters, who initially move randomly. They search for boxes to locate the nearest enemy to engage in combat. Below is the code for the AI logic, which helps in searching for enemies and moving beside them:

```
     moveTo(characters) {
    let closestEnemy
    let minDistance = Infinity

    for (let enemy of characters) {
      if (
        this !== enemy &&
        this.getTeam() !== enemy.getTeam() &&
        enemy.getDead() === 0
      ) {
        // Manhattan distance formula
        let distance =
          Math.abs(this.getPositionX() - enemy.getPositionX()) +
          Math.abs(this.getPositionY() - enemy.getPositionY())
        if (distance < minDistance) {
          minDistance = distance
          closestEnemy = enemy
        }
      }
    }

    if (closestEnemy !== undefined) {
      let moveX = this.getPositionX()
      let moveY = this.getPositionY()

      if (this.getPositionX() < closestEnemy.getPositionX()) {
        moveX++
      } else if (this.getPositionX() > closestEnemy.getPositionX()) {
        moveX--
      }

      if (this.getPositionY() < closestEnemy.getPositionY()) {
        moveY++
      } else if (this.getPositionY() > closestEnemy.getPositionY()) {
        moveY--
      }

      if (
        moveX >= 0 &&
        moveX < 10 &&
        moveY >= 0 &&
        moveY < 10 &&
        arrayOfCharacters[moveX][moveY] === ''
      ) {
        this.setPosition(moveX, moveY)
      }
    }
  }
```

- **Will there be any updates to enhance the gameplay and style?**
  - Maybe
- **Is it safe to play the game?**
  - Yes, it's 100% safe and legal
- **Does your game meet all the project requirements??**
  - Yes
- **Does your game improve your coding skills?**
  - Yes, especially it gives me a quick insight into how challenging the field of AI is.
- **What technologies are used in this game?**
  - ![HTML badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  - ![CSS badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  - ![JS badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

---

## Some pictures of the game:

### **The main page:**

![The homepage](https://i.ibb.co/dWdSSqF/Screenshot-59.png)

### **The gameplay:**

![The homepage](https://i.ibb.co/bRndf7n/Screenshot-60.png)
