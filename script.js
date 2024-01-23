const create = () => {
  const first = document.querySelector('.first-edition')
  for (let i = 0; i < 100; i++) {
    let box = document.createElement('div')
    // box.innerHTML = i
    box.classList.add('box')
    first.appendChild(box)
  }
}
let boxes = document.querySelectorAll('.box')
const arrC = []
let teamScore = 0
let enemyScore = 0
for (let i = 0; i < 10; i++) {
  arrC[i] = []
  for (let j = 0; j < 10; j++) {
    arrC[i][j] = ''
    if (i === 5 && j === 5) {
      arrC[j][i] = 'wall'
    }
  }
}
class Character {
  constructor(name, positionX, positionY, team, type) {
    this.name = name
    this.positionX = positionX
    this.positionY = positionY
    this.health = 100
    this.team = team
    this.dead = 0
    this.type = type
    this.bullets = 0
    this.first = 0
    this.isHiding = false
  }
  getType() {
    return this.type
  }
  getFirst() {
    return this.first
  }
  setFirst(num) {
    this.first = num
  }
  setBullets() {
    if (this.getType() === 'infantryman' && this.getFirst() === 0) {
      this.bullets = 30
      this.setFirst(1)
    } else if (this.getType() === 'tank' && this.getFirst() === 0) {
      this.bullets = 5
      this.setFirst(1)
    } else if (this.getType() === 'sniper' && this.getFirst() === 0) {
      this.bullets = 10
      this.setFirst(1)
    }
    if (this.getType() === 'infantryman' && this.getFirst() === 1) {
      this.bullets++
    } else if (this.getType() === 'tank' && this.getFirst() === 1) {
      this.bullets++
    } else if (this.getType() === 'sniper' && this.getFirst() === 1) {
      this.bullets++
    }
  }
  shoot() {
    if (this.getBullets() > 0) this.bullets--
    else this.reload()
  }
  getBullets() {
    return this.bullets
  }
  setHealth(num) {
    this.health = num
  }
  setDamage(type) {
    if (this.getType() === 'infantryman') return 5
    if (this.getType() == 'tank') return 100
    if (this.getType() === 'sniper') return 30
  }
  reload() {
    if (this.getType() === 'infantryman' && this.getBullets() < 30) {
      const reloadInterval = setInterval(() => {
        if (this.getBullets() >= 30) clearInterval(reloadInterval)
        this.bullets++
      }, 100)
    } else if (this.getType() === 'tank' && this.getBullets() < 5) {
      const reloadInterval = setInterval(() => {
        if (this.getBullets() >= 5) clearInterval(reloadInterval)
        this.bullets++
      }, 100)
    } else if (this.getType() === 'sniper' && this.getBullets() < 10) {
      const reloadInterval = setInterval(() => {
        if (this.getBullets() >= 10) clearInterval(reloadInterval)
        this.bullets++
      }, 100)
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
  setDead(num) {
    this.dead = num
  }
  kill(enemy) {
    this.shoot()
    const boxes = document.querySelectorAll('.box')
    let newHealth = enemy.getHealth() - this.setDamage(this.getType())
    enemy.setHealth(newHealth)
    if (newHealth <= 0 && enemy.getTeam() === 1) {
      boxes[enemy.getPositionX() * 10 + enemy.getPositionY()].innerHTML = 'rip'
      arrC[enemy.getPositionX()][enemy.getPositionY()] = 'rip'
      enemy.setDead(1)
      maxCPU--
      teamScore++
      getScore()
    }
    if (newHealth <= 0 && enemy.getTeam() === 0) {
      boxes[enemy.getPositionX() * 10 + enemy.getPositionY()].innerHTML = 'rip'
      arrC[enemy.getPositionX()][enemy.getPositionY()] = 'rip'
      enemy.setDead(1)
      maxPlayer--
      enemyScore++
      getScore()
    }
  }

  setPosition(newPositionX, newPositionY) {
    const boxes = document.querySelectorAll('.box')
    arrC[this.positionX][this.positionY] = ''
    const image = document.createElement('img')
    if (this.getType() === 'infantryman')
      image.src =
        'https://trello.com/1/cards/65af8d05eb1b476b05080377/attachments/65af8e88814ed8b9cdfb0c8d/download/soldier_s.png'
    if (this.getType() === 'sniper')
      image.src =
        'https://trello.com/1/cards/65af8d05eb1b476b05080377/attachments/65af8f3b053d99e1cfbf6e20/download/sniper.png'
    if (this.getType() === 'tank')
      image.src =
        'https://trello.com/1/cards/65af8d05eb1b476b05080377/attachments/65af8e7bd831576d79a9a292/download/tank.png'
    boxes[this.positionX * 10 + this.positionY].appendChild(image)
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
    if (this.health >= 25 || this.isHiding) return

    let closestWall = this.findClosestWall()

    if (!closestWall) return

    this.moveTowards(closestWall.x, closestWall.y)

    this.recoverHealth()
  }

  findClosestWall() {
    let minDistance = Infinity
    let closestWall = null

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (arrC[x][y] === 'wall') {
          let distance =
            Math.abs(this.positionX - x) + Math.abs(this.positionY - y)
          if (distance < minDistance) {
            minDistance = distance
            closestWall = { x, y }
          }
        }
      }
    }

    return closestWall
  }

