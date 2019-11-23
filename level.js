/**
 * Class representing a level (https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html)
 * @extends Phaser.Scene
 */
class Jogo extends Phaser.Scene {

    /** Create the level. */
    constructor() {
        super({key: 'jogo'});
    }

    /** Load assets. */
    preload() {

        // Player sprite.
        this.load.spritesheet({
            key: 'player',
            url: "img/Player.png",
            frameConfig: {frameWidth: 40,  //The width of the frame in pixels.
                          frameHeight: 40, //The height of the frame in pixels. Uses the frameWidth value if not provided.
                          startFrame: 0,   //The first frame to start parsing from.
                          endFrame: 40,    //The frame to stop parsing at. If not provided it will calculate the value based on the image and frame dimensions.
                          margin: 0,       //The margin in the image. This is the space around the edge of the frames.
                          spacing: 0}      //The spacing between each frame in the image.
        });
        // Level tiles and data.
        this.load.image("tile1", "map/Tile1.png");
        this.load.image("tile2", "map/floor.png");
        this.load.image("tile3", "map/base_out_atlas.png");
        this.load.tilemapTiledJSON("level-1", "map/mapa32.json");
        this.load.image('mask', 'img/mask1.png');
        this.load.image('ab', 'img/ab.png');
        this.load.image("HUD", "img/inventario.png");

    }

    /** Setup level. */
    create() {
       
        // Make map of level 1.
        this.map = this.make.tilemap({key: "level-1"});

        // Define tiles used in map.
        const tileset1 = this.map.addTilesetImage("Tile1", "tile1"); 
        const tileset2 = this.map.addTilesetImage("floor", "tile2"); 
        const tileset3 = this.map.addTilesetImage("base_out_atlas", "tile3"); 
        
        // The map layers.
        this.floorLayer = this.map.createStaticLayer("chao", [tileset1,tileset2,tileset3]);
        this.wallsLayer = this.map.createStaticLayer("grama", [tileset1,tileset2,tileset3]);
        this.aboveLayer = this.map.createStaticLayer("muros e paredes", [tileset1,tileset2,tileset3]);
        this.colisao = this.map.createDynamicLayer("colisao", [tileset1,tileset2,tileset3]);
        
        
        
        
        
         const objectLayer = this.map.getObjectLayer("navmesh");
         this.navMesh = this.navMeshPlugin.buildMeshFromTiled( "mesh",objectLayer,16);//criar uma camada navmesh no nosso projeto
        
        //this.navMesh.enableDebug();
       /* this.navMesh.debugDrawMesh({
        drawCentroid: false, drawBounds: false,
         drawNeighbors: false, drawPortals: false,
    });*/
        
        
        
        

        // Set physics boundaries from map width and height.
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Collisions based on layer.
        //this.aboveLayer.setCollisionByProperty({collides: true});
        this.colisao.setCollisionBetween(0, 700); 

        // Set the above player layer higher than everything else.
        //this.aboveLayer.setDepth(10);

        // Setup things in this level.
        this.rooms = [];
        this.stairs = this.physics.add.group();
        this.poit = this.physics.add.group();//ponto de interesse.
        this.warp = this.physics.add.group({
                width:400
        });
        this.testePorta = false;
        // Loop through all the objects.
        this.map.findObject('Objects', function(object) {

            // rooms
            if (object.type === 'Room') {
                this.rooms.push(object);
            }
            
            //items
            if (object.type === 'item') {
            this.item = new Item(this, object.x, object.y);
            }

            // stairs
            //if (object.name === 'Stairs') {
            //    this.stairs.add(new Phaser.GameObjects.Sprite(this, object.x, object.y));
            //}
            
            
            
            //poit
            if (object.type === 'poit') {
                this.poit.add(new Phaser.GameObjects.Sprite(this, object.x, object.y));
                if(object.name === 'doo'){
                    this.testePorta = true;
                }
            }
            
            if (object.type === 'collision') {
                this.warp.add(this.plop= new Phaser.GameObjects.Sprite(this, object.x, object.y));
                //Forma de arrumar a colisão do item
                this.plop.body.immovable = true;   
                this.plop.setOrigin(0);
                this.plop.body.height = object.height;
                this.plop.body.width = object.width;
                console.log(this.plop);
                
            }
            
            
            // spawn points
            if (object.type === 'Spawn') {
                if (object.name === 'Player') {
                    this.player = new Player(this, object.x, object.y);
                }
            }
            if (object.type === 'EnemySpawn') {
                if (object.name === 'Enemy') {
                    this.inimigo = new Enemy(this, object.x, object.y);
                }
            }

        }, this);

        // Add collisions.
        this.physics.add.collider(this.player,  this.colisao);
        this.physics.add.collider(this.player, this.objLayer);//desnecessário???
        
        this.physics.add.collider(this.player,  this.warp);
        
        this.physics.add.overlap(this.player,   this.poit, function(){
            this.player.onPoit = true;
            if(this.testePorta==true){
                this.player.LeftPorta=true;
                this.player.tilecamada = this.colisao;
                this.player.mapa = this.map;
                this.player.tilebloco = this.map.getTileAt(27, 35, false, this.colisao);
            }
        
    
        } , null, this);

        // start camera
        this.cameras.main.setZoom(2);

        // Set first room boundaries.
        this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
                                    this.rooms[this.player.currentRoom].y,
                                    this.rooms[this.player.currentRoom].width,
                                    this.rooms[this.player.currentRoom].height,
                                    true);

        this.cameras.main.startFollow(this.player);

        this.cameras.main.fadeIn(2000, 0, 0, 0);


