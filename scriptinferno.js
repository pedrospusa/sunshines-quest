
// Global variables
var velocidade_fundo = 5;
var velocidade_fundo2;
var velocidade_fundo3;
var velocidade_fundo4;
var velocidade_fundo5;
var velocidade_fundo6;
var velocidade_fundo7;
var velocidade_nuvens;



var fundo_x;

var sprite_num = 1, direction;


window.onload = function () {
    start_animation;



}

function start_animation() {
    document.getElementById("bgi2").style.backgroundPositionX = "0";
    document.getElementById("bgi3").style.backgroundPosition = "0 0";
    document.getElementById("bgi4").style.backgroundPosition = "0 0";
    document.getElementById("bgi5").style.backgroundPosition = "0 0";
    document.getElementById("bgi6").style.backgroundPosition = "0 0";
    document.getElementById("bgi7").style.backgroundPosition = "0 0";
    document.getElementById("bgi8").style.backgroundPosition = "0 0";

    fundo_x = 0;







}

var minutos = document.getElementById("minutes");
var segundos = document.getElementById("seconds");
var total = 0;
setInterval(setTime, 1000);

function setTime() {
    ++total;
    segundos.innerHTML = pad(total % 60);
    minutos.innerHTML = pad(parseInt(total / 60));
}

function pad(val) {

    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
//vida
let vida= 3;
document.getElementById("numeros").innerHTML = "X " + vida ;

let pedra= 0;
document.getElementById("numerosP").innerHTML = "X " + pedra ;



























































































////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

// TAMANHO DO JOGO



canvas.width = 1920;
canvas.height = 1080;

const gravity = 2
var jumping
var doubleJumpingEnable
var onPlatformDetectionJump
var bossHit = false

var vidasBoss = 5


// JOGADOR

class Player {
    constructor(){
        this.position = {
            x: 300,
            y: 859

        },

        this.velocity = {
            x: 0,
            y: 0
        },

        this.width = 52,
        this.height = 96,
        this.image = sunshineIdleRight
        this.frames = 0

        this.sprites = {
            idle: {
                right: sunshineIdleRight,
                left: sunshineIdleLeft,
                frameNumber: 3
            },

            run: {
                right: sunshiheRunRight,
                left: sunshineRunLeft,
                frameNumber: 5
            },

            hurt: {
                right: sunshineHurtRight,
                frameNumber: 3
            }

        }

        this.currentSprite = this.sprites.idle.right
        this.currentFrameNumber = this.sprites.idle.frameNumber


    }
        draw() {
        c.drawImage(
            this.currentSprite,
            96 * this.frames,
            0,
            84,
            89,
            this.position.x,
            this.position.y,
            96,
            96
        )

    }

    frameSelector() {
        setInterval(() => {
            this.frames++
            if (this.frames > player.currentFrameNumber) {
                this.frames = 0
            }
        }, 200)
    }


    update() {
        this.draw()

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        //verificar se está no chão

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {

            this.velocity.y += gravity
        }

        document.getElementById("bgi2").style.backgroundPositionX = velocidade_nuvens + "px";
        document.getElementById("bgi3").style.backgroundPositionX = velocidade_fundo2 + "px";
        document.getElementById("bgi4").style.backgroundPositionX = velocidade_fundo3 + "px";
        document.getElementById("bgi5").style.backgroundPositionX = velocidade_fundo4 + "px";
        document.getElementById("bgi6").style.backgroundPositionX = velocidade_fundo5 + "px";
        document.getElementById("bgi7").style.backgroundPositionX = velocidade_fundo6 + "px";
        document.getElementById("bgi8").style.backgroundPositionX = velocidade_fundo7 + "px";

        velocidade_nuvens = fundo_x * 0.1;
        velocidade_fundo2 = fundo_x * 0.2;
        velocidade_fundo3 = fundo_x * 0.2;
        velocidade_fundo4 = fundo_x * 0.5;
        velocidade_fundo5 = fundo_x * 0.5;
        velocidade_fundo6 = fundo_x * 0.7;
        velocidade_fundo7 = fundo_x * 0.9;

    }

}

// INIMIGOS

class Monster {
    constructor({position, velocity, distance = {
        limit: 50,
        traveled: 0
    }}) {
        this.position = {
            x: position.x,
            y: position.y
        }

        this.velocity = {
            x: -1.3,
            y: velocity.y
        }

        this.width = 84
        this.height = 80
        this.frames = 0

        this.distance = distance



        this.sprites = {

            walk: {
                right: zombieWalkRight,
                left: zombieWalkLeft,
                frameNumber: 5
            },

            death: {
                right: zombieDeathRight,
                left: zombieDeathLeft,
                frameNumber: 3
            }

        }

        this.currentSprite = this.sprites.walk.left
        this.currentFrameNumber = this.sprites.walk.frameNumber

    }

    draw() {
        c.drawImage(
            this.currentSprite,
            84 * this.frames,
            0,
            84,
            84,
            this.position.x,
            this.position.y,
            84,
            84
        )

    }

    frameSelector() {
        setInterval(() => {
            this.frames++
            if (this.frames > this.currentFrameNumber) {
                this.frames = 0
            }
        }, 200)
    }



    update() {
        this.draw()



        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }

        this.distance.traveled += Math.abs(this.velocity.x)

        if (this.distance.traveled >= this.distance.limit) {
            this.distance.traveled = 0
            this.velocity.x = -this.velocity.x

            if (this.velocity.x > 0) {
                this.currentSprite = this.sprites.walk.right
                this.frames = 0

            } else if (this.velocity.x < 0) {
                    this.currentSprite = this.sprites.walk.left
                    this.frames = 0
                }


        }

    }
}



