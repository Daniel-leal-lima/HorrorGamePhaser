class GameOver extends Phaser.Scene{
	constructor(){
			super({key: 'gameover'});
            		}

preload(){
	this.load.image('gameoverimage','img/pirate_ship.png')
}

create(){
	let gameoverimage = this.make.sprite({
        x:100,
        y:100,
        scale:1,
        key:'gameoverimage'
	});
	}
}