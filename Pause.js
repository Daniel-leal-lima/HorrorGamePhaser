class Pause extends Phaser.Scene {
    constructor() {
        super({key:'pause'});
    }
    create(){
        this.keyObj = this.input.keyboard.addKey('P');
        console.log('to pausado!');
        this.keyObj.on('down', function(event){
             console.log('voltei a executar!');
             this.scene.resume('jogo');
             this.scene.stop();
        },this);
    }
}