
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
        
        // our two characters
        this.load.spritesheet('player', 'img/Personagem.png', { frameWidth: 16, frameHeight: 32 });

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
        var fundoLayer = map.createStaticLayer('background', tiles, 0, 0);
        var objLayer = map.createStaticLayer('collidables', tiles, 0, 0);
        
        
        
        
        
        
        //--------------------NAVMESH ------------------
        const objectLayer = map.getObjectLayer("navmesh");
        navMesh = this.navMeshPlugin.buildMeshFromTiled( "mesh",objectLayer,16);//criar uma camada navmesh no nosso projeto
        
        navMesh.enableDebug();
        navMesh.debugDrawMesh({
        drawCentroid: false, drawBounds: false,
         drawNeighbors: false, drawPortals: false,
    });
        
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
        
        this.player = this.physics.add.sprite(50, 100, 'player', 0);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);//editar para ficar no tamanho de um quarto apenas-- kiyoshi
        //movimentação Personagem
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //this.cameras.main.setZoom(1);
        
        
        this.cameras.main.startFollow(this.player);
        //this.cameras.main.roundPixels = true;
        //ANIM
         this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [12,13,14,15]}),
            frameRate: 10,
            repeat: -1
        });
        
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [4,5,6,7] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [8,9,10,11]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0,1,2,3 ] }),
            frameRate: 10,
            repeat: -1
        });
        
    this.physics.add.collider(this.player, this.objLayer);
        
        
        
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
    const p1 = new Phaser.Geom. Point(trueX, trueY);
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
        this.player.body.setVelocity(0);
 
        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-150);
             this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(150);
            this.player.anims.play('right', true);
        }
 
        // Vertical movement
        else if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-150);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(150);
            this.player.anims.play('down', true);
        } 
        
        //segue
        this.gotoXY(this.player.x+this.player.body.width /
        2 + this.player.body.offset.x - 32, this.player.y+this.player.body.height /
        2 + this.player.body.offset.y + 16, navMesh);
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