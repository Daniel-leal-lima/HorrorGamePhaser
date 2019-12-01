class Descricao extends Phaser.Scene {
    constructor() {
        super({key:'desc'});
    }
    init(data){// Chamo o item que eu quero da classe Level.js
        console.log(data);
    }
    preload(){
    	
    }
    create(){
        //this.item = teste.item;
       // console.log(teste);
    }
}