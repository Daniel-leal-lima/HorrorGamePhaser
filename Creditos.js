class Creditos extends Phaser.Scene {
    constructor() {
        super({key:'creditos'});
    }
    init(data){
        this.cena_que_chamou = data;
    }
    preload(){
    	this.load.image('creditosimage','img/Creditos.png' );
        this.load.image("logo","img/logo.png")
          this.load.audio('Tema2', [
        'audio/Menu.ogg',
        'audio/Menu.mp3']
    );
        this.load.image("botao1","img/voltar.png")
    }


    create(){
        if(this.cena_que_chamou == 'jogo'){
        this.creditos_image = this.make.sprite({
        x:300,
        y:180,
        scale:1,
        key:'creditosimage',
        alpha:0
        });
    
        this.markers1 = [{ name: 'loop', start: 9, duration: 30, config:{volume: 5}},
                       { name: 'loop2', start: 21.980, duration: 30, config:{volume: 5}}];
            
            
        this.music1 =  this.sound.add('Tema2');
        this.music1.addMarker(this.markers1[0]);
        this.music1.addMarker(this.markers1[1]);
        this.music1.play('loop');
        this.music1.on('complete', function(music){
            music.play('loop2');
        });
            
            this.sprite = this.add.sprite(530, 320, 'botao1').setInteractive();
            this.sprite.alpha=0
            this.sprite.scale = .1;

            this.sprite.on('pointerdown', function (pointer) {

            //this.setTint(0xff0000);
            this.music1.stop();
            this.scene.stop();
            this.scene.start('menu');
            },this);
            
            
            
            
            
            
        }
        
        
        
        
        else{
            this.creditos_image = this.make.sprite({
        x:300,
        y:180,
        scale:1,
        key:'creditosimage',
        });
            
        this.sprite = this.add.sprite(530, 320, 'botao1').setInteractive();
            this.sprite.scale = .1;

            this.sprite.on('pointerdown', function (pointer) {

            //this.setTint(0xff0000);
            this.scene.resume('menu');
            this.scene.stop();
            },this);
            
            
        }
    }
    
    update(){
        if(this.cena_que_chamou == 'jogo'){
            if(this.creditos_image.alpha<=1){
            this.creditos_image.alpha+=.004
            this.sprite.alpha+=.004
            }
        }
    }
}