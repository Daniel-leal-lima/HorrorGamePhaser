
class  Menu extends Phaser.Scene{
	constructor(){
			super({key: 'menu'});
            		}

    preload(){
        this.load.image("menu","img/provisorio.jpg");
		this.load.image("botao","img/play.png")
          this.load.audio('Tema', [
        'audio/Menu.ogg',
        'audio/Menu.mp3']
    );
    }
    create(){
        this.markers = [
    { name: 'alien death', start: 1, duration: 30, config:{volume: 5,loop:true},},
    { name: 'boss hit', start: 9, duration: 29, config: {volume: 5,loop:true,delay:1} },
    { name: 'escape', start: 4, duration: 3.2, config: {} },
    { name: 'meow', start: 8, duration: 0.5, config: {} },
    { name: 'numkey', start: 9, duration: 0.1, config: {} },
    { name: 'ping', start: 10, duration: 1.0, config: {} },
    { name: 'death', start: 12, duration: 4.2, config: {} },
    { name: 'shot', start: 17, duration: 1.0, config: {} },
    { name: 'squit', start: 19, duration: 0.3, config: {} }
];
            console.log('menu iniciado');
           
        this.music = this.sound.play('Tema', this.markers[1]);
    let menuimage = this.make.sprite({
        x:240,
        y:150,
        scale:.5,
        key:'menu'});
    	
        
    var sprite = this.add.sprite(40, 200, 'botao').setInteractive();
    sprite.scale = .4;

    sprite.on('pointerdown', function (pointer) {

        //this.setTint(0xff0000);
        this.scene.stop();
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