// PEDRAS

class Rock {
    constructor({position, velocity}) {
        this.position = {
            x: position.x,
            y: position.y
        }

        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }

        this.image = rockFloor
        this.width = this.image.width
        this.height = this.image.height
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }

    }
}

class RockProjectile {
    constructor({position, velocity, index}) {
        this.position = {
            x: position.x,
            y: position.y
        }

        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }

        this.image = rockThrow
        this.width = this.image.width
        this.height = this.image.height
        this.index = index
        this.timeLimit = 0
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {
        this.draw()
        this.timeLimit++


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity *0.3
        }

    }
}

//BOSS

class Boss {
    constructor({position, velocity}) {
        this.position = {
            x: position.x,
            y: position.y
        }

        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }

        this.width = 180
        this.height = 180
        this.frames = 0

        this.sprites = {
            idle: bossIdle,
            hurt: bossHurt,
            death: bossDeath,
            frameNumber: 3
        }

        this.currentSprite = this.sprites.idle
        this.currentFrameNumber = this.sprites.frameNumber

    }

    draw() {
        c.drawImage(
            this.currentSprite,
            180   * this.frames,
            0,
            180,
            180,
            this.position.x,
            this.position.y,
            180,
            180
        )

    }

    frameSelector() {
        setInterval(() => {
            this.frames++
            if (this.frames > this.currentFrameNumber) {
                this.frames = 0
            }
        }, 200)
    }



    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

    }
}

//PROJETEIS BOSS

class BossAttack {
    constructor({position, velocity, index}) {
        this.position = {
            x: position.x,
            y: position.y
        }

        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }

        this.image = bossAttackProjectile
        this.width = 72
        this.height = 72
        this.index = index
        this.frames = 0
        this.currentFrameNumber = 7

    }

    draw() {
        c.drawImage(
            this.image,
            72   * this.frames,
            0,
            72,
            72,
            this.position.x,
            this.position.y,
            72,
            72
        )

    }

    frameSelector() {
        setInterval(() => {
            this.frames++
            if (this.frames > this.currentFrameNumber) {
                this.frames = 0
            }
        }, 200)
    }



    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

    }

}

// PLATAFORMA

    class Platform {
    constructor({x, y, image}) {
        this.position = {
            x,
            y,
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

//media
class Platform2 {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.image2 = image2
        this.width = image2.width
        this.height = image2.height
    }

    draw() {
        c.drawImage(this.image2, this.position.x, this.position.y)
    }
}

//pequena
class Platform3 {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.image3 = image3
        this.width = image3.width
        this.height = image3.height
    }

    draw() {
        c.drawImage(this.image3, this.position.x, this.position.y)
    }
}

// FOOD BOLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

class Bolo{
    constructor({position, velocity}) {
        this.position = {
            x: position.x,
            y: position.y
        }

        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }

        this.image = bolo
        this.width = 48
        this.height = 48
        this.frames = 0

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }



    update() {
        this.draw()


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }
    }
}



// IMAGENS

let image = new Image()
image.src = "sources/plataformai1.png"

let image2 = new Image()
image2.src = "sources/plataformai2.png";

let image3 = new Image()
image3.src = "sources/plataforma3.png"

let sunshineIdleRight = new Image()
sunshineIdleRight.src = "sources/sunshineIdleRight.png"

let sunshineIdleLeft = new Image()
sunshineIdleLeft.src = "sources/sunshineIdleLeft.png"

