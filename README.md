# The Last Battle

---

## Overview

"The Last Battle" is a 2D strategy game designed for web platforms. Utilizing HTML, CSS, and JavaScript, the game features a battlefield composed of a grid, masked by a background image for visual appeal. Players navigate through this grid, engaging in tactical combat against CPU-controlled opponents.

---

## Gameplay

### Map:

The map is based on a grid, It is represented in the JavaScript code by an array, with each box having one index in the array. The map is divided into 3 sectors:

- Team base: where the team players respawn.
- Battle area: which will be in the middle of the map and act as a connection link between the bases.
- Enemy base: where the enemy players respawn.

### Teams:

- Format: 5 vs 5 combat.
- Control: The player controls one character, while the rest are CPU-controlled. The camera offers a top-down perspective. [Explain what top-down perspective is](https://whimsical.com/Ms5gWDWXEddNXqy3QEH66d)
- AI Behavior: CPU characters exhibit intelligent behaviors, such as taking cover when their HP (health bar) is less than 20%. While taking cover, their health refreshes until reaching 100% (not exactly 100%; the player or the bot can leave cover whenever they want).

### Mechanics

- Movement: Players and CPU characters move along the grid lines using the "WASD" keys. Each grid box corresponds to one array index, and movement is restricted if a player or wall occupies the space.
- Combat: Characters engage with the nearest enemy. CPU characters will scan the grid and array to select an enemy and shoot bullets at them. Bullets cannot hit enemies taking cover behind walls. The walls have fixed positions in the grid and are represented in the array. They provide cover to players directly behind them by one box or one index. Walls can be destroyed after taking significant damage. CPU characters may sometimes target walls, especially when players have been taking cover behind them for a prolonged period. These wireframes explain how the walls provide cover: [Explain how walls work in the grid](https://whimsical.com/Ms5gWDWXEddNXqy3QEH66d).

### Modes:

- Team Deathmatch: A standard fight-to-the-end team battle. The first team to reach 20 kills wins.

---

## Some pictures of the game (ScreenShots):
