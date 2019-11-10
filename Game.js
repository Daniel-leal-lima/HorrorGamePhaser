var Player = new Phaser.Class({
   extends: Phaser.GameObjects.Sprite,
    initialize:
    
    function constructor(scene,x,y,frame){
        super:function(scene, x, y, frame){}
        this.scene = scene;
        this.currentRoom = 1;       // Set start room so room change flag doens't fire.
        this.previousRoom = null;
        this.roomChange = false;
        this.canMove = true;

        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setTexture('player');
        this.setPosition(x, y);

        this.body.setCollideWorldBounds(true);
        this.body.setOffset(7, 16);
        this.body.setCircle(3);

        this.keys = scene.input.keyboard.addKeys('W,S,A,D,UP,LEFT,RIGHT,DOWN,SPACE');

        this.lastAnim = null;
        this.vel = 100;
        this.onStairs = false;
        this.direction = 'down';

        config = {
            key: 'stand-down',
            frames: scene.anims.generateFrameNumbers('player', {start: 0, end: 0}),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);

        config = {
            key: 'stand-right',
            frames: scene.anims.generateFrameNumbers('player', {start: 4, end: 4}),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);

        config = {
            key: 'stand-up',
            frames: scene.anims.generateFrameNumbers('player', {start: 8, end: 8}),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);


        var config = {
            key: 'walk-down',
            frames: scene.anims.generateFrameNumbers('player', {start: 0, end: 3}),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);

        var config = {
            key: 'walk-right',
            frames: scene.anims.generateFrameNumbers('player', {start: 4, end: 7}),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);

        var config = {
            key: 'walk-up',
            frames: scene.anims.generateFrameNumbers('player', {start: 8, end: 11}),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);

    },
    preUpdate(time, delta):function{
    super.preUpdate(time, delta);

        // movement and animation
        this.body.setVelocity(0);
        let animationName = null;

        // standing
        let currentDirection = this.direction;
        if (this.direction === 'left') { currentDirection = 'right'; } //account for flipped sprite
        animationName ﻿= 'stand-' + currentDirection;

        // all the ways the player can move.
        let left  = this.keys.A.isDown || this.keys.LEFT.isDown  || this.scene.gamepad && this.scene.gamepad.left;
        let right = this.keys.D.isDown || this.keys.RIGHT.isDown || this.scene.gamepad && this.scene.gamepad.right;
        let up    = this.keys.W.isDown || this.keys.UP.isDown    || this.scene.gamepad && this.scene.gamepad.up;
        let down  = this.keys.S.isDown || this.keys.DOWN.isDown  || this.scene.gamepad && this.scene.gamepad.down;

        if (this.canMove) {
            // moving
            if (left) {
                this.direction = 'left';
                this.body.setVelocityX(-this.vel);
                animationName = "walk-right";
                this.setFlipX(true);
            } else if (right) {
                this.direction = 'right';
                this.body.setVelocityX(this.vel);
                animationName = "walk-right";
                this.setFlipX(false);
            }

            if (up) {
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
            this.vel = 200;
        }

        // diagnoal movement
        this.body.velocity.normalize().scale(this.vel);

        // Check for room change.
        this.getRoom();
}
getRoom:function(){
    
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
                let visited = this.scene.rooms[room].properties.find(function(property) {
                    return property.name === 'visited';
                } );

                visited.value = true
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
    
});
var BootScene = new Phaser.Class({
 
    Extends: Phaser.Scene,
 
    initialize:
 
    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },
 
    preload: function ()
    {
        // load the resources here
         this.load.image('tiles', 'map/tmw_desert_spacing.png');
        
        // map in json format
        this.load.tilemapTiledJSON("desert", "map/desert.json");
        this.load.image('mask', 'img/mask1.png');
        // our two characters
        this.load.spritesheet('player', 'img/Personagem.png', { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('principal', 'img/Player.png', { frameWidth: 40, frameHeight: 40 });

    },
 
    create: function ()
    {
        this.scene.start('WorldScene');
    }
});
 
var WorldScene = new Phaser.Class({
 
    Extends: Phaser.Scene,
 
    initialize:
 
    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },
    preload: function ()
    {
        
    },
    create: function ()
    {
        // create your world here
        var map = this.make.tilemap({ key: 'desert' });
        var tiles = map.addTilesetImage('Desert', 'tiles');
        var tiles = map.addTilesetImage('Desert', 'tiles');
        var fundoLayer = map.createStaticLayer('background', tiles, 0, 0);
        var objLayer = map.createStaticLayer('collidables', tiles, 0, 0);
         spotlight = this.make.sprite({
        x: 300,
        y: 225,
        scale: 3,
        key: 'mask',
        add: false});
        var mask = spotlight.createBitmapMask();
        //fundoLayer.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);
        //objLayer.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);
                
        //--------------------NAVMESH ------------------
        const objectLayer = map.getObjectLayer("navmesh");
        navMesh = this.navMeshPlugin.buildMeshFromTiled( "mesh",objectLayer,16);//criar uma camada navmesh no nosso projeto
        
        navMesh.enableDebug();
//        navMesh.debugDrawMesh({
//        drawCentroid: false, drawBounds: false,
//         drawNeighbors: false, drawPortals: false,
//    });
        
        //mov inimigo
        let h;
        let w;
        let offx;
        let offy;
        DIRECTIONS = ['up', 'right', 'down', 'left'];
        speed = 90;
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        //this.physics.world.setBounds(0,0 , map.widthInPixels, map.heightInPixels);
        //add inimigo----------------------------
        inimigo = this.physics.add.sprite(50, 10, 'player', 0);
        inimigo.tint=0x000000;
        
        //------------------------------------------
        
        player = this.physics.add.sprite(400, 100, 'principal', 0);
        
        //apenas-- kiyoshi
        //movimentação Personagem
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //this.cameras.main.setZoom(2);
        this.cameras.main.setMask(mask);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);//editar para ficar no tamanho de um quarto 
         this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(2);
        //this.cameras.main.startFollow(player);
        //this.cameras.main.roundPixels = true;
        
        //ANIM
        
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('principal', { frames: [1,9,17,25] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('principal', { frames: [7,15,23,31]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('principal', { frames: [4,12,20,28  ] }),
            frameRate: 10,
            repeat: -1
        });
        
    this.physics.add.collider(player, this.objLayer);
        
       
        
        
    },
     findPath : function(start, finish) {
    navMesh.debugClear(); // Clears the overlay       
    navMesh.findPath(start, finish, {
        drawPolyPath: false, drawFinalPath: true,
    });
    let path = this.navMesh.findPath(start, finish);
    return path;
    },
    gotoXY : function(x, y, navMesh) {
    const p2 = new Phaser.Geom.Point(x, y);
    // the entities location, respective to the center of its hit box
    const trueX = inimigo.x+inimigo.body.width /
    2 + inimigo.body.offset.x;
    const trueY = inimigo.y+inimigo.body.height /
          2 + inimigo.body.offset.y;
    const p1 = new Phaser.Geom.Point(trueX, trueY);
    // cool library magic
    const path = navMesh.findPath(p1, p2);
    /* 0. up
    *  1. right
    *  2. down
    *  3. left
    */
    if (path) {
        // confusing code
        Math.abs(path[1].x - trueX) >= Math.abs(path[1].y - trueY) ?
         this.moveInDirection(((path[1].x - trueX < 0)*2)+1, false) :
          this.moveInDirection((path[1].y - trueY > 0)*2, false);
    }
},
    moveInDirection : function(direction, sprint) {
        let dir = '';
        if (_.isString(direction) && _.includes(DIRECTIONS, direction)) {
            dir = direction.toLowerCase();
 } else if (_.isNumber(direction) && _.inRange(direction, 0, 4)) {
            dir = DIRECTIONS[direction];
        } else {
            console.log(direction);
            console.error('Invalid direction');
            return;
        }
        switch (dir) {
            case 'up':
                inimigo.body.velocity.y = -speed;
                inimigo.body.velocity.x = 0;
                inimigo.direction = 'up';
                break;
            case 'down':
                inimigo.body.velocity.y = speed;
                inimigo.body.velocity.x = 0;
                inimigo.direction = 'down';
                break;
            case 'right':
                inimigo.body.velocity.x = speed;
                inimigo.body.velocity.y = 0;
                inimigo.direction = 'right';
                break;
            case 'left':
                inimigo.body.velocity.x = -speed;
                inimigo.body.velocity.y = 0;
                inimigo.direction = 'left';
                break;
            default:
                console.error('Invalid direction');
                return;
        }
        //this.animations.play('walk_' + dir, animSpeed, true);
        //this.adjustHitbox('walk');
},
    update:function(){
        
       //console.log('PLayer :' + player.x + "/ " + player.y);
        //console.log('Mask :' + spotlight.x + "/ " + spotlight.y);
        player.body.setVelocity(0);
 
        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            player.body.setVelocityX(-150);
             player.anims.play('right', true);
            player.setFlipX(true);
            
        }
        else if (this.cursors.right.isDown)
        {
            player.body.setVelocityX(150);
            player.anims.play('right', true);
            player.setFlipX(false);
        }
 
        // Vertical movement
        else if (this.cursors.up.isDown)
        {
            player.body.setVelocityY(-150);
            player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            player.body.setVelocityY(150);
            player.anims.play('down', true);
        } 
        
        //segue
        this.gotoXY(player.x+player.body.width /
        2 + player.body.offset.x - 32, player.y+player.body.height /
        2 + player.body.offset.y + 16, navMesh);
        
        
    }
});
 
var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 450,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    plugins: {
    scene: [
      {
        key: "PhaserNavMeshPlugin", // Key to store the plugin class under in cache
        plugin: PhaserNavMeshPlugin, // Class that constructs plugins
        mapping: "navMeshPlugin", // Property mapping to use for the scene, e.g. this.navMeshPlugin
        start: true
      }
    ]
  },
    scene: [
        BootScene,
        WorldScene
    ]
};
var game = new Phaser.Game(config);