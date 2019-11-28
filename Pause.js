class Pause extends Phaser.Scene {
    constructor() {
        super({key:'pause'});
    }
    preload(){
    	this.load.image('pauseimage','img/pause.png' )
    }


    create(){
        this.keyObj = this.input.keyboard.addKey('P');
        console.log('to pausado!');
        this.keyObj.on('down', function(event){
             console.log('voltei a executar!');
             this.scene.resume('jogo');
             this.scene.stop();
        },this);

        let pauseimage = this.make.sprite({
        x:300,
        y:100,
        scale:.5,
        key:'pauseimage'
      //  pauseimage.setAlpha(.3);

        
	});
    }
}