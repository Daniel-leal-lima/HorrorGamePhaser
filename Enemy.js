class Enemy extends Phaser.GameObjects.Sprite {
 constructor(scene, x, y, frame) {
     super(scene, x, y, frame);
 this.scene = scene;
 scene.physics.world.enable(this);
 scene.add.existing(this);
 this.setTexture('player');
        this.setPosition(x, y);
        this.tint=0x000000;
        this.body.setCollideWorldBounds(true);
        this.body.setOffset(16, 31);
        this.body.setCircle(4);
     
     
     this.direction = 'down';

        config = {
            key: 'stand-down',
            frames: scene.anims.generateFrameNumbers('player', { frames: [3,11,19]}),
            frameRate: 3,
            repeat: -1
        };
        scene.anims.create(config);

        config = {
            key: 'stand-right',
            frames: scene.anims.generateFrameNumbers('player', { frames: [0,8]}),
            frameRate: 3,
            repeat: -1
        };
        scene.anims.create(config);

        config = {
            key: 'stand-up',
            frames: scene.anims.generateFrameNumbers('player', { frames: [6,14]}),
            frameRate: 3,
            repeat: -1
        };
        scene.anims.create(config);


        var config = {
            key: 'walk-down',
            frames: scene.anims.generateFrameNumbers('player', { frames: [4,12,20,28]}),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);

        var config = {
            key: 'walk-right',
            frames: scene.anims.generateFrameNumbers('player', { frames: [1,9,17,25] }),
            frameRate: 15,
            repeat: -1
        };
        scene.anims.create(config);

        var config = {
            key: 'walk-up',
            frames: scene.anims.generateFrameNumbers('player', { frames: [7,15,23,31]}),
            frameRate: 15,
            repeat: -1
        };
 }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        
        
        
        
    }

}