let sunshiheRunRight = new Image()
sunshiheRunRight.src = "sources/sunshineRunRight.png"

let sunshineRunLeft = new Image()
sunshineRunLeft.src = "sources/sunshineRunLeft.png"

let sunshineHurtRight = new Image()
sunshineHurtRight.src = "sources/sunshineHurtRight.png"

let rockFloor = new Image()
rockFloor.src = "sources/rock2.png"

let rockThrow = new Image()
rockThrow.src = "sources/rock1.png"


let zombieWalkRight = new Image()
zombieWalkRight.src = "sources/zombieWalkRight.png"

let zombieWalkLeft = new Image()
zombieWalkLeft.src = "sources/zombieWalkLeft.png"

let zombieDeathRight = new Image()
zombieDeathRight.src = "sources/zombieDeathRight.png"

let zombieDeathLeft = new Image()
zombieDeathLeft.src = "sources/zombieDeathLeft.png"

let bossIdle = new Image()
bossIdle.src = "sources/bossfinal_idle.png"

let bossHurt = new Image()
bossHurt.src = "sources/bossfinal_hurt.png"

let bossDeath = new Image()
bossDeath.src = "sources/bossfinal_death.png"

let bossAttackProjectile = new Image()
bossAttackProjectile.src = "sources/blackHoleProjectile.png"




// IMAGEM BOLO INIT
let bolo = new Image()
bolo.src = "sources/malagueta.png"
// FIM IMAGEM BOLO INIT




// FIM IMAGENS

let normallvl_theme;
normallvl_theme = new Audio();
normallvl_theme.src = "sources/sons/inferno_theme.mp3";
var iniciosom = 1;

let boss_theme;

boss_theme = new Audio();
boss_theme.src = "sources/sons/boss_theme.mp3";


window.onload = init;



