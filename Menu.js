class  Menu extends Phaser.Scene{
	constructor(){
			super({key: 'menu'});
            		}

    preload(){
        //this.load.image("menu","img/provisorio.jpg");
        this.load.image("tuto","img/tutorial1.jpg")

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
        
		this.load.image("botao","img/play.png");
        
        this.load.image("logo","img/logo.png")
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
            repeat: -1,
            yoyo:true
        };
        this.anims.create(this.config);
        
        this.menuimage.anims.play('chuva', false);
       
        this.markers = [{ name: 'loop', start: 9, duration: 30, config:{volume: 5}},
                       { name: 'loop2', start: 21.980, duration: 30, config:{volume: 5}}];
            console.log('menu iniciado');
        this.music =  this.sound.add('Tema');
        this.music.addMarker(this.markers[0]);
        this.music.addMarker(this.markers[1]);
        this.music.play('loop');
     
        
        this.music.on('complete', function(music){
            music.play('loop2');
        });

            var sprite_tutorial = this.add.sprite(40, 100, 'tuto').setInteractive();
    sprite_tutorial.scale = .2;

    sprite_tutorial.on('pointerdown', function (pointer) {

        //this.setTint(0xff0000);
        this.scene.pause();
        this.scene.launch('tutorial');
        

    },this);
        
    var sprite = this.add.sprite(40, 200, 'botao').setInteractive();
    sprite.scale = .4;

    sprite.on('pointerdown', function (pointer) {

        //this.setTint(0xff0000);
        this.music.stop();
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
    update(){
        
    }
}


