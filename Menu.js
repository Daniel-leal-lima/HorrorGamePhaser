class  Menu extends Phaser.Scene{
	constructor(){
			super({key: 'menu'});
            		}

    preload(){
        this.load.image("menu","img/provisorio.jpg");
		this.load.image("botao","img/play.png")
    }
    create(){


    let menuimage = this.make.sprite({
        x:240,
        y:150,
        scale:.5,
        key:'menu'});
    	
        
    var sprite = this.add.sprite(40, 200, 'botao').setInteractive();
    sprite.scale = .4;

    sprite.on('pointerdown', function (pointer) {

        //this.setTint(0xff0000);
        this.scene.pause();
        this.scene.start('jogo');


    },this);

    sprite.on('pointerout', function (pointer) {

        this.clearTint();

    });

    sprite.on('pointerup', function (pointer) {

        this.clearTint();
        console.log('click')

    });    



    }
}


