class Item extends Phaser.GameObjects.Sprite {
 constructor(scene, x, y, frame) {
     super(scene, x, y, frame);
 this.scene = scene;
 scene.physics.world.enable(this);
 scene.add.existing(this);
 this.setTexture('player');
        this.setPosition(x, y);
        this.body.setCollideWorldBounds(true);
        //this.body.setOffset(16, 31);
        //this.body.setCircle(4);
     
 }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        
        
        
        
    }

}