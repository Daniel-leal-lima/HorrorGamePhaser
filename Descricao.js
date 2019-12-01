class Descricao extends Phaser.Scene {
    constructor() {
        super({key:'desc'});
    }
    init(data){// Chamo o item que eu quero da classe Level.js
        console.log(data);
    }
    preload(){
    	this.load.image("descnota1", "img/nota_1_png.png");
    }
    create(){
        
        this.keyObj = this.input.keyboard.addKey('ESC');
        this.keyObj.on('down', function(event){//Comando para teste
        this.scene.resume('jogo');
        this.scene.stop();
        }
         ,this);
        this.Over_cam1 = this.make.sprite({
        x: 300,
        y: 190,
        key: 'CAM'}).setScrollFactor(0).setAlpha(.3);
        
        //CRIAR If's para testar qual nota irá aparecer
        //ex: if(data=='Nota2'){}
        
        this.nota = this.make.sprite({
        x: 300,
        y: 180,
        scale:1,
        key: 'descnota1'}).setScrollFactor(0);
    }
    
    
}