  moveTowards(targetX, targetY) {
    if (this.positionX < targetX) this.positionX++
    else if (this.positionX > targetX) this.positionX--

    if (this.positionY < targetY) this.positionY++
    else if (this.positionY > targetY) this.positionY--

    this.setPosition(this.positionX, this.positionY)
  }

  recoverHealth() {
    this.isHiding = true
    const healthRecoveryInterval = setInterval(() => {
      if (this.health >= 80) {
        clearInterval(healthRecoveryInterval)
        this.isHiding = false
      } else {
        this.health += 1
      }
    }, 100)
  }

  battle(enemy) {
    if (this.isAdjacent(enemy) === 1) {
      this.kill(enemy)
    }
  }
  moveTo(characters) {
    let closestEnemy = null
    let minDistance = Infinity

    for (let enemy of characters) {
      if (
        this !== enemy &&
        this.getTeam() !== enemy.getTeam() &&
        enemy.getDead() === 0
      ) {
        let distance =
          Math.abs(this.getPositionX() - enemy.getPositionX()) +
          Math.abs(this.getPositionY() - enemy.getPositionY())
        if (distance < minDistance) {
          minDistance = distance
          closestEnemy = enemy
        }
      }
    }

    if (closestEnemy !== null) {
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
        arrC[moveX][moveY] === ''
      ) {
        this.setPosition(moveX, moveY)
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
    else this.moveTo(characters)
  }
}
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
getScore = () => {
  const scoreElement = document.querySelector('.score')
  console.log('hello')
  scoreElement.innerHTML =
    'Your team: Kills: ' +
    teamScore +
    ' Deaths : ' +
    enemyScore +
    '<br> CPU: Kills: ' +
    enemyScore +
    ' Deaths: ' +
    teamScore
}
class X extends Character {}
class O extends Character {}
let characters = []
let gameOver = false
let gameInterval
let lastCpuDeployTime = { infantryman: 0, tank: 0, sniper: 0 }
const cpuDeployCooldown = { infantryman: 5000, tank: 20000, sniper: 10000 }
let lastPlayerDeployTime = { infantryman: 0, tank: 0, sniper: 0 }
const playerDeployCooldown = { infantryman: 5000, tank: 20000, sniper: 10000 }
let maxCPU = 0
let maxPlayer = 0
const getCheck = () => {
  const winningScore = 10

  if (teamScore >= winningScore) {
    alert('You wins!')
    gameOver = true
    endGame()
    return
  }

  if (enemyScore >= winningScore) {
    alert('You lose!')
    gameOver = true
    endGame()
    return
  }
}
const endGame = () => {
  clearInterval(gameInterval)
}
const cpuDeploy = () => {
  const unitTypes = ['ICPU', 'TCPU', 'SCPU']
  const selectedUnitType =
    unitTypes[Math.floor(Math.random() * unitTypes.length)]
  const currentTime = new Date().getTime()

  if (
    currentTime - lastCpuDeployTime[selectedUnitType] <
    cpuDeployCooldown[selectedUnitType]
  ) {
    return
  }
  if (maxCPU < 3) {
    lastCpuDeployTime[selectedUnitType] = currentTime

    const positionX = generate('ex')
    const positionY = generate('ey')
    const team = 1

    const newCharacter = new O(
      selectedUnitType,
      positionX,
      positionY,
      team,
      selectedUnitType
    )
    characters.push(newCharacter)
    newCharacter.setPosition(positionY, positionX)
    maxCPU++
  }
}

const playerDeploy = (unitType) => {
  const currentTime = new Date().getTime()

  if (
    currentTime - lastPlayerDeployTime[unitType] <
    playerDeployCooldown[unitType]
  ) {
    alert(`Please wait. Cooldown for ${unitType} is not finished.`)
    return
  }
  if (maxPlayer < 3) {
    lastPlayerDeployTime[unitType] = currentTime

    const positionX = generate('tx')
    const positionY = generate('ty')
    const team = 0

    const newCharacter = new X(unitType, positionX, positionY, team, unitType)
    characters.push(newCharacter)
    newCharacter.setPosition(positionY, positionX)
    maxPlayer++
  } else alert('you reached the max players')
}

document.addEventListener('DOMContentLoaded', () => {
  create()
  boxes = document.querySelectorAll('.box')

  const deployButton = document.getElementById('deployButton')
  deployButton.addEventListener('click', () => {
    const selectedUnitType = document.getElementById('unitType').value
    playerDeploy(selectedUnitType)
  })

  startGame()
})

const startGame = () => {
  setInterval(cpuDeploy, 1000)
  getScore()

  gameInterval = setInterval(() => {
    if (!gameOver) {
      characters.forEach((character) => {
        character.move()
        character.findAndBattle(characters)
      })
    } else {
      clearInterval(gameInterval)
    }
  }, 100)
}
