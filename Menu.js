class  Menu extends Phaser.Scene{
	constructor(){
			super({key: 'menu'});
            		}

    preload(){
        //this.load.image("menu","img/provisorio.jpg");
        this.load.spritesheet({
            key: 'menu',
            url: "img/mansao.png",
            frameConfig: {frameWidth: 600,  //The width of the frame in pixels.
                          frameHeight: 600, //The height of the frame in pixels. Uses the frameWidth value if not provided.
                          startFrame: 0,   //The first frame to start parsing from.
                          endFrame: 22,    //The frame to stop parsing at. If not provided it will calculate the value based on the image and frame dimensions.
                          margin: 0,       //The margin in the image. This is the space around the edge of the frames.
                          spacing: 0}      //The spacing between each frame in the image.
        });
		this.load.image("botao","img/play.png")
          this.load.audio('Tema', [
        'audio/Menu.ogg',
        'audio/Menu.mp3']
    );
    }
    create(){
        this.menuimage = this.make.sprite({
        x:0,
        y:0,
        scale:1,
        key:'menu'}).setOrigin(0);
    	
        this.config = {
            key: 'chuva',
            frames: this.anims.generateFrameNumbers('menu', { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,
                                                                      13,14,15,16,17,18,19,20,21,22]}),
            frameRate: 8,
            repeat: -1
        };
        this.anims.create(this.config);
        
        this.menuimage.anims.play('chuva', false);
       
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
    
        
    var sprite = this.add.sprite(40, 200, 'botao').setInteractive();
    sprite.scale = .4;

    sprite.on('pointerdown', function (pointer) {

        //this.setTint(0xff0000);
        this.menuimage.anims.stop();
        this.menuimage.destroy();
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


