

var stage1State = {
    create:function(){
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        map = game.add.tilemap('desert');
        map.addTilesetImage('Desert', 'tiles');
        backgroundlayer = map.createLayer('background');
        blockedLayer = map.createLayer('collidables');
    
        
        
        
        backgroundlayer.resizeWorld();
        
        /*result = this.findObjectsByType('playerStart', map, 'objectsLayer')
        result2 = this.findObjectsByType('enemyStart', map, 'objectsLayer')*/
        
        
        inimigo = game.add.sprite(10, 10,'Player');
        console.log(inimigo.x,inimigo.y);
        //inimigo.anchor.set(.5);
        inimigo.tint = "#fff";
        player = game.add.sprite(16, 80,'Player');
        player.anchor.set(.5);
        
        //Jogador
        player.animations.add('walkUp',[8,9,10,11],5);
        player.animations.add('walkRight',[4,5,6,7],5);
        player.animations.add('walkLeft',[12,13,14,15],5);
        player.animations.add('walkDown',[0,1,2,3],5);
        player.enableBody= true;
        //------------------------------
        
        //inimigo
        inimigo.animations.add('Cima',[8,9,10,11],5,false);
        inimigo.animations.add('Direita',[4,5,6,7],5),false;
        inimigo.animations.add('Esquerda',[12,13,14,15],5,false);
        inimigo.animations.add('Baixo',[0,1,2,3],5,false);
        inimigo.enableBody= true;
        //----------------------------------
        
        
        game.stage.backgroundColor= '#595959';
        this.AKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.SKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.WKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.DKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        //Câmera e colisão
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.camera.follow(player);
        
        game.physics.enable(player);
        player.body.setSize(14, 5, 1, 16);
        
        game.physics.enable(inimigo);
        player.body.collideWorldBounds = true;
        inimigo.body.collideWorldBounds = true;
        map.setCollisionBetween(0, 700, true, 'collidables');
        
        
         velocityDifference = 1;
        finalDestinationX = -1;
        finalDestinationY = -1;
        isPositionCorrectedX = true;
        isPositionCorrectedY = true;
        traversalPosition = 0;
        traversalGroup = new Array();
        
        cursors = game.input.keyboard.createCursorKeys();
        
        const navMeshPlugin = this.game.plugins.add(PhaserNavmesh);
        navMesh = navMeshPlugin.buildMeshFromTiled(map, 'navmesh', 16);//criar uma camada navmesh no nosso projeto
        navMesh.enableDebug();
        navMesh.debugDrawMesh({
        drawCentroid: false, drawBounds: false,
         drawNeighbors: false, drawPortals: false,
    });
        
        inimigo.body.width = inimigo.body.width / 2;
        inimigo.body.offset.x += inimigo.body.width / 2;
        inimigo.body.offset.y += inimigo.body.height;
        
        const p1 = new Phaser.Point(window.innerWidth/2, window.innerHeight/2);
        const p2 = new Phaser.Point(window.innerWidth/2+200, window.innerHeight/2+200);
        const path = navMesh.findPath(p1, p2, {
        drawPolyPath: true, drawFinalPath: true,
            
         
    });
        //mov inimigo
        let h;
        let w;
        let offx;
        let offy;
        DIRECTIONS = ['up', 'right', 'down', 'left'];
        speed = 90;
    },
    
    update:function(){
        
        
       game.physics.arcade.collide(player, blockedLayer, function(){
        console.log('collision');
    });
            
            
        console.log(inimigo.position.x + ":" + inimigo.position.y);
        
  
     player.body.velocity.setTo(0);
        if(this.WKey.isDown){
        player.animations.play('walkUp');
        player.body.velocity.y = -128;
        }
        else if(this.SKey.isDown){
        player.play('walkDown');
        player.body.velocity.y = 128;
        }
        else if((this.AKey.isDown)){
        player.play('walkLeft'); 
        player.body.velocity.x = -128;
        }
        else if(this.DKey.isDown){
        player.play('walkRight');
        player.body.velocity.x = 128;           
        }
       
      
    //this.gotoXY(player.x+inimigo.body.width / 2 + player.body.offset.x,player.y+player.body.height / 2 + player.body.offset.y, navMesh);//dar uma olhada caso der erro !!!!!
        this.gotoXY(player.x+player.body.width /
        2 + player.body.offset.x - 32, player.y+player.body.height /
        2 + player.body.offset.y + 16, navMesh);

       
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
    // draw the path   
    findPath : function(start, finish) {
    navMesh.debugClear(); // Clears the overlay       
    navMesh.findPath(start, finish, {
        drawPolyPath: false, drawFinalPath: true,
    });
    let path = this.navMesh.findPath(start, finish);
    return path;
    },
    gotoXY : function(x, y, navMesh) {
    const p2 = new Phaser.Point(x, y);
    // the entities location, respective to the center of its hit box
    const trueX = inimigo.x+inimigo.body.width /
    2 + inimigo.body.offset.x;
    const trueY = inimigo.y+inimigo.body.height /
          2 + inimigo.body.offset.y;
    const p1 = new Phaser.Point(trueX, trueY);
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
    }
    /*findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  }*/
