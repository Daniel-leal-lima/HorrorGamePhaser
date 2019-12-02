class Descricao extends Phaser.Scene {
    constructor() {
        super({key:'desc'});
    }
    init(data){// Chamo o item que eu quero da classe Level.js
        console.log(data);
        this.Item_now = data;
    }
    preload(){
    	this.load.image("descnota1", "img/mapa_saida_png.png");
        this.load.image("descnota2", "img/bilhete_piano_png.png");
        this.load.image("descnota3", "img/buraco_espelho_png.png");
        this.load.image("diario1", "img/nota_1_png.png");
        this.load.image("diario2", "img/nota_2_png.png");
        this.load.image("diario3", "img/nota_3_png_.png");
        this.load.image("diario4", "img/nota_4_png.png");
        this.load.image("diario5", "img/nota_5_png.png");
        this.load.image("diario6", "img/nota_6_png.png");
        this.load.image("diario7", "img/nota_7_png.png");
        this.load.image("diario8", "img/nota_8_png.png");
        this.load.image("diario9", "img/nota_9_png.png");
        this.load.image("diario10", "img/nota_10_png.png");
    }
    create(){
        this.page = 0;
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
        
        
        if(this.Item_now=='Nota'){
        this.nota = this.make.sprite({
        x: 300,
        y: 180,
        scale:1,
        key: 'descnota1'}).setScrollFactor(0);
        }
        else if(this.Item_now=='Nota2'){
        this.nota = this.make.sprite({
        x: 300,
        y: 180,
        scale:1,
        key: 'descnota2'}).setScrollFactor(0);
        }
        else if(this.Item_now=='Nota3'){
        this.nota = this.make.sprite({
        x: 300,
        y: 180,
        scale:1,
        key: 'descnota3'}).setScrollFactor(0);
        }
        else if(this.Item_now=='Lanterna'){
         this.nota = this.make.sprite({
        x: 300,
        y: 180,
        scale:5,
        key: 'lanterna'}).setScrollFactor(0);
        }
        else if(this.Item_now=='Chave1'){
         this.nota = this.make.sprite({
        x: 300,
        y: 180,
        scale:5,
        key: 'chave1'}).setScrollFactor(0);
        }       
        else if(this.Item_now=='Chave2'){
         this.nota = this.make.sprite({
        x: 300,
        y: 180,
        scale:5,
        key: 'chave2'}).setScrollFactor(0);
        }       
        else if(this.Item_now=='Diario'){
            
        this.keyleft = this.input.keyboard.addKey('LEFT');
        this.keyleft.on('down', function(event){//Comando para teste
            if(this.page>0){
            this.page--
            }
        }
         ,this);
        this.keyRight = this.input.keyboard.addKey('RIGHT');
        this.keyRight.on('down', function(event){//Comando para teste
            console.log('tes');
            if((this.page>=0)&&(this.page<10)){
            this.page++;
        }
        }
         ,this);
            
            //aaaaaa
            this.nota = this.make.sprite({
        x: 300,
        y: 180,
        scale:5,
        key: 'Diario'}).setScrollFactor(0);
            
        this.Ant = this.make.sprite({
        x: 100,
        y: 250,
        scale:1,
        key: 'Diario'}).setScrollFactor(0);
            
        this.prox = this.make.sprite({
        x: 500,
        y: 250,
        scale:1,
        key: 'Diario'}).setScrollFactor(0);
            
        }
        
 }
        update(){
            console.log(this.page);
            if(this.Item_now=='Diario'){
                if((this.page>0)&&(this.page<=10)){
                if(this.page>0&&(this.page<=9)){
                    this.Ant.setVisible(true);
                    this.prox.setVisible(true);
                }
                      
                    this.nota.setTexture('diario'+this.page);
                    this.nota.setScale(1);
                }
                
                if(this.page==0){this.nota.setTexture('Diario');this.nota.setScale(5);this.Ant.setVisible(false);}
                if(this.page==10){this.prox.setVisible(false);}
        }
        
    
        }
}