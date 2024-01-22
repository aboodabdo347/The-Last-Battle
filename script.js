const create = () => {
  const first = document.querySelector('.first-edition')
  for (let i = 0; i < 100; i++) {
    let box = document.createElement('div')
    // box.innerHTML = i
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
    if (i === 5 && j === 5) {
      arrC[i][j] = 'wall'
    }
  }
}
class Character {
  constructor(name, positionX, positionY, team,type) {
    this.name = name
    this.positionX = positionX
    this.positionY = positionY
    this.health = 100
    this.team = team
    this.dead = 0
    this.type=type
    this.bullets=0
    this.first=0
  }
  getType(){
    return this.type
  }
  getFirst(){
    return this.first
  }
  setFirst(num){
this.first=num
  }
  setBullets(){
    if(this.getType()==="infantryman" && this.getFirst()===0){
this.bullets=30
this.setFirst(1)
    }
    else if(this.getType()==="tank" && this.getFirst()===0){
      this.bullets=5
      this.setFirst(1)
          }
          else if(this.getType()==="sniper" && this.getFirst()===0){
            this.bullets=10
            this.setFirst(1)
                }
if(this.getType()==="infantryman" && this.getFirst()===1){
  this.bullets++
}
else if(this.getType()==="tank" && this.getFirst()===1){
  this.bullets++
}
else if(this.getType()==="sniper" && this.getFirst()===1){
  this.bullets++
}
  }
  getBullets(){
    return this.bullets
  }
  reload(){
    if (this.getBullets()<5 && this.getType()==="infantryman"){
      setInterval(()=>{
        if(this.getBullets()<31){
          this.setBullets()
        }
      },100)
    }
   else if (this.getBullets()<1 && this.getType()==="tank"){
      setInterval(()=>{
        if(this.getBullets()<6){
          this.setBullets()
        }
      },400)
    }
    else if (this.getBullets()<4 && this.getType()==="sniper"){
      setInterval(()=>{
        if(this.getBullets()<11){
          this.setBullets()
        }
      },200)
    }
  }
  getHealth() {
    return this.health
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
    this.health -= 10
    if (this.health === 0) {
      boxes[this.positionX * 10 + this.positionY].innerHTML = 'rip'
      arrC[this.positionX][this.positionY] = 'rip'
      this.dead = 1
    }
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
        choose >= 0.0 &&
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
  hide() {
    let wallsArr = []
    let closeX=this.getPositionX()
    let closeY=this.getPositionY()
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if ((arrC[j][i] = 'wall')) {
          wallsArr.push({x:j, y:i})
        }
      }
    }
    if (this.getHealth() < 25) {
      for(let i=0;i<wallsArr;i++){
      if(closeX>wallsArr[i].x){

      }
      }
for (closeX;closeX<=wallsArr.length;closeX++){
  for(closeY)
}
    }
  }
  
reload(){}

getScore(){}

getCheck(){}

  battle(enemy) {
    if (this.isAdjacent(enemy) === 1) {
      enemy.kill()
    }
  }
  moveTo(Character) {
    let closeX = this.getPositionX()
    let closeY = this.getPositionY()
    for (let enemy of Character) {
      if (enemy.getPositionX() > closeX) {
        for (let i = closeX; i <= enemy.getPositionX(); i++) {
          if (
            i === enemy.getPositionX() &&
            this.getTeam() !== enemy.getTeam() &&
            enemy.getDead() == 0
          ) {
            let movetoEnemy = enemy.getPositionX()
            for (closeX; closeX <= movetoEnemy; closeX++) {
              this.setPosition(closeX, this.getPositionY())
            }
          }
        }
      } else if (enemy.getPositionX() < closeX) {
        for (let i = closeX; i >= enemy.getPositionX(); i--) {
          if (
            i === enemy.getPositionX() &&
            this.getTeam() !== enemy.getTeam() &&
            enemy.getDead() == 0
          ) {
            let movetoEnemy = enemy.getPositionX()
            for (closeX; closeX >= movetoEnemy; closeX--) {
              this.setPosition(closeX, this.getPositionY())
            }
          }
        }
      } else if (enemy.getPositionY() > closeY) {
        for (let i = closeY; i <= enemy.getPositionY(); i++) {
          if (
            i === enemy.getPositionY() &&
            this.getTeam() !== enemy.getTeam() &&
            enemy.getDead() == 0
          ) {
            let movetoEnemy = enemy.getPositionY()
            for (closeY; closeY <= movetoEnemy; closeY++) {
              this.setPosition(this.getPositionX(), closeY)
            }
          }
        }
      } else if (enemy.getPositionY() < closeY) {
        for (let i = closeY; i >= enemy.getPositionY(); i--) {
          if (
            i === enemy.getPositionY() &&
            this.getTeam() !== enemy.getTeam() &&
            enemy.getDead() == 0
          ) {
            let movetoEnemy = enemy.getPositionY()
            for (closeY; closeY >= movetoEnemy; closeY--) {
              this.setPosition(this.getPositionX(), closeY)
            }
          }
        }
      }
      if (
        this !== enemy &&
        this.getTeam() !== enemy.getTeam() &&
        this.isAdjacent(enemy) === 1 &&
        this.getDead() === 0
      ) {
        this.battle(enemy)
      }
    }
  }
  findAndBattle(Character) {
    for (let enemy of Character) {
      if (
        this !== enemy &&
        this.getTeam() !== enemy.getTeam() &&
        this.isAdjacent(enemy) === 1 &&
        this.getDead() === 0
      ) {
        this.battle(enemy)
      }
    }
  }
  move() {
    let gen = Math.random()
    if (gen < 0.1) this.randomMove()
    else this.moveTo()
  }
}
class X extends Character {}
class O extends Character {}
const generate = (word) => {
  if (word === 'tx') {
    return Math.floor(Math.random() * 10)
  }
  if (word === 'ty') {
    return Math.floor(Math.random() * 2) + 8
  }
  if (word === 'ex') {
    return Math.floor(Math.random() * 10)
  }
  if (word === 'ey') {
    return Math.floor(Math.random() * 2)
  }
}
document.addEventListener('DOMContentLoaded', () => {
  create()
  const characters = [
    new X('x', generate('ty'), generate('tx'), 0),
    new X('f', generate('ty'), generate('tx'), 0),
    new O('o', generate('ey'), generate('ex'), 1),
    new O('l', generate('ey'), generate('ex'), 1)
  ]
  characters.forEach((c) => c.setPosition(c.getPositionX(), c.getPositionY()))
  setInterval(() => {
    characters.forEach((c) => {
      c.move()
      c.findAndBattle(characters)
    })
  }, 100)
})
