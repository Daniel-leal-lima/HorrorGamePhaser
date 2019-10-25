var GameHipster = GameHipster || {};

GameHipster.GameState = {

  init : function() {
    //keyboard controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

    this.PLAYER_SPEED = 400;
    this.ENEMY_SPEED = 400;

  }, // end init

  preload : function() {

  },//end preload

  //executed after everything is loaded
  create: function() {
    // create a basic map
    blockdata = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,0,1,1,0,1,1,1,0,1,0,1],
      [1,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
      [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,1,1,1,0,1,1,1,0,0,0,1],
      [1,0,1,0,1,1,1,0,1,1,1,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];
    this.blocks = this.add.group();
    this.blocks.enableBody = true;
    this.floors = this.add.group();
    this.floors.enableBody = true;

    var floor, block, i, j, col;
    var ROWS = blockdata.length;
    var COLS = blockdata[0].length;

    for (i =0; i < COLS; i++) {
          for (j =0; j < ROWS; j++){
            //get block co-ordinates
            col = (blockdata[j][i]);

            if (col ==0){ // if data = 0 show a floor tile
              floor = this.floors.create( 1 + (i*64),1 +(j*64), 'block' + col);
              floor.anchor.setTo(0.5);
            }

            if (col ==1){ // if data = 0 show a block tile
              block = this.blocks.create( 1 + (i*64),1 +(j*64), 'block' + col);
              block.anchor.setTo(0.5);
              block.body.immovable =true;
            }

          }// end j loop

    }; // end i loop

    this.player = this.add.sprite(770, 370, 'player');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.8);
    this.game.physics.arcade.enable(this.player);

    this.enemies = this.add.group(); //add enemies group
    this.enemies.enableBody = true;

    var enemyData = [
      {"x" : 70, "y" : 70, "key" : "enemy"},
      {"x" : 750, "y" : 440, "key" : "enemy"}
    ];

    //add enemies to game
    enemyData.forEach(function(element){
      this.enemy = this.enemies.create(element.x, element.y, element.key);
      this.enemy.scale.setTo(0.7);
      this.enemy.anchor.setTo(0.5);
    }, this);

    //set a timer that will move an enemy after 5 seconds if he can't see you
    this.game.time.events.loop(Phaser.Timer.SECOND * 5 , this.moveMonster, this);
    //start movement
    this.moveMonster()

  },
  //executed multiple times per second

  update: function() {
    //stop player moving if keyboard is not been used
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    //check collisom
    this.game.physics.arcade.collide(this.player, this.blocks);
    this.game.physics.arcade.collide(this.enemies, this.blocks);
    //check keyboard
    this.keyboardControls();
    //start chase
    this.chaseMe();
  }, // end update

  keyboardControls : function(){
    //init keyboard controls
    if (this.cursors.left.isDown|| this.leftKey.isDown){
      this.player.body.velocity.x = -this.PLAYER_SPEED;
    }else
    if (this.cursors.right.isDown || this.rightKey.isDown){
       //this.player.angle -= 5;
       this.player.body.velocity.x = this.PLAYER_SPEED;
    } else
    if (this.cursors.up.isDown || this.upKey.isDown){
      //thrust
      this.player.body.velocity.y = -this.PLAYER_SPEED;
    } else
    if (this.cursors.down.isDown || this.downKey.isDown){
      //thrust
      this.player.body.velocity.y = this.PLAYER_SPEED;
    }

  },// end function

  moveMonster : function(){
    this.enemies.forEach(function(el){

      var randMove = Math.floor(Math.random()* 4 +1);
      if (randMove == 1){
        el.body.velocity.x = 200;
      } else
      if (randMove == 2){
        el.body.velocity.x = -200;
      } else
      if (randMove == 3){
        el.body.velocity.y = 200;
      } else
      if (randMove == 4){
        el.body.velocity.y = -200;
      }

    }, this);

  },

  chaseMe : function() {
    //lets assume 10 pixels difference if needed
    var diffPlusX = this.player.x + 10; // line of sight at 10 pixels high on x
    var diffMinusX = this.player.x - 10; // line of sight at -10 pixels high on x
    var diffPlusY = this.player.y + 10; // line of sight at 10 pixels high on y
    var diffMinusY = this.player.y - 10; // line of sight at -10 pixels high on y
    var howClose = 130; // how close is does the enemy start chaing you

    this.enemies.forEach(function(el){ //loop enemies group

      if (Math.floor(el.y) == (Math.floor(this.player.y))
      || Math.floor(el.y) < (Math.floor(diffPlusY))
      && Math.floor(el.y) > (Math.floor(diffMinusY))){
         // in the line of sight on horizontal line
             if (this.player.x > el.x + howClose){
              el.body.velocity.x = this.ENEMY_SPEED;
              el.body.velocity.y = 0; // remove this if you want enemy chanse diagonal
            } else
            if (this.player.x < el.x - howClose)
            {
              el.body.velocity.x = -this.ENEMY_SPEED;
              el.body.velocity.y = 0; // remove this if you want enemy chanse diagonal
            }
      }
      if (Math.floor(el.x) == (Math.floor(this.player.x))
      || Math.floor(el.x) < (Math.floor(diffPlusX))
      && Math.floor(el.x) > (Math.floor(diffMinusX))){
        // in the line of sight on vertical line
            if (this.player.y > el.y + howClose){
              el.body.velocity.y = this.ENEMY_SPEED;
              el.body.velocity.x = 0
            } else
            if (this.player.y < el.y - howClose)
            {
              el.body.velocity.y = -this.ENEMY_SPEED;
              el.body.velocity.x = 0
            }
      }

    }, this); // end foreach loop

  },