class Item extends Phaser.GameObjects.Sprite {
 constructor(scene, x, y, nome) {
     super(scene, x, y, nome);
 this.scene = scene;
 scene.physics.world.enable(this);
 scene.add.existing(this);
 
        this.setPosition(x, y);
        this.body.setCollideWorldBounds(true);
        //this.body.setOffset(16, 31);
        //this.body.setCircle(4);
     console.log(nome);
     if(nome == 'Livro'){
         this.setTexture('player');
     }
        else if(nome=='Chave1'){
        this.setTexture('chave1');
            this.setScale(.4);
        }
     
 }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        
        
        
        
    }

}