        // Listener for gamepad detection.
        this.input.gamepad.once('down', function (pad, button, index) {
            this.gamepad = pad;
        }, this);
        var spotlight = this.make.sprite({
        x: 300,
        y: 180,
        scale: 3,
        key: 'mask',
        add: false});
        var mask = spotlight.createBitmapMask();
        this.cameras.main.setMask(mask);
       
        let h;
        let w;
        let offx;
        let offy;
        this.DIRECTIONS = ['up', 'right', 'down', 'left'];
        this.speed = 90;
        
        //this.ado = this.input.keyboard.addKeys('P,I');
        this.pausado = false;
        this.keyObj1 = this.input.keyboard.addKey('x');
        
        
        this.keyObj1.on('down', function(event){//Comando para teste
             //console.log(this.map.getTileAt(26, 45, false, this.colisao));
            //this.player.setPosition( [x] [, y] [, z] [, w])
             this.player.x= 512;
             this.player.y= 1152;
            
            this.tileColor = null;
            this.colldingTileColor = new Phaser.Display.Color(243, 134, 48, 200);
            this.faceColor = null;
            this.debugGraphics = this.add.graphics();
            this.map.renderDebug(this.debugGraphics, {
        tileColor: this.tileColor,                   // Non-colliding tiles
        collidingTileColor: this.colldingTileColor,  // Colliding tiles
        faceColor: this.faceColor                   // Interesting faces, i.e. colliding edges
    });
        },this);
        
        
        
        this.keyObj = this.input.keyboard.addKey('P');
        this.keyObj.on('down', function(event){
             this.scene.launch('pause');
            this.scene.pause();
        },this);
        this.events.on('resume', function () {
        },this);
        
        let image = this.make.sprite({
        x: 300,
        y: 190,
        scale: .4,
        key: 'HUD'}).setScrollFactor(0);
        image.setAlpha(.3);
        
    }

    /** Update called every tick. */
    update(time, delta) {
        /* Potential Phaser 3 bug: fade effects seem to be limited by the camera width and height
        (I'm gussing that is what _ch and _cw variabels are), these look like they are set by the
        game config width and height instead of the camera boundaries. I'm setting them to match the
        level so fade effects cover everwhere the camerea could possibly be. Moved from create so
        fade works after screen resize.
        Weird side note: with arcade physics debug on this doesn't seem to be a problem. */
        this.cameras.main._ch = this.map.heightInPixels;
        this.cameras.main._cw = this.map.widthInPixels;

        // On player room change, stop player movement, fade camerea, and set boundaries.
        if (this.player.roomChange) {

            this.cameras.main.fadeOut(250, 0, 0, 0, function(camera, progress) {
                this.player.canMove = false;
                if (progress === 1) {
                    // Change camera boundaries when fade out complete.
                    this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
                                                this.rooms[this.player.currentRoom].y,
                                                this.rooms[this.player.currentRoom].width,
                                                this.rooms[this.player.currentRoom].height,
                                                true);

                    // Fade back in with new boundareis.
                    this.cameras.main.fadeIn(500, 0, 0, 0, function(camera, progress) {
                        if (progress === 1) {
                            this.player.canMove = true;
                            this.roomStart(this.player.currentRoom);
                        }
                    }, this);
                }
            }, this);
        }
        this.gotoXY(this.player.x+this.player.body.width /
        2 + this.player.body.offset.x, this.player.y+this.player.body.height /
        2 + this.player.body.offset.y, this.navMesh);
    }

    roomStart(roomNumber) {
        if (roomNumber == 4) {
            this.cameras.main.shake(2500, 0.001, true);
        }
    }
     findPath(start, finish) {
    navMesh.debugClear(); // Clears the overlay       
    navMesh.findPath(start, finish, {
        drawPolyPath: false, drawFinalPath: true,
    });
    let path = this.navMesh.findPath(start, finish);
    return path;
    }
    gotoXY(x, y, navMesh) {
    const p2 = new Phaser.Geom.Point(x, y);
    // the entities location, respective to the center of its hit box
    const trueX = this.inimigo.x+this.inimigo.body.width /
    2 + this.inimigo.body.offset.x;
    const trueY = this.inimigo.y+this.inimigo.body.height /
          2 + this.inimigo.body.offset.y;
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
    }
       moveInDirection(direction, sprint) {
        let dir = '';
        if (_.isString(direction) && _.includes(DIRECTIONS, direction)) {
            dir = direction.toLowerCase();
 } else if (_.isNumber(direction) && _.inRange(direction, 0, 4)) {
            dir = this.DIRECTIONS[direction];
        } else {
            console.log(direction);
            console.error('Invalid direction');
            return;
        }
        switch (dir) {
            case 'up':
                this.inimigo.body.velocity.y = -this.speed;
                this.inimigo.body.velocity.x = 0;
                this.inimigo.direction = 'up';
                break;
            case 'down':
                this.inimigo.body.velocity.y = this.speed;
                this.inimigo.body.velocity.x = 0;
                this.inimigo.direction = 'down';
                break;
            case 'right':
                this.inimigo.body.velocity.x = this.speed;
                this.inimigo.body.velocity.y = 0;
                this.inimigo.direction = 'right';
                break;
            case 'left':
                this.inimigo.body.velocity.x = -this.speed;
                this.inimigo.body.velocity.y = 0;
                this.inimigo.direction = 'left';
                break;
            default:
                console.error('Invalid direction');
                return;
        }
        this.inimigo.anims.play('walk-' + dir, true);
        //this.adjustHitbox('walk');
}
}
