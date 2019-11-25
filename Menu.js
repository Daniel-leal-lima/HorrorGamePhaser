class Menu extends Phaser.Scene {
    constructor() {
        super({key:'menu'});
    }
    preload(){
     this.load.audio('Tema', [
        'audio/Menu.ogg',
        'audio/Menu.mp3']
    );
    }
    create(){
            console.log('menu iniciado');
            //this.add.image(400, 300, 'wizball').setScale(4);
            let Musica_Fundo = this.sound.add('Tema',{
                loop:true
            });
            Musica_Fundo.play();
        
    }
    update(){
        
    }
}