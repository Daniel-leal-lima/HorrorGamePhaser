class GameOver extends Phaser.Scene{
	constructor(){
			super({key: 'gameover'});
            		}

preload(){
	this.load.image('gameoverimage','img/game-over.jpg')
	this.load.image("botao1","img/voltar1.png")
}

create(){
	let gameoverimage = this.make.sprite({
        x:280,
        y:200,
        scale:1,
        key:'gameoverimage'
	});

	var sprite = this.add.sprite(550, 320, 'botao1').setInteractive();
    sprite.scale = .1;

    sprite.on('pointerdown', function (pointer) {

        //this.setTint(0xff0000);
        this.scene.stop();
        this.scene.start('menu');
        

    },this);
	}
}