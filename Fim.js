class Fim extends Phaser.Scene {
    constructor() {
        super({key:'Fim'});
    }
    preload(){
    	this.load.image('final','img/final_game.png' )
    }
    create(){
        this.Fim_image = this.make.sprite({
        x:300,
        y:180,
        scale:1,
        key:'final'
	});
    }
    update(){
       this.Fim_image.alpha-=.004;
        
        if(this.Fim_image.alpha<=0){
            //aaaaaa
            this.scene.stop();
            this.scene.start('creditos','jogo');
            
        }
    }
}