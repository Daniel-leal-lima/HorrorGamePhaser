class Tutorial extends Phaser.Scene {
    constructor() {
        super({key:'tutorial'});
    }

    preload(){
	this.load.image('movimento','img/movi1.png')
    this.load.image("botao1","img/voltar.png")
}

create(){
	let movimento = this.make.sprite({
        x:300,
        y:180,
        scale:.5,
        key:'movimento'
	});

    var sprite = this.add.sprite(530, 320, 'botao1').setInteractive();
    sprite.scale = .1;

    sprite.on('pointerdown', function (pointer) {

        //this.setTint(0xff0000);
        this.scene.resume('menu');
        this.scene.stop();
        //
        

    },this);
	}
}