let canvas;
let context;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now();

let player = {
    x: 512, y: 600, width: 32, height: 48, direction: 0, speed: 0, xChange: 0, yChange: 0, colour: "#fcc203", health: 50000
};
let enemy1 = {
    x: 512, y: 50, width: 32, height: 48, direction: 180, speed: -3, xChange: 0, yChange: 0, colour: "#3d9feb", health: 10
};
let enemy2 = {
    x: 689, y: 50, width: 32, height: 48, direction: 180, speed: -3, xChange: 0, yChange: 0, colour: "#3d9feb", health: 10
};
let enemy3 = {
    x: 256, y: 10, width: 21, height: 40, direction: -180, speed: 1, xChange: 0, yChange: 0, colour: "#1a8f2d", health: 1, angle: 0
};
let enemy4 = {
    x: 768, y: 10, width: 21, height: 40, direction: -180, speed: 1, xChange: 0, yChange: 0, colour: "#1a8f2d", health: 1, angle: 0
};
let enemy5 = {
    x: 512, y: 50, width: 40, height: 65, direction: 180, speed: -3, xChange: 0, yChange: 0, colour: "#fc0303", health: 20
};
let c1 = {
    x: player.x, y: player.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c2 = {
    x: player.x, y: player.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c3 = {
    x: enemy1.x, y: enemy1.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c4 = {
    x: enemy1.x, y: enemy1.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c5 = {
    x: enemy2.x, y: enemy2.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c6 = {
    x: enemy2.x, y: enemy2.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c7 = {
    x: enemy3.x, y: enemy3.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c8 = {
    x: enemy4.x, y: enemy4.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c9 = {
    x: enemy5.x, y: enemy5.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c10 = {
    x: enemy5.x, y: enemy5.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c11 = {
    x: enemy5.x + 15, y: enemy5.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c12 = {
    x: enemy5.x + 15, y: enemy5.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c13 = {
    x: enemy5.x - 15, y: enemy5.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let c14 = {
    x: enemy5.x - 15, y: enemy5.y, width: 3, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
};
let cannon = {
    x: -20, y: 5, width: 7, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
}
let cannon2 = {
    x: 14, y: 5, width: 7, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
}
let cannon3 = {
    x: -2, y: -24, width: 4, height: 10, direction: 0, speed: 0, xChange: 0, yChange: 0
}
let cannon4 = {
    x: 20, y: -10, width: 7, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
}
let cannon5 = {
    x: -26, y: -10, width: 7, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
}
let cannon6 = {
    x: 20, y: +20, width: 7, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
}
let cannon7 = {
    x: -26, y: +20, width: 7, height: 3, direction: 0, speed: 0, xChange: 0, yChange: 0
}
let sail = {
    x: 0, y: -5, width: 40, height: 4, direction: 0, speed: 0, xChange: 0, yChange: 0
}

let level = 1

let turnLeft = false;
let turnRight = false;
let increaseSpeed = false;
let decreaseSpeed = false;
let shoot = false;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    draw();
}

function draw() {
    window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }

    then = now - (elapsed % fpsInterval);

    //Draw background on canvas

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#87cefa";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Draw player
    createShip(player, player.colour);

    // Handle key presses
    if (player.health > 0) {
        if (decreaseSpeed) {
            if (player.speed <= 3) {
                player.speed = player.speed + 0.1;
            }
        }
        if (increaseSpeed) {
            if (player.speed >= -6) {
                player.speed = player.speed - 0.1;
            }
        }
        if (turnLeft) {
            player.direction = player.direction + 3;
        }
        if (turnRight) {
            player.direction = player.direction - 3;
        }

        if (shoot) {
            playerCannons(c1, c2, player)
        }
    }

    hit(c3, player);
    hit(c4, player);
    hit(c5, player);
    hit(c6, player);
    hit(c7, player);
    hit(c8, player);
    hit(c9, player);
    hit(c10, player);
    hit(c11, player);
    hit(c12, player);
    hit(c13, player);
    hit(c14, player);

    if (c1.speed < 20) {
        c1.x = player.x;
        c1.y = player.y;
        c2.x = player.x;
        c2.y = player.y;
    }

    // Update the player
    directionFormula(player);
    playerHealth(player, c1, c2);
    directionFormula(c1);
    directionFormula(c2);


    // Draw and Update the other objects
    if (level == 1) {
        create(c1);
        create(c2);
        create(c3);
        create(c4);
        createShip(enemy1, enemy1.colour);
        BroadsideMovement(enemy1);
        broadsideHealth(enemy1, c3, c4);
        broadsideCannons(c3, c4, enemy1);
        directionFormula(c3);
        directionFormula(c4);
        if (enemy1.health <= 0) {
            setTimeout(() => {
                level = 2,
                player.x = 512, player.y = 610, player.direction = 359
                enemy3.health = 1, enemy3.x = 254, enemy3.y = 20, enemy3.direction = -180,
                enemy4.health = 1, enemy4.x = 766, enemy4.y = 20, enemy4.direction = -180
            }, 1000);
        }
    }
    if (level == 2) {
        create(c1);
        create(c2);
        create(c7);
        create(c8);
        createShip(enemy3, enemy3.colour);
        createShip(enemy4, enemy4.colour);
        gunboatHealth(enemy3, c7);
        gunboatHealth(enemy4, c8);
        GunboatMovement(enemy3);
        GunboatMovement(enemy4);
        gunboatCannon(c7, enemy3);
        gunboatCannon(c8, enemy4)
        directionFormula(c7);
        directionFormula(c8);
        if (enemy3.health <= 0 && enemy4.health <= 0) {
            setTimeout(() => {
                level = 3,
                enemy5.health = 20, enemy5.x = 512, enemy5.y = 20, enemy5.direction = 180,
                player.x = 512, player.y = 610, player.direction = 0
            }, 1000);
        }
    }
    if (level == 3) {
        create(c1);
        create(c2);
        create(c9);
        create(c10);
        create(c11);
        create(c12);
        create(c13);
        create(c14);
        createShip(enemy5, enemy5.colour);
        galleonMovement(enemy5);
        GalleonHealth(enemy5, c9, c11, c13, c10, c12, c14);
        galleonCannons(c9, c11, c13, c10, c12, c14, enemy5);
        directionFormula(c9);
        directionFormula(c10);
        directionFormula(c11);
        directionFormula(c12);
        directionFormula(c13);
        directionFormula(c14);
        if (enemy5.health <= 0) {
            setTimeout(() => {
                level = 4, enemy1.health = 10, enemy1.x = 412, enemy1.y = 20, enemy1.direction = 180,
                    enemy2.health = 10, enemy2.x = 612, enemy2.y = 20, enemy2.direction = 180,
                    enemy3.health = 1, enemy3.x = 254, enemy3.y = 20, enemy3.direction = -180,
                    enemy4.health = 1, enemy4.x = 766, enemy4.y = 20, enemy4.direction = -180,
                    player.x = 512, player.y = 610, player.direction = 359
            }, 1000);
        }
    }
    if (level == 4) {
        create(c1);
        create(c2);
        create(c3);
        create(c4);
        create(c5);
        create(c6);
        createShip(enemy1, enemy1.colour);
        BroadsideMovement(enemy1);
        broadsideHealth(enemy1, c3, c4);
        broadsideCannons(c3, c4, enemy1);
        directionFormula(c3);
        directionFormula(c4);
        createShip(enemy2, enemy2.colour);
        BroadsideMovement(enemy2);
        broadsideHealth(enemy2, c5, c6);
        broadsideCannons(c5, c6, enemy2);
        directionFormula(c5);
        directionFormula(c6);
        create(c7);
        create(c8);
        createShip(enemy3, enemy3.colour);
        createShip(enemy4, enemy4.colour);
        gunboatHealth(enemy3, c7);
        gunboatHealth(enemy4, c8);
        GunboatMovement(enemy3);
        GunboatMovement(enemy4);
        gunboatCannon(c7, enemy3);
        gunboatCannon(c8, enemy4)
        directionFormula(c7);
        directionFormula(c8);
        if (enemy1.health <= 0 && enemy2.health <= 0 && enemy3.health <= 0 && enemy4.health <= 0) {
            setTimeout(() => {
                level = 5, enemy1.health = 10, enemy1.x = 412, enemy1.y = 20, enemy1.direction = 180,
                    enemy2.health = 10, enemy2.x = 612, enemy2.y = 20, enemy2.direction = 180,
                    enemy3.health = 1, enemy3.x = 254, enemy3.y = 20, enemy3.direction = -180,
                    enemy4.health = 1, enemy4.x = 766, enemy4.y = 20, enemy4.direction = -180,
                    enemy5.health = 20, enemy5.x = 512, enemy5.y = 20, enemy5.direction = 180,
                    player.x = 512, player.y = 610, player.direction = 359
            }, 1000);
        }
    }
    if (level == 5) {
        create(c9);
        create(c10);
        create(c11);
        create(c12);
        create(c13);
        create(c14);
        createShip(enemy5, enemy5.colour);
        galleonMovement(enemy5);
        GalleonHealth(enemy5, c9, c11, c13, c10, c12, c14);
        galleonCannons(c9, c11, c13, c10, c12, c14, enemy5);
        directionFormula(c9);
        directionFormula(c10);
        directionFormula(c11);
        directionFormula(c12);
        directionFormula(c13);
        directionFormula(c14);
        create(c1);
        create(c2);
        create(c3);
        create(c4);
        create(c5);
        create(c6);
        createShip(enemy1, enemy1.colour);
        BroadsideMovement(enemy1);
        broadsideHealth(enemy1, c3, c4);
        broadsideCannons(c3, c4, enemy1);
        directionFormula(c3);
        directionFormula(c4);
        createShip(enemy2, enemy2.colour);
        BroadsideMovement(enemy2);
        broadsideHealth(enemy2, c5, c6);
        broadsideCannons(c5, c6, enemy2);
        directionFormula(c5);
        directionFormula(c6);
        create(c7);
        create(c8);
        createShip(enemy3, enemy3.colour);
        createShip(enemy4, enemy4.colour);
        gunboatHealth(enemy3, c7);
        gunboatHealth(enemy4, c8);
        GunboatMovement(enemy3);
        GunboatMovement(enemy4);
        gunboatCannon(c7, enemy3);
        gunboatCannon(c8, enemy4)
        directionFormula(c7);
        directionFormula(c8);
        if (enemy1.health <= 0 && enemy2.health <= 0 && enemy3.health <= 0 && enemy4.health <= 0 && enemy5.health <= 0) {
            setTimeout(() => {
                level = 6
            }, 1);
        }
    }
    if (level == 6) {
        let element = document.querySelector("h1")
        let newElement = document.createElement("h1")
        element.appendChild(newElement);
        newElement.innerHTML = "Now try the normal mode!"
        setTimeout(() => {
            level = 7
        }, 1);
    }
    if (level == 7) {
        turnLeft = false;
        turnRight = false;
        increaseSpeed = false;
        decreaseSpeed = false;
        player.x = 512;
        player.y = 320;
    }



    // Physics
    Drag(player);

    // Collisions
    // Going off left or right (its a function in the directionFormula and GunboatMovement functions)
}

function Drag(unit) {
    if (unit.speed > 0) {
        unit.speed = unit.speed - 0.005;
    }
    if (unit.speed < 0) {
        unit.speed = unit.speed + 0.005;
    }
}

function hit(projectile, unit) {
    if (projectile.speed > 0) {
        if ((unit.x + unit.width / 2) > projectile.x && projectile.x > (unit.x - unit.width / 2) &&
            (unit.y + unit.height / 2) > projectile.y && projectile.y > (unit.y - unit.height / 2)) {
            unit.health = unit.health - 3
        }
    }
}

function playerHealth(unit, left, right) {
    hit(c3, unit);
    hit(c4, unit);
    hit(c5, unit);
    hit(c6, unit);
    hit(c7, unit);
    hit(c8, unit);
    hit(c9, unit);
    hit(c10, unit);
    hit(c11, unit);
    hit(c12, unit);
    hit(c14, unit);
    hit(c13, unit);
    if (unit.health <= 26) {
        createShip(unit, "#8a701d")
    }
    if (unit.health <= 13) {
        unit.speed = -2
        createShip(unit, "#453c1d")
    }
    if (unit.health <= 0) {
        if (unit.speed > 0) {
            unit.speed = unit.speed - 1;
        }
        if (unit.speed < 0) {
            unit.speed = unit.speed + 1;
        }
        left.speed = 0;
        right.speed = 0;
        createShip(unit, "#3d3d3d")
    }
}
function gunboatHealth(unit, front) {
    hit(c1, unit);
    hit(c2, unit);
    collision(player, unit)
    if (unit.health <= 0) {
        if (unit.speed > 0) {
            unit.speed = unit.speed - 2;
        }
        if (unit.speed < 0) {
            unit.speed = unit.speed + 2;
        }
        front.speed = 0;
        front.speed = 0;
        createShip(unit, "#424242")
    }
}

function broadsideHealth(unit, left, right) {
    hit(c1, unit);
    hit(c2, unit);
    collision(player, unit)
    if (unit.health <= 6) {
        createShip(unit, "#446bab")
    }
    if (unit.health <= 3) {
        unit.speed = -2
        createShip(unit, "#8c6464")
    }

    if (unit.health <= 0) {
        if (unit.speed > 0) {
            unit.speed = unit.speed - 1;
        }
        if (unit.speed < 0) {
            unit.speed = unit.speed + 1;
        }
        left.speed = 0;
        right.speed = 0;
        createShip(unit, "#424242")
    }
}

function GalleonHealth(unit, left1, left2, left3, right1, right2, right3) {
    hit(c1, unit);
    hit(c2, unit);
    collision(player, unit)
    if (unit.health <= 12) {
        createShip(unit, "#bf4747")
    }
    if (unit.health <= 6) {
        unit.speed = -2
        createShip(unit, "#8c6464")
    }

    if (unit.health <= 0) {
        if (unit.speed > 0) {
            unit.speed = unit.speed - 1;
        }
        if (unit.speed < 0) {
            unit.speed = unit.speed + 1;
        }
        left1.speed = 0;
        left2.speed = 0
        left3.speed = 0
        right1.speed = 0;
        right2.speed = 0;
        right3.speed = 0;
        createShip(unit, "#424242")
    }
}

function collision(unit, unit2) {
    if (unit.health > 0 && unit2.health > 0 && unit.x - unit2.x < unit2.width && unit.x - unit2.x > -unit2.width && unit.y - unit2.y < unit2.width && unit.y - unit2.y > -unit2.width) {
        unit.direction += 180;
        if (unit2.height < 60) {
            unit2.direction += 180;
            unit.health -= 1;
            unit2.health -= 1;
        } else {
            unit.health -= 2;
        }
    }
}

function directionFormula(unit) {
    unit.xChange = unit.speed * Math.sin((unit.direction / 180 * Math.PI));// i used chatGPT to get this formula.
    unit.yChange = unit.speed * Math.cos((unit.direction / 180 * Math.PI));;// and this one
    unit.x = unit.x + unit.xChange;
    unit.y = unit.y + unit.yChange;
    if (unit.direction >= 360) {
        unit.direction = 0;
    }
    if (unit.x < 10 && unit.direction < 180) {
        unit.direction = 270;
    }
    if (unit.x > 1014) {
        unit.direction = 90;
    }
    if (unit.y < 10 && (unit.direction > 270 || unit.direction < 90)) {
        unit.direction = 180
    } else if (unit.y > 620 && (unit.direction < 270 || unit.direction > 90)) {
        unit.direction = 0
    }
}

function create(unit) {
    context.fillStyle = "black";
    context.fillRect(unit.x, unit.y, unit.width, unit.height);
}

function createShip(unit, colour) {
    context.save()
    context.translate(unit.x, unit.y);
    context.rotate(-(unit.direction * Math.PI / 180))
    context.fillStyle = colour;
    context.fillRect(-unit.width / 2, -unit.height / 2, unit.width, unit.height);
    cannon.x = unit.width / 2
    cannon2.x = -unit.width / 2 - 5
    if (unit.width == 32) {
        create(cannon);
        create(cannon2);
    }
    if (unit.width == 21) {
        create(cannon3);
    }
    if (unit.height == 65) {
        create(cannon);
        create(cannon2);
        create(cannon4);
        create(cannon5);
        create(cannon6);
        create(cannon7);
    }
    context.fillRect(-2, -2, 4, 4)
    context.fillStyle = "white"
    context.fillRect(-unit.width / 2 - 3, sail.y, unit.width + 6, sail.height)
    if (unit.height == 65) {

        context.fillRect(-unit.width / 2 - 3, sail.y, unit.width + 6, sail.height)
    }
    context.restore();
}

function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        turnLeft = true;
    } else if (key === "ArrowUp") {
        increaseSpeed = true;
    } else if (key === "ArrowDown") {
        decreaseSpeed = true;
    } else if (key === "ArrowRight") {
        turnRight = true;
    } else if (key === " ") {
        shoot = true;
    }
}

function GunboatMovement(unit) {
    if (unit.health > 0) {
        unit.speed = 2
        if (unit.x < 10 && unit.direction < 180) {
            unit.direction = unit.direction - 18
        } else if (unit.x > 1024 && unit.direction < 180) {
            unit.direction = unit.direction - 18
        }
        if (unit.y < 10 && (unit.direction > 270 || unit.direction < 90)) {
            unit.direction = unit.direction - 18
        } else if (unit.y > 620 && (unit.direction < 270 || unit.direction > 90)) {
            unit.direction = unit.direction - 18
        } else {
            if (player.x > unit.x) {
                unit.xChange = ((player.x - unit.x) / 300 * unit.speed)
            } else if (player.x < unit.x) {
                unit.xChange = (-(unit.x - player.x) / 300 * unit.speed)
            }
            if (player.y > unit.y) {
                unit.yChange = ((player.y - unit.y) / 300 * unit.speed)
            } else if (player.y < unit.y) {
                unit.yChange = (-(unit.y - player.y) / 300 * unit.speed)
            }
            unit.angle = ((Math.atan2(unit.yChange, unit.xChange) * -180) / Math.PI) - 90;
            if (unit.direction > unit.angle) {
                unit.direction -= 1
            }
            if (unit.direction < unit.angle) {
                unit.direction += 1
            }
            if (unit.angle > 20) {
                unit.direction = unit.angle
            }
        }
    }
    unit.x = unit.x + unit.xChange;
    unit.y = unit.y + unit.yChange;
    if (unit.direction >= 720) {
        unit.direction = 0;
    }
}
function BroadsideMovement(unit) {
    if (unit.health > 0) {
        directionFormula(unit)
        unit.speed = -4
        if (player.direction >= unit.direction) {
            unit.direction = unit.direction + 2;
        } else if (player.direction <= unit.direction) {
            unit.direction = unit.direction - 2;
        }
    }
}

function galleonMovement(unit) {
    if (unit.health > 0) {
        directionFormula(unit)
        unit.speed = -3
        if (player.direction >= unit.direction) {
            unit.direction = unit.direction + 1;
        } else if (player.direction <= unit.direction) {
            unit.direction = unit.direction - 1;
        }
    }
}

function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        turnLeft = false;
    } else if (key === "ArrowUp") {
        increaseSpeed = false;
    } else if (key === "ArrowDown") {
        decreaseSpeed = false;
    } else if (key === "ArrowRight") {
        turnRight = false;
    } else if (key === " ") {
        shoot = false;
    }
}

function playerCannons(left, right, unit) {
    if (left.speed < 20) {
        left.speed = 21;
        left.direction = unit.direction + 90;
        setTimeout(() => { left.speed = 0, left.x = unit.x, left.y = unit.y }, 2500);
        right.speed = 21;
        right.direction = unit.direction - 90
        setTimeout(() => { right.speed = 0, right.x = unit.x, right.y = unit.y }, 2500);
    }
}

function gunboatCannon(front, unit) {
    if (unit.health > 0) {
        if (front.speed < 20) {
            front.speed = 21;
            front.direction = unit.direction - 180;
            setTimeout(() => { front.speed = 0, front.x = unit.x, front.y = unit.y }, 1000);
        }
    }
}
function broadsideCannons(left, right, unit) {
    if (unit.health > 0) {
        if (left.speed < 20) {
            left.speed = 21;
            left.direction = unit.direction + 90;
            setTimeout(() => { left.speed = 0, left.x = unit.x, left.y = unit.y }, 1000);
            right.speed = 21;
            right.direction = unit.direction - 90
            setTimeout(() => { right.speed = 0, right.x = unit.x, right.y = unit.y }, 1000);
        }
    }
}
function galleonCannons(left1, left2, left3, right1, right2, right3, unit) {
    if (unit.health > 0) {
        if (left1.speed < 20) {
            left1.speed = 21;
            left1.direction = unit.direction + 90;
            setTimeout(() => { left1.speed = 0, left1.x = unit.x, left1.y = unit.y }, 1000);
            right1.speed = 21;
            right1.direction = unit.direction - 90
            setTimeout(() => { right1.speed = 0, right1.x = unit.x, right1.y = unit.y }, 1000);
            left2.speed = 21;
            left2.direction = unit.direction + 90;
            setTimeout(() => { left2.speed = 0, left2.x = unit.x, left2.y = unit.y + 15 }, 1000);
            right2.speed = 21;
            right2.direction = unit.direction - 90
            setTimeout(() => { right2.speed = 0, right2.x = unit.x, right2.y = unit.y + 15 }, 1000);
            left3.speed = 21;
            left3.direction = unit.direction + 90;
            setTimeout(() => { left3.speed = 0, left3.x = unit.x, left3.y = unit.y - 15 }, 1000);
            right3.speed = 21;
            right3.direction = unit.direction - 90
            setTimeout(() => { right3.speed = 0, right3.x = unit.x, right3.y = unit.y - 15 }, 1000);
        }
    }
}


function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function () {
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            console.log("img");
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement) {
            console.log("audio");
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url;
    }
}
function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