function init(){

    setInterval(() => {
        bossAttacks.push(new BossAttack({
            position: {
                x: (Math.random() * 1650) + 12200 - scrollOffset,
                y: 20
            },
            velocity: {
                x: 0,
                y: 3
            }

        }))

        console.log()
    }, 300)


    vida=3;
    document.getElementById("numeros").innerHTML = "X " + vida;
    pedra= 0;
    document.getElementById("numerosP").innerHTML = "X " + pedra ;

    velocidade_fundo = 5;
    start_animation()

    player = new Player();



    bosses = [new Boss({position: {
            x: 13600,
            y: 200
        },
        velocity: {
            x: 0,
            y: 0
        }

    })]


        monsters = [new Monster({
                position: {
                    x: 900,
                    y: 800
                },
                velocity: {
                    x: -0.7,
                    y: 0
                }
            }
        ),
            new Monster({
                    position: {
                        x: 1500,
                        y: 800
                    },
                    velocity: {
                        x: -0.7,
                        y: 0
                    }
                }
            ),
            new Monster({
                    position: {
                        x: 2900,
                        y: 500
                    },
                    velocity: {
                        x: -0.7,
                        y: 0
                    }
                }
            ),
            new Monster({
                    position: {
                        x: 5500,
                        y: 500
                    },
                    velocity: {
                        x: -0.7,
                        y: 0
                    }
                }
            ),
            new Monster({
                    position: {
                        x: 7000,
                        y: 400
                    },
                    velocity: {
                        x: -0.7,
                        y: 0
                    }
                }
            ),
            new Monster({
                    position: {
                        x: 7500,
                        y: 800
                    },
                    velocity: {
                        x: -0.7,
                        y: 0
                    }
                }
            ),
            new Monster({
                    position: {
                        x: 7750,
                        y: 300
                    },
                    velocity: {
                        x: -0.7,
                        y: 0
                    }
                }
            ),
            new Monster({
                    position: {
                        x: 13000,
                        y: 859
                    },
                    velocity: {
                        x: -0.2,
                        y: 0
                    }
                }
            ),
        ]

    bolos = [
        new Bolo({
                position: {
                    x: 1600,
                    y: 400
                },
                velocity: {
                    x: 0,
                    y: 0
                }
            }
        ),
        new Bolo({
                position: {
                    x: 7300,
                    y: 100
                },
                velocity: {
                    x: 0,
                    y: 0
                }
            }
        ),
        new Bolo({
                position: {
                    x: 10500,
                    y: 172
                },
                velocity: {
                    x: 0,
                    y: 0
                }
            }
        ),
    ]
    // FIM POSICÃO BOLINHOSSSSSSSSSSSSSSSS

    //POSICAO PEDRAS

    rocks = [new Rock({position: {
        x: 1300,
        y: 200
        },
        velocity: {
        x: 0,
        y:0
        }}
    ),
        new Rock({position: {
                x: 4000,
                y: 200
            },
            velocity: {
                x: 0,
                y:0
            }}
        ),
        new Rock({position: {
                x: 5600,
                y: 200
            },
            velocity: {
                x: 0,
                y:0
            }}
        ), new Rock({position: {
                x: 12000    ,
                y: 200
            },
            velocity: {
                x: 0,
                y:0
            }}
        )
    ]

    platforms = [
        new Platform({x:-100, y: 980, image}),
        new Platform({x: 900, y: 980, image}),
        new Platform2({x: 924, y: 657, image2}),
        new Platform2({x: 1374, y: 457, image2}),
        new Platform({x: 2200, y: 980, image}),
        new Platform2({x:2700, y: 657, image2}),
        new Platform2({x: 3200, y: 357, image2}),
        new Platform2({x: 3900, y: 657, image2}),
        new Platform({x: 4500, y: 980, image}),
        new Platform2({x: 5400, y: 657, image2}),
        new Platform2({x: 5600, y: 357, image2}),
        new Platform({x: 6000, y: 980, image}),
        new Platform2({x: 6300, y: 357, image2}),
        new Platform({x: 6400, y: 980, image}),
        new Platform({x: 6800, y: 980, image}),
        new Platform2({x: 6850, y: 557, image2}),
        new Platform2({x: 7100, y: 257, image2}),
        new Platform2({x: 7600, y: 457, image2}),
        new Platform2({x: 8200, y: 657, image2}),
        new Platform2({x: 8550, y: 657, image2}),
        new Platform2({x: 8850, y: 357, image2}),
        new Platform2({x: 9065, y: 857, image2}),
        new Platform2({x: 9700, y: 857, image2}),
        new Platform2({x: 10000, y: 570, image2}),
        new Platform2({x: 10300, y: 270, image2}),
        new Platform2({x: 10900, y: 757, image2}),
        new Platform2({x: 11400, y: 557, image2}),
        new Platform({x: 11700, y: 980, image}),
        new Platform({x: 12690, y: 980, image}),
        new Platform({x: 13500, y: 980, image}),
        new Platform2({x: 12260, y: 657, image2}),
        new Platform2({x: 12960, y: 557, image2})
    ]



    scrollOffset = 0

    image = new Image()
    image.src = "sources/plataformai1.png"

    image2 = new Image()
    image2.src = "sources/plataformai2.png";

    sunshineIdleRight = new Image()
    sunshineIdleRight.src = "sources/sunshineIdleRight.png"

    sunshineIdleLeft = new Image()
    sunshineIdleLeft.src = "sources/sunshineIdleLeft.png"

    sunshiheRunRight = new Image()
    sunshiheRunRight.src = "sources/sunshineRunRight.png"

    sunshineRunLeft = new Image()
    sunshineRunLeft.src = "sources/sunshineRunLeft.png"

    sunshineHurtRight = new Image()
    sunshineHurtRight.src = "sources/sunshineHurtRight.png"

    rockFloor = new Image()
    rockFloor.src = "sources/rock2.png"

    rockThrow = new Image()
    rockThrow.src = "sources/rock1.png"

    zombieWalkRight = new Image()
    zombieWalkRight.src = "sources/zombieWalkRight.png"

    zombieWalkLeft = new Image()
    zombieWalkLeft.src = "sources/zombieWalkLeft.png"

    zombieDeathRight = new Image()
    zombieDeathRight.src = "sources/zombieDeathRight.png"

    zombieDeathLeft = new Image()
    zombieDeathLeft.src = "sources/zombieDeathLeft.png"

    bossIdle = new Image()
    bossIdle.src = "sources/bossfinal_idle.png"

    bossHurt = new Image()
    bossHurt.src = "sources/bossfinal_hurt.png"

    bossDeath = new Image()
    bossDeath.src = "sources/bossfinal_death.png"

    bossAttack = new Image()
    bossAttack.src = "sources/blackHoleProjectile.png"



// IMAGEM BOLO INIT
    bolo = new Image()
    bolo.src = "sources/malagueta.png"
// FIM IMAGEM BOLO INIT

    player.currentSprite = player.sprites.idle.right
    player.currentFrameNumber = player.sprites.idle.frameNumber
    player.frames = 0

    player.frameSelector();

    monsters.forEach((monster) => {
        monster.frameSelector();
    })

    bosses.forEach((boss) => {
        boss.frameSelector()

    })

    bossAttacks.forEach((bossAttack) => {
        bossAttack.frameSelector()

    })





} //END INIT






