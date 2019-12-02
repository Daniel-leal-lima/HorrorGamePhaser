/**
 * Class representing the player.
 * @extends Phaser.GameObjects.Sprite
 */
class Player extends Phaser.GameObjects.Sprite {

    /**
     * Create the player.
     * @param {object} scene - scene creating the player.
     * @param {number} x - Start location x value.
     * @param {number} y - Start location y value.
     * @param {number} [frame] -
     */
    constructor(scene, x, y, frame) {
        super(scene, x, y, frame);

        this.scene = scene;
        this.currentRoom = 1;       // Set start room so room change flag doens't fire.
        this.previousRoom = null;
        this.roomChange = false;
        this.canMove = true;

        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setTexture('player');
        this.setPosition(x, y);
        
        this.setOrigin(0);
        this.body.setCollideWorldBounds(true);
        this.body.setOffset(11.5, 23);
        this.body.width=8;
        this.body.height=8;
        console.log(this.body);
        //this.keys = scene.input.keyboard.addKeys('W,S,A,D,UP,LEFT,RIGHT,DOWN,SPACE');
        this.Key_W = scene.input.keyboard.addKey('W');
        this.Key_S = scene.input.keyboard.addKey('S');
        this.Key_A = scene.input.keyboard.addKey('A');
        this.Key_D = scene.input.keyboard.addKey('D');
        this.Key_UP = scene.input.keyboard.addKey('UP');
        this.Key_LEFT = scene.input.keyboard.addKey('LEFT');
        this.Key_RIGHT = scene.input.keyboard.addKey('RIGHT');
        this.Key_DOWN = scene.input.keyboard.addKey('DOWN');

        this.lastAnim = null;
        this.vel = 90;
        this.onStairs = false;
        this.onPoit = false;
        this.Localiza_porta = 0;
        this.tilecamada;
        this.tilebloco;
        this.mapa;
        this.Porta_aberta = false;
        this.LeftPorta = false;
        this.direction = 'down';

        config = {
            key: 'stand-down',
            frames: scene.anims.generateFrameNumbers('player', { frames: [6,7,8]}),
            frameRate: 3,
            repeat: -1
        };
        scene.anims.create(config);

        config = {
            key: 'stand-right',
            frames: scene.anims.generateFrameNumbers('player', { frames: [0,1]}),
            frameRate: 3,
            repeat: -1
        };
        scene.anims.create(config);

        config = {
            key: 'stand-up',
            frames: scene.anims.generateFrameNumbers('player', { frames: [13,14]}),
            frameRate: 3,
            repeat: -1
        };
        scene.anims.create(config);

        config = {
            key: 'stand-left',
            frames: scene.anims.generateFrameNumbers('player', { frames: [23,24]}),
            frameRate: 3,
            repeat: -1
        };
        scene.anims.create(config);
        
        var config = {
            key: 'walk-down',
            frames: scene.anims.generateFrameNumbers('player', { frames: [9,10,11,12]}),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);

        var config = {
            key: 'walk-right',
            frames: scene.anims.generateFrameNumbers('player', { frames: [2,3,4,5] }),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);

        var config = {
            key: 'walk-up',
            frames: scene.anims.generateFrameNumbers('player', { frames: [15,16,17,18]}),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);
        
        var config = {
            key: 'walk-left',
            frames: scene.anims.generateFrameNumbers('player', { frames: [19,20,21,22]}),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);
        
        this.sprite1 = this.scene.add.image(this.x, this.y - 10, 'ab');
        this.sprite1.setVisible(false);
        
        scene.events.on('resume', function () {
            this.reseta_Pause();
        },this);
        
        this.aperta=false;
        this.keyObj0 = scene.input.keyboard.addKey('E');
        this.keyObj0.on('down', function(event){
            if(this.onPoit){
             this.aperta=true;
            }
        },this);
        
    }

