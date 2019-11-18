class Pause extends Phaser.Scene {
    constructor() {
        super({key:'pause'});
    }
    create(){
        this.ado = this.input.keyboard.addKeys('P,I');
        console.log('to pausado!');
    }
    update(){
         if(this.ado.P.isDown){
             this.scene.stop();
              console.log('voltei a executar!');
             this.scene.resume('jogo');
        }        
    }

}