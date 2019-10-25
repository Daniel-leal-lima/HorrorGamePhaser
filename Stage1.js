var stage1State = {
    create:function(){
       
        game.physics.startSystem(Phaser.Physics.ARCADE);
        map = game.add.tilemap('desert');
        map.addTilesetImage('Desert', 'tiles');
        backgroundlayer = map.createLayer('background');
        blockedLayer = map.createLayer('collidables');
    
        map.setCollisionBetween(1, 2000, true, 'collidables');
        
        //backgroundlayer.resizeWorld();
        
        result = this.findObjectsByType('playerStart', map, 'objectsLayer')
        result2 = this.findObjectsByType('enemyStart', map, 'objectsLayer')
        
        
        inimigo = game.add.sprite(result2[0].x + 16, result2[0].y + 16,'Player');
        
        inimigo.anchor.set(.5);
        inimigo.tint = "#fff";
        player = game.add.sprite(result[0].x+16, result[0].y+16,'Player');
        player.anchor.set(.5);
        
        //Jogador
        player.animations.add('walkUp',[8,9,10,11],5);
        player.animations.add('walkRight',[4,5,6,7],5);
        player.animations.add('walkLeft',[12,13,14,15],5);
        player.animations.add('walkDown',[0,1,2,3],5);
        player.enableBody= true;
        //------------------------------
        
        //inimigo
        inimigo.animations.add('W',[8,9,10,11],5);
        inimigo.animations.add('D',[4,5,6,7],5);
        inimigo.animations.add('A',[12,13,14,15],5);
        inimigo.animations.add('S',[0,1,2,3],5);
        inimigo.enableBody= true;
        //----------------------------------
        
        
        game.stage.backgroundColor= '#595959';
        this.AKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.SKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.WKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.DKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        //Câmera e colisão
        //game.physics.arcade.enable([sprite, sprite2]);
        game.physics.arcade.enable(player);
        game.physics.arcade.enable(inimigo);
        game.camera.follow(player);
        player.body.collideWorldBounds = true;
        inimigo.body.collideWorldBounds = true;
        //inimigo.bounce.set(0.2, 0.2);
        //inimigo.body.drag.set(100, 100);
        //----------------------------------------
        velocityDifference = 1;
        binaryGraph = this.createBinaryGraph();
        finalDestinationX = -1;
        finalDestinationY = -1;
        isPositionCorrectedX = true;
        isPositionCorrectedY = true;
        traversalPosition = 0;
        traversalGroup = new Array()
    },
    leftclick:function(){
        finalDestinationX = Math.floor(Math.floor(player.position.x) / 32);
        finalDestinationY = Math.floor(Math.floor(player.position.y) / 32);
        isPositionCorrectedX = false;
        isPositionCorrectedY = false;
        this.beginAStarMovement();
    },
    update:function(){
        console.log(inimigo.x,inimigo.y);
        this.leftclick();
        
        
        
        game.physics.arcade.collide(inimigo, blockedLayer);
        
        let isMoving = false;
        
         if ((traversalGroup.length != traversalPosition) && (finalDestinationX != -1)) {
      // console.log("we're iterating through traversal group");
      // console.log(this.traversalPosition);
      // console.log(this.isPositionCorrectedX, this.isPositionCorrectedY);
      // console.log(this.traversalGroup);
      if (!isPositionCorrectedX) {
        isMoving = true;
        // console.log("moving x to:", this.traversalGroup[this.traversalPosition].x);
        this.movePlayerToX(traversalGroup[traversalPosition].x);
        if (!inimigo.animations.isPlaying) {
          if (traversalGroup[traversalPosition].x * 32 > inimigo.position.x) {
            //console.log('walking right animation');
            inimigo.animations.play('D');
          } else {
            //console.log('walking left animation');
            inimigo.animations.play('A');
          }
        }
      }
         }
         if (!isPositionCorrectedY) {
        isMoving = true;
        // console.log("moving y to:", this.traversalGroup[this.traversalPosition].y);
        this.movePlayerToY(traversalGroup[traversalPosition].y);
        if (!inimigo.animations.isPlaying) {
          if (traversalGroup[traversalPosition].y * 32 > inimigo.position.y) {
            inimigo.animations.play('S');
          } else {
            inimigo.animations.play('W');
          }
        }
      }
      if (isPositionCorrectedX && isPositionCorrectedY) {
        traversalPosition++;
        // console.log("incrementing position to: ", this.traversalPosition);
        if (traversalPosition != traversalGroup.length) {
          isPositionCorrectedX = false;
          isPositionCorrectedY = false;
        }
      }
      
    if (!isMoving) {
      //inimigo.animations.stop();
    }
    
        
        
        
        
        
        
        
        
        if(this.WKey.isDown){
        player.animations.play('walkUp');
        player.y -= 2;
        }
        else if(this.SKey.isDown){
        player.play('walkDown');
        player.y += 2;
        }
        else if((this.AKey.isDown)){
        player.play('walkLeft'); 
            player.x -= 2;
        }
        else if(this.DKey.isDown){
        player.play('walkRight');
            player.x += 2;            
        }
        //console.log(map.layers[0].data);
       
        game.physics.arcade.collide(player,inimigo);
        
       
    },
    findObjectsByType: function(type, map, layer) {
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
  },
    createBinaryGraph: function() {
    let binaryGraph = new Array((blockedLayer.layer.data).length);
    for (let i = 0; i < (blockedLayer.layer.data).length; ++i) {
      binaryGraph[i] = new Array((blockedLayer.layer.data[i]).length);
      for (let j = 0; j < (blockedLayer.layer.data[i]).length; ++j) {
        let collide = 1;
        if (blockedLayer.layer.data[j][i].collideDown) {
          collide = 0;
        }
        binaryGraph[i][j] = collide;
      }
    }
    return new Graph(binaryGraph);
  },
    beginAStarMovement: function() {
    traversalPosition = 0;
    let start = binaryGraph.grid[Math.round(inimigo.position.x / 32)][Math.round(inimigo.position.y / 32)];
    let end;
    try {
      end = binaryGraph.grid[finalDestinationX][finalDestinationY];
    } catch(error) {
      alert("Unable to reach that destination");
    }
    traversalGroup = astar.search(binaryGraph, start, end);
    if (traversalGroup.length == 0) {
      alert("Unable to reach that destination");
    }
    
},
    movePlayerToX: function(x) {
    // console.log("move player x was called");
    if (((inimigo.position.x - x * 32) <= 16 && (inimigo.position.x - x * 32) >= 0) || ((x * 32 - inimigo.position.x) <= 16 && (x * 32 - inimigo.position.x >= 0))) {
      inimigo.body.velocity.x = 0;
      inimigo.position.x = Math.round(x * 32);
      isPositionCorrectedX = true;
      return;
    } else {
      if (inimigo.position.x < x * 32) {
        inimigo.body.velocity.x += velocityDifference;
        console.log('moving right');
        //this.player = this.playerRight;
      } else if (inimigo.position.x > x * 32) {
        inimigo.body.velocity.x -= velocityDifference;
        console.log('moving left');
      } else if (inimigo.position.x == x * 32) {
        inimigo.body.velocity.x = 0;
        isPositionCorrectedX = true;
      }
    }
  },
    movePlayerToY: function(y) {
    if (((inimigo.position.y - y * 32) <= 16 && (inimigo.position.y - y * 32) >= 0) || ((y * 32 - inimigo.position.y) <= 16 && (y * 32 - inimigo.position.y >= 0))) {
      inimigo.body.velocity.y = 0;
      inimigo.position.y = Math.round(y * 32);
      isPositionCorrectedY = true;
      return;
    } else {
      if (inimigo.position.y < y * 32) {
        inimigo.body.velocity.y += velocityDifference;
      } else if (inimigo.position.y > y * 32) {
        inimigo.body.velocity.y -= velocityDifference;
      } else if (inimigo.position.y == y * 32) {
       isPositionCorrectedY = true;
        inimigo.body.velocity.y = 0;
      }
    }
  }

}