    /**
     * Called before Update.
     * @param {object} time
     * @param {number} delta
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
            
        this.sprite1.x = this.x + 4.5;
        this.sprite1.y = this.y - 10;
    
        // movement and animation
        this.body.setVelocity(0);
        let animationName = null;

        // standing
        let currentDirection = this.direction;
        //if (this.direction === 'left') { currentDirection = 'left'; } //account for flipped sprite
        animationName = 'stand-' + currentDirection;
        
        // all the ways the player can move.
        let left  = this.Key_A.isDown || this.Key_LEFT.isDown  || this.scene.gamepad && this.scene.gamepad.left;
        let right = this.Key_D.isDown || this.Key_RIGHT.isDown || this.scene.gamepad && this.scene.gamepad.right;
        let up    = this.Key_W.isDown || this.Key_UP.isDown    || this.scene.gamepad && this.scene.gamepad.up;
        let down  = this.Key_S.isDown || this.Key_DOWN.isDown  || this.scene.gamepad && this.scene.gamepad.down;

        if (this.canMove) {
            // moving
            if (left) {
                this.direction = 'left';
                this.body.setVelocityX(-this.vel);
                animationName = "walk-left";
                //this.setFlipX(true);
            } else if (right) {
                this.direction = 'right';
                this.body.setVelocityX(this.vel);
                animationName = "walk-right";
                //this.setFlipX(false);
            }

            else if (up) {
                this.direction = 'up';
                this.body.setVelocityY(-this.vel);
                animationName = 'walk-up';
            } else if (down) {
                this.direction = 'down';
                this.body.setVelocityY(this.vel);
                animationName = 'walk-down';
            }

            if(this.lastAnim !== animationName) {
                this.lastAnim = animationName;
                this.anims.play(animationName, true);
            }
        } else{
            if (left) {
                this.direction = 'left';
                this.body.setVelocityX(-this.vel);
                animationName = "walk-left";
                //this.setFlipX(true);
            } else if (right) {
                this.direction = 'right';
                this.body.setVelocityX(this.vel);
                animationName = "walk-right";
                //this.setFlipX(false);
            }

            else if (up) {
                this.direction = 'up';
                this.body.setVelocityY(-this.vel);
                animationName = 'walk-up';
            } else if (down) {
                this.direction = 'down';
                this.body.setVelocityY(this.vel);
                animationName = 'walk-down';
            }
            if(this.lastAnim !== animationName) {
                this.lastAnim = animationName;
                this.anims.play(animationName, true);
        }
        }
        // Stairs
        if (this.onStairs) {
            this.vel = 50;
            this.onStairs = false;
        } else {
            this.vel = 150;
        }
        
        // Ponto de interesse
        if (this.onPoit) {
            this.sprite1.setVisible(true);
            
            if((this.LeftPorta)&&(this.aperta)){
                this.aperta=false;
                
                switch(this.Localiza_porta){
                    case 1:
                        this.mapa.putTileAt(1537, 31, 22,false ,this.tilecamada);
                        this.mapa.putTileAt(1538, 32, 22,false ,this.tilecamada);
                        break;
                    case 2:
                        this.mapa.putTileAt(1541, 13, 26,false ,this.tilecamada);
                        this.mapa.putTileAt(1542, 14, 26,false ,this.tilecamada);
                        break;
                }
                this.Porta_aberta = true;
               console.log('Interação Funcionando');
               }
            this.onPoit = false;
        } else {
            this.aperta=false;
            //sumir com o sprite
           this.sprite1.setVisible(false);
        }

        // diagnoal movement
        this.body.velocity.normalize().scale(this.vel);

        // Check for room change.
        this.getRoom();
    }

    /** Returns player's current and previous room, flags rooms player has entered. */
    getRoom() {

        // place holder for current room.
        let roomNumber;

        // loop through rooms in this level.
        for (let room in this.scene.rooms) {
            let roomLeft   = this.scene.rooms[room].x;
            let roomRight  = this.scene.rooms[room].x + this.scene.rooms[room].width;
            let roomTop    = this.scene.rooms[room].y;
            let roomBottom = this.scene.rooms[room].y + this.scene.rooms[room].height;

            // Player is within the boundaries of this room.
            if (this.x > roomLeft && this.x < roomRight &&
                this.y > roomTop  && this.y < roomBottom) {

                roomNumber = room;

                // Set this room as visited by player.
                this.visited = this.scene.rooms[room].properties.find(function(property) {
                    return property.name === 'visited';
                } );

                this.visited.value = true
            }
        }

        // Update player room variables.
        if (roomNumber != this.currentRoom) {
            this.previousRoom = this.currentRoom;
            this.currentRoom = roomNumber;
            this.roomChange = true;
        } else {
            this.roomChange = false;
        }
    }
    reseta_Pause(){
           this.Key_W.reset();
           this.Key_UP.reset();
        
           this.Key_S.reset();
           this.Key_DOWN.reset();
           
           this.Key_A.reset();
           this.Key_LEFT.reset();
           
           this.Key_D.reset();
           this.Key_RIGHT.reset();
        
    }
}
