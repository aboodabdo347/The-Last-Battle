const create = () => {
  const first = document.querySelector('.first-edition')
  for (let i = 0; i < 100; i++) {
    let box = document.createElement('div')
    box.innerHTML = i
    box.classList.add('box')
    first.appendChild(box)
  }
}
const boxes = document.querySelectorAll('.box')
const arrC = []

for (let i = 0; i < 10; i++) {
  arrC[i] = []
  for (let j = 0; j < 10; j++) {
    arrC[i][j] = ''
  }
}
class Character {
  constructor(name, positionX, positionY, team) {
    this.name = name
    this.positionX = positionX
    this.positionY = positionY
    this.health = 100
    this.team = team
    this.dead = 0
  }
  getName() {
    return this.name
  }
  getPositionX() {
    return this.positionX
  }
  getPositionY() {
    return this.positionY
  }
  getTeam() {
    return this.team
  }
  getDead() {
    return this.dead
  }
  kill() {
    const boxes = document.querySelectorAll('.box')
    boxes[this.positionX * 10 + this.positionY].innerHTML = 'rip'
    arrC[this.positionX][this.positionY] = 'rip'
    this.dead++
  }

  setPosition(newPositionX, newPositionY) {
    const boxes = document.querySelectorAll('.box')
    arrC[this.positionX][this.positionY] = ''
    boxes[this.positionX * 10 + this.positionY].innerHTML = ''
    this.positionX = newPositionX
    this.positionY = newPositionY
    arrC[this.positionX][this.positionY] = this.getName()
    boxes[this.positionX * 10 + this.positionY].innerHTML = this.getName()
  }
  isAdjacent(enemy) {
    if (enemy.getDead() === 0) {
      if (
        this.getPositionX() === enemy.getPositionX() ||
        this.getPositionY() === enemy.getPositionY()
      )
        return 1
      return 0
    }
  }
  randomMove() {
    if (this.getDead() === 0) {
      let nowX = this.getPositionX()
      let nowY = this.getPositionY()
      let nextX = nowX
      let nextY = nowY
      let choose = Math.random()
      if (
        choose > 0.0 &&
        choose < 0.25 &&
        nowX < 9 &&
        arrC[nowX + 1][nowY] === ''
      ) {
        nextX = nowX + 1
      } else if (
        choose > 0.24 &&
        choose < 0.5 &&
        nowX > 0 &&
        arrC[nowX - 1][nowY] === ''
      ) {
        nextX = nowX - 1
      } else if (
        choose > 0.49 &&
        choose < 0.75 &&
        nowY < 9 &&
        arrC[nowX][nowY + 1] === ''
      ) {
        nextY = nowY + 1
      } else if (
        choose > 0.74 &&
        choose < 1 &&
        nowY > 0 &&
        arrC[nowX][nowY - 1] === ''
      ) {
        nextY = nowY - 1
      }
      this.setPosition(nextX, nextY)
    }
  }

  battle(enemy) {
    if (this.isAdjacent(enemy) === 1) {
      enemy.kill()
    }
  }

  findAndBattle(Character) {
    for (let enemy of Character) {
      if (
        this !== enemy &&
        this.getTeam() !== enemy.getTeam() &&
        this.isAdjacent(enemy) === 1
      ) {
        this.battle(enemy)
      }
    }
  }
}
class X extends Character {}
class O extends Character {}
document.addEventListener('DOMContentLoaded', () => {
  create()
  const characters = [
    new X('x', 1, 0, 0),
    new X('f', 6, 0, 0),
    new O('o', 0, 9, 1),
    new O('l', 2, 9, 1)
  ]
  characters.forEach((c) => c.setPosition(c.getPositionX(), c.getPositionY()))
  setInterval(() => {
    characters.forEach((c) => {
      c.randomMove()
      c.findAndBattle(characters)
    })
  }, 1000)
})
