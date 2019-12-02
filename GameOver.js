class GameOver extends Phaser.Scene{
	constructor(){
			super({key: 'gameover'});
            		}

preload(){
	this.load.image('gameoverimage','img/game-over1.png')
	this.load.image("botao1","img/voltar1.png")
    this.load.audio('Violino', ['audio/VIOLINO.ogg','audio/VIOLINO.mp3']);
}

create(){
    
    this.markers1 = { name: 'violin', start: 1, duration: 2, config:{volume: 5}},
                       
    
    
    this.music =  this.sound.add('Violino');
        this.music.addMarker(this.markers1);
        this.music.play('violin');
    
	this.gameoverimage = this.make.sprite({
        x:300,
        y:200,
        scale:1,
        key:'gameoverimage'
	});
    
	}
   update(){
       if(this.gameoverimage.scale<=3.5){
       this.gameoverimage.scale+=.09;
       
       }
       else{
           this.cameras.main.fadeIn(500,0,0,0);
           this.scene.stop();
           this.scene.start('jogo');

       }
   }
}