let player = new Player();

var sunshineHurtDetector = false


const keys = {
    right: {
        pressed: false
    },

    left:{
        pressed: false
    }
}

let platforms = [

]

let scrollOffset = 0

function isOnTopOfPlatform({object, platform}) {
    return (object.position.y + object.height <= platform.position.y && object.position.y + object.height + object.velocity.y >= platform.position.y && object.position.x + object.width >= platform.position.x && object.position.x <= platform.position.x + platform.width)

}

function colisionTop({object1, object2}) {
    return (object1.position.y + object1.height <= object2.position.y && object1.position.y + object1.height + object1.velocity.y >= object2.position.y && object1.position.x + object1.width >= object2.position.x && object1.position.x <= object2.position.x + object2.width)

}

function colisionBottomFix({object1, object2}) {
    return (object1.position.y >= object2.position.y + object2.height && object1.position.y  <= object2.position.y && object1.position.x + object1.width >= object2.position.x && object1.position.x <= object2.position.x + object2.width)

}

function colisionSides({object1, object2}) {
    return (object1.position.x + object1.width >= object2.position.x && object1.position.y + object1.height >= object2.position.y && object1.position.x <= object2.position.x + object2.width && object1.position.y + object1.height >= object2.position.y && object1.position.y <= object2.position.y + object2.height)
}

let monsters = []

let rocks = []

let rockProjectiles = []

let bossAttacks = []




let bolos = []



let bosses= []


function animate() {

    console.log(scrollOffset)
    requestAnimationFrame(animate)
    if(vida < 1){
        window.location.href="indexlose.html"  // RESET SEM VIDAS
    }

    if (player.position.y > canvas.height){ //LOOSE CONDITION QUEDA
        window.location.href="indexlose.html"
    }

    c.clearRect(0, 0, canvas.width, canvas.height)


    platforms.forEach((platform) => {
        platform.draw()



        if (isOnTopOfPlatform({
            object: player,
            platform: platform
        })) {
            player.velocity.y = 0
            onPlatformDetectionJump = true
            jumping = false
            doubleJumpingEnable = false
        }

        monsters.forEach(monster => {
            if (isOnTopOfPlatform({
                object: monster,
                platform: platform
            })){
                monster.velocity.y = 0
            }
        })

        rocks.forEach(rock => {
            if (isOnTopOfPlatform({
                object: rock,
                platform: platform
            })){
                rock.velocity.y = 0
            }
        })

        rockProjectiles.forEach(rockProjectile => {
            if (isOnTopOfPlatform({
                object: rockProjectile,
                platform: platform
            })){
                rockProjectile.velocity.y = -rockProjectile.velocity.y
            }
        })

        // isOnTopOfPlataform BOLOOOOOOOOOOOOOOOOOOOOOOOOOO
        bolos.forEach(bolo => {
            if (isOnTopOfPlatform({
                object: bolo,
                platform: platform
            })){
                bolo.velocity.y = 0
            }
        })






    })


    var stone_pickup;

    bosses.forEach((boss) => {
        boss.update()

        rockProjectiles.forEach((rockProjectile, indexRock) => {

            if (colisionTop({
                object1: rockProjectile,
                object2: boss
            }) || colisionSides({
                object1: rockProjectile,
                object2: boss
            })
            ){ if (bossHit === false && vidasBoss > 0)

                rockProjectiles.splice(indexRock, 1)

                vidasBoss--
                boss.currentSprite = boss.sprites.hurt
                boss.frames = 0
                bossHit = true
                enemy_hit = new Audio();
                enemy_hit.src = "sources/sons/enemy_hit.mp3";
                enemy_hit.play();

                setTimeout(() => {
                    boss.currentSprite = boss.sprites.idle
                    bossHit = false
                }, 800)

                if (vidasBoss <= 0) {
                    boss.currentSprite = boss.sprites.death
                    boss.velocity.y = 5

                    setTimeout(()=>{
                        window.location.href="indexwin.html"
                    },6000)

                }
            }


        })

        if (vidasBoss <= 0) {
            boss.currentSprite = boss.sprites.death
            boss.velocity.y = 5

            setTimeout(()=>{
                //WIN CONDITION
            },6000)

        }

    })

    rocks.forEach((rock, index) => {
        rock.update()

        if (colisionTop({
            object1: player,
            object2: rock
        }) || colisionSides({
            object1: player,
            object2: rock
        })) {
            pedra = pedra + 5;
            document.getElementById("numerosP").innerHTML = "X " + pedra ;
            console.log("pedras: " + pedra)
            rocks.splice(index, 1)
            stone_pickup = new Audio();
            stone_pickup.src = "sources/sons/stone_pickup.mp3";
            stone_pickup.play();
        }



    })

    rockProjectiles.forEach((rockProjectile) => {
        rockProjectile.update()

    })

    bossAttacks.forEach((bossAttack) => {
        bossAttack.update()

    })

    //GANHA VIDAS COM BOLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    bolos.forEach((bolo, index) => {
        bolo.update()

        var food;

            if (colisionSides ({
                object1: player,
                object2: bolo
            }) || colisionTop({
                object1: player,
                object2: bolo
            })) {
                vida++;
                document.getElementById("numeros").innerHTML = "X " + vida;
                bolos.splice(index, 1)
                food = new Audio();
                food.src = "sources/sons/food.mp3";
                food.play();
            }

    })
    // FIM GANHA VIDAS COM BOLOOOOOOOOOOOOOOOOOOOOOOOOOOOO



