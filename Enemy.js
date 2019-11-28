class Enemy extends Phaser.GameObjects.Sprite {
 constructor(scene, x, y, frame) {
     super(scene, x, y, frame);
 this.scene = scene;
 scene.physics.world.enable(this);
 scene.add.existing(this);
 this.setTexture('player');
        this.setPosition(x, y);
        this.tint=0x000000;
        this.body.setCollideWorldBounds(true)
        this.setOrigin(0);
        this.body.setOffset(11.5, 23);
        this.body.width=8;
        this.body.height=8;
     
     
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
        scene.anims.create(config)
     
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
 }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        
        
        
        
    }

}