bossAttacks.forEach((bossAttack, index) =>{


    if (sunshineHurtDetector === false) {

        if (colisionTop({
            object1: bossAttack,
            object2: player
        }) || colisionSides({
            object1: bossAttack,
            object2: player
        })) {
            setTimeout(() => {
                sunshine_hit = new Audio();
                sunshine_hit.src = "sources/sons/enemy_hit.mp3";
                sunshine_hit.play();
                bossAttacks.splice(index, 1)
                console.log("hit")
            }, 1)

            vida--;
            document.getElementById("numeros").innerHTML = "X " + vida;
            player.currentSprite = player.sprites.hurt.right
            player.currentFrameNumber = player.sprites.hurt.frameNumber
            player.frames = 0
            player.velocity.y = 0
            player.velocity.y = -30
            sunshineHurtDetector = true

            setTimeout(() => {
                sunshineHurtDetector = false
                player.currentSprite = player.sprites.idle.right
                player.currentFrameNumber = player.sprites.idle.frameNumber
                player.frames = 0
                if (keys.right.pressed) {
                    player.currentSprite = player.sprites.run.right
                    player.currentFrameNumber = player.sprites.run.frameNumber
                } else if (keys.left.pressed) {
                    player.currentSprite = player.sprites.run.left
                    player.currentFrameNumber = player.sprites.run.frameNumber
                }
            }, 600)


        }
    }
})


  monsters.forEach((monster, index) => {
        monster.update()

  var sunshine_hit;

    if (sunshineHurtDetector === false){

        //MONSTER HIT TOP
        if (colisionTop({
            object1: player,
            object2: monster
        })) {
            vida--;
            document.getElementById("numeros").innerHTML = "X " + vida;
            player.currentSprite = player.sprites.hurt.right
            player.currentFrameNumber = player.sprites.hurt.frameNumber
            player.frames = 0
            player.velocity.y = 0
            player.velocity.y = -30
            sunshineHurtDetector = true
            sunshine_hit = new Audio();
            sunshine_hit.src = "sources/sons/sunshine_hit.mp3";
            sunshine_hit.play();
            setTimeout(() => {
                sunshineHurtDetector = false
                player.currentSprite = player.sprites.idle.right
                player.currentFrameNumber = player.sprites.idle.frameNumber
                player.frames = 0
                if (keys.right.pressed) {
                    player.currentSprite = player.sprites.run.right
                    player.currentFrameNumber = player.sprites.run.frameNumber
                } else if (keys.left.pressed) {
                    player.currentSprite = player.sprites.run.left
                    player.currentFrameNumber = player.sprites.run.frameNumber
                }
            }, 600)

            //MONSTER HIT SIDES
        } else if (colisionSides({
            object1: player,
            object2: monster
        })){
            vida--;
            document.getElementById("numeros").innerHTML = "X " + vida;

            player.currentSprite = player.sprites.hurt.right
            player.currentFrameNumber = player.sprites.hurt.frameNumber
            player.frames = 0
            player.velocity.y = 0
            player.velocity.y = -30
            sunshineHurtDetector = true
            sunshine_hit = new Audio();
            sunshine_hit.src = "sources/sons/sunshine_hit.mp3";
            sunshine_hit.play();
            setTimeout(() => {
                sunshineHurtDetector = false
                player.currentSprite = player.sprites.idle.right
                player.currentFrameNumber = player.sprites.idle.frameNumber
                player.frames = 0
                if (keys.right.pressed) {
                    player.currentSprite = player.sprites.run.right
                    player.currentFrameNumber = player.sprites.run.frameNumber
                } else if (keys.left.pressed) {
                    player.currentSprite = player.sprites.run.left
                    player.currentFrameNumber = player.sprites.run.frameNumber
                }
            }, 600)
        }
    }

    var enemy_hit;

      rockProjectiles.forEach((rockProjectile, indexProjectiles) => {

          if (rockProjectile.position.y + rockProjectile.height > canvas.height || rockProjectile.position.x > canvas.width + 10 || rockProjectile.position.x + rockProjectile.width < -10){
              rockProjectiles.splice(indexProjectiles, 1)
          }

          if (colisionTop({
              object1: rockProjectile,
              object2: monster
          }) || colisionSides({
              object1: rockProjectile,
              object2: monster
          })
          ){
              setTimeout(() => {
                  enemy_hit = new Audio();
                  enemy_hit.src = "sources/sons/enemy_hit.mp3";
                  enemy_hit.play();
                  monsters.splice(index, 1)
                  rockProjectiles.splice(indexProjectiles, 1)
                  console.log ("hit")
              }, 1)



          }})



  })





    player.update()

    //KEYBINDS

    if (keys.right.pressed && player.position.x < 600 && scrollOffset < 12000) {
        player.velocity.x = 5



    } else if (keys.left.pressed && player.position.x >= 300 && scrollOffset < 12000) {
        player.velocity.x = -5


    } else {
        player.velocity.x = 0
    }

    if (keys.left.pressed && scrollOffset >= 12000 && player.position.x > 0) {
        player.velocity.x = -5
    }

    if (keys.right.pressed && scrollOffset >= 12000 && player.position.x + player.width < 1920) {
        player.velocity.x = 5
    }

    if (scrollOffset >= 11800 && keys.right.pressed) {
        normallvl_theme.pause();
        boss_theme.play();
    }

    if (scrollOffset < 12000) {

        if (keys.right.pressed && player.position.x >= 600) {
            fundo_x -= velocidade_fundo;
            scrollOffset += 5
            platforms.forEach((platform) => {
                platform.position.x -= 5
            })
            monsters.forEach((monster) => {
                monster.position.x -= 5
            })

            bosses.forEach((boss) => {
                boss.position.x -= 5
            })

            bossAttacks.forEach((bossAttack) => {
                bossAttack.position.x -= 5
            })

            rocks.forEach((rock) => {
                rock.position.x -= 5
            })

            rockProjectiles.forEach((rockProjectile) => {
                rockProjectile.position.x -= 5
            })

            //BOLOOOOOOOOOOOOOOOOOOOOOOOO
            bolos.forEach((bolo) => {
                bolo.position.x -= 5
            })
            //BOLOOOOOOOOOOOOOOOOOOOOOOOO




        }

    }
    if (scrollOffset < 12000) {
        if (keys.left.pressed && player.position.x < 300 && scrollOffset > 0) {
            fundo_x += velocidade_fundo;
            scrollOffset -= 5
            platforms.forEach((platform) => {
                platform.position.x += 5
            })
            monsters.forEach((monster) => {
                monster.position.x += 5
            })

            bossAttacks.forEach((bossAttack) => {
                bossAttack.position.x += 5
            })

            rocks.forEach((rock) => {
                rock.position.x += 5
            })

            rockProjectiles.forEach((rockProjectile) => {
                rockProjectile.position.x += 5
            })

            bosses.forEach((boss) => {
                boss.position.x += 5
            })


            // KEYS BOLOOOOOOOOOOOOOOOOOOO
            bolos.forEach((bolo) => {
                bolo.position.x += 5
            })
            // FIM KEYS BOLOOOOOOOOOOOOOOOOOOO





        }
    }

    }

    if (keys.right.pressed) {



    } else if (keys.left.pressed) {


    }

    //KEYBINDS FIM

    console.log(scrollOffset)

    //DETEÇÃO DE COLISÃO PARTE SUPERIOR PLATAFORMA E PARTE INFERIOR JOGADOR
    platforms.forEach(platform => {

        if (isOnTopOfPlatform({
            object: player,
            platform: platform
        })) {
            player.velocity.y = 0
            onPlatformDetectionJump = true
            jumping = false
            doubleJumpingEnable = false
        }

        monsters.forEach(monster => {
            if (isOnTopOfPlatform({
                object: monster,
                platform: platform
            })){
                monster.velocity.y = 0
            }
        })

        rocks.forEach(rock => {
            if (isOnTopOfPlatform({
                object: rock,
                platform: platform
            })){
                rock.velocity.y = 0
            }
        })


        bolos.forEach(bolo => {
            if (isOnTopOfPlatform({
                object: bolo,
                platform: platform
            })){
                bolo.velocity.y = 0
            }
        })




    })

        // APENAS UM SALTO DEPOIS DE SAIR DA PLATAFORMA
        if (player.velocity.y != 0 && onPlatformDetectionJump === true) {
            jumping = true
            doubleJumpingEnable = true

        }











animate();
player.frameSelector();

monsters.forEach((monster) => {
    monster.frameSelector();
})



// KEYBINDS KEYDOWN

var jump;
var double_jump;
var stone_throw;

window.addEventListener("keydown", ({ keyCode }) => {
    switch (keyCode) {

        case 87: // W
            if (iniciosom == 1) {
                normallvl_theme.play();
                iniciosom++;
            }
        if (jumping === false) { // PRIMEIRO SALTO
            player.velocity.y = 0.1
            player.velocity.y -= 30
            jumping = true
            onPlatformDetectionJump = false
            jump = new Audio();
            jump.src = "sources/sons/jump.mp3";
            jump.play();
            setTimeout(() => {
                doubleJumpingEnable = true
            }, 50);
        }

        if (doubleJumpingEnable === true && sunshineHurtDetector === false) { // DOUBLE JUMP
            double_jump = new Audio();
            double_jump.src = "sources/sons/double_jump.mp3";
            double_jump.play();
            player.velocity.y = 0.1
            player.velocity.y -= 30
            doubleJumpingEnable = false
            onPlatformDetectionJump = false
        }

        //console.log("jumping: " + jumping)
        //console.log("double jumping: " + doubleJumpingEnable)
        
            break

        case 65: // A
            if (iniciosom == 1) {
                normallvl_theme.play();
                iniciosom++;
            }
            keys.left.pressed = true
            if (sunshineHurtDetector === false) {
                player.currentSprite = player.sprites.run.left
                player.currentFrameNumber = player.sprites.run.frameNumber
            }


            break

        case 83: // S
            
            break

        case 68: // D
            if (iniciosom == 1) {
                normallvl_theme.play();
                iniciosom++;
            }
            keys.right.pressed = true
            if (sunshineHurtDetector === false) {
                player.currentSprite = player.sprites.run.right
                player.currentFrameNumber = player.sprites.run.frameNumber
            }



            break

        case 32: // ESPAÇO

            console.log ("space")


            if (player.currentSprite == player.sprites.run.right || player.currentSprite == player.sprites.idle.right){
                if (pedra >= 1) {
                    pedra--
                    document.getElementById("numerosP").innerHTML = "X " + pedra ;


                    rockProjectiles.push(new RockProjectile({
                        position: {
                            x: player.position.x + player.width,
                            y: player.position.y + player.height / 2
                        },
                        velocity: {
                            x: 10,
                            y: 0
                        }

                    }))

                    stone_throw = new Audio();
                    stone_throw.src = "sources/sons/stone_throw.mp3";
                    stone_throw.play();
                }}

            if (player.currentSprite == player.sprites.run.left || player.currentSprite == player.sprites.idle.left){
                if (pedra >= 1) {
                    pedra--
                    document.getElementById("numerosP").innerHTML = "X " + pedra ;


                    rockProjectiles.push(new RockProjectile({
                        position: {
                            x: player.position.x,
                            y: player.position.y + player.height / 2
                        },
                        velocity: {
                            x: -10,
                            y: 0
                        }

                    }))

                    stone_throw = new Audio();
                    stone_throw.src = "sources/sons/stone_throw.mp3";
                    stone_throw.play();
                }}

            break
        
        case 27: // ESC
            
            break
    }
})

//KEYBINDS KEYUP

window.addEventListener("keyup", ({ keyCode }) => {
    switch (keyCode) {

        case 87: // W
            
            break

        case 65: // A
            keys.left.pressed = false
            if (sunshineHurtDetector === false) {
                player.currentSprite = player.sprites.idle.left
                player.currentFrameNumber = player.sprites.idle.frameNumber
                player.frames = 0
            }
            break

        case 83: // S
            
            break

        case 68: // D
            keys.right.pressed = false
            if (sunshineHurtDetector === false) {
                player.currentSprite = player.sprites.idle.right
                player.currentFrameNumber = player.sprites.idle.frameNumber
                player.frames = 0
            }
            break

        case 32: // ESPAÇO
            
            break
        
        case 27: // ESC
            
            break
    }
})


