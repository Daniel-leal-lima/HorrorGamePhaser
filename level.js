/**
 * Class representing a level (https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html)
 * @extends Phaser.Scene
 */
class Jogo extends Phaser.Scene {

    /** Create the level. */
    constructor() {
        super({key: 'jogo'});
    }

    /** Load assets. */
    preload() {

        // Player sprite.
        this.load.spritesheet({
            key: 'player',
            url: "img/Player.png",
            frameConfig: {frameWidth: 32,  //The width of the frame in pixels.
                          frameHeight: 32, //The height of the frame in pixels. Uses the frameWidth value if not provided.
                          startFrame: 0,   //The first frame to start parsing from.
                          endFrame: 24,    //The frame to stop parsing at. If not provided it will calculate the value based on the image and frame dimensions.
                          margin: 0,       //The margin in the image. This is the space around the edge of the frames.
                          spacing: 0}      //The spacing between each frame in the image.
        });
        
        this.load.spritesheet({
            key: 'inimigo',
            url: "img/inimigo.png",
            frameConfig: {frameWidth: 32,  //The width of the frame in pixels.
                          frameHeight: 32, //The height of the frame in pixels. Uses the frameWidth value if not provided.
                          startFrame: 0,   //The first frame to start parsing from.
                          endFrame: 24,    //The frame to stop parsing at. If not provided it will calculate the value based on the image and frame dimensions.
                          margin: 0,       //The margin in the image. This is the space around the edge of the frames.
                          spacing: 0}      //The spacing between each frame in the image.
        });
        this.load.spritesheet({
            key: 'nota',
            url: "img/New Piskel-3.png.png",
            frameConfig: {frameWidth: 32,  //The width of the frame in pixels.
                          frameHeight: 32, //The height of the frame in pixels. Uses the frameWidth value if not provided.
                          startFrame: 0,   //The first frame to start parsing from.
                          endFrame: 0,    //The frame to stop parsing at. If not provided it will calculate the value based on the image and frame dimensions.
                          margin: 0,       //The margin in the image. This is the space around the edge of the frames.
                          spacing: 0}      //The spacing between each frame in the image.
        });

        this.load.spritesheet({
            key: 'chave1',
            url: "img/New Piskel-1.png.png",
            frameConfig: {frameWidth: 32,  
                          frameHeight: 32,
                          startFrame: 0,   
                          endFrame: 0,    
                          margin: 0,       
                          spacing: 0}      
        });

        this.load.spritesheet({
            key: 'chave2',
            url: "img/New Piskel-2.png.png",
            frameConfig: {frameWidth: 32,  
                          frameHeight: 32,
                          startFrame: 0,   
                          endFrame: 0,    
                          margin: 0,       
                          spacing: 0}      
        });
        
        this.load.spritesheet({
            key: 'lanterna',
            url: "img/lanterna.png",
            frameConfig: {frameWidth: 32,  
                          frameHeight: 32,
                          startFrame: 0,   
                          endFrame: 0,    
                          margin: 0,       
                          spacing: 0}      
        });
        
        this.load.spritesheet({
            key: 'Diario',
            url: "img/Diario.png",
            frameConfig: {frameWidth: 32,  
                          frameHeight: 32,
                          startFrame: 0,   
                          endFrame: 0,    
                          margin: 0,       
                          spacing: 0}      
        });


       /* this.load.spritesheet({
            key: 'chave2',
            url: "img/New Piskel-2.png.png",
            frameConfig: {frameWidth: 32,  
                          frameHeight: 32, 
                          startFrame: 0,   
                          endFrame: 0,    
                          margin: 0,       
                          spacing: 0}*/   

        // Level tiles and data.
        this.load.image("tile1", "map/Tile1.png");
        this.load.image("tile2", "map/floor.png");
        this.load.image("tile3", "map/base_out_atlas.png");
        this.load.image("Cerca_tile", "map/TileCerca.png");
        this.load.image("Porta_tile", "map/Porta.png");
        this.load.tilemapTiledJSON("level-1", "map/mapa32.json");
        this.load.image('mask', 'img/mask1.png');
        this.load.image('ab', 'img/ab.png');
        this.load.image('HUD', "img/inventario.png");
        this.load.image('CAM', "img/Cam.png");
        
        
        // SOM
        this.load.audio('Chuva', ['audio/Chuva.ogg','audio/Chuva.mp3']);
        this.load.audio('Trovao', ['audio/Trovao.ogg','audio/Trovao.mp3']);
    }

    /** Setup level. */
    create() {
        //Som da Chuva
        this.Som_chuva = this.sound.add('Chuva', {
    mute: false,
    volume: .8,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
        });
        this.Som_chuva.play();
        //Som do trovao
        this.Som_Trovao = this.sound.add('Trovao', {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 1,
    seek: 0,
    loop: false,
    delay: 0
        });
        this.Som_Trovao_aux = this.sound.add('Trovao', {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 2,
    seek: 0,
    loop: false,
    delay: 0
        });
        this.Perseguir=false
        this.HasChave0 = false;
        this.HasChave1 = false;
        this.contador=0; // Variavel contador para Itens
        this.FIM = false;
        this.item_coletado=[];
        // Make map of level 1.
        this.map = this.make.tilemap({key: "level-1"});

        // Define tiles used in map.
        const tileset1 = this.map.addTilesetImage("Tile1", "tile1"); 
        const tileset2 = this.map.addTilesetImage("floor", "tile2"); 
        const tileset3 = this.map.addTilesetImage("base_out_atlas", "tile3"); 
        const tilesetPorta = this.map.addTilesetImage("Porta", "Porta_tile");
        const tilesetCerca = this.map.addTilesetImage("TileCerca", "Cerca_tile");
        
        // The map layers.
        this.floorLayer = this.map.createStaticLayer("chao", [tileset1,tileset2,tileset3]);
        this.wallsLayer = this.map.createStaticLayer("grama", [tileset1,tileset2,tileset3]);
        this.aboveLayer = this.map.createStaticLayer("muros e paredes", [tileset1,tileset2,tileset3,tilesetCerca]);
        this.colisao = this.map.createDynamicLayer("colisao", [tilesetPorta]);//mudar para Doors
        this.rachaduras = this.map.createStaticLayer("rachaduras paredes", [tileset1,tileset2,tileset3]);
        
        
        
       // this.item.collide = true;
        
        
         const objectLayer = this.map.getObjectLayer("navmesh");
         this.navMesh = this.navMeshPlugin.buildMeshFromTiled( "mesh",objectLayer,16);//criar uma camada navmesh no nosso projeto
        
        this.navMesh.enableDebug();
        //Debuga Draw Mesh
        /*this.navMesh.debugDrawMesh({
        drawCentroid: false, drawBounds: false,
         drawNeighbors: false, drawPortals: false,
    });*/
        
        
        
        

        // Set physics boundaries from map width and height.
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Collisions based on layer.
        //this.aboveLayer.setCollisionByProperty({collides: true});
        this.colisao.setCollisionBetween(0, 700); 

        // Set the above player layer higher than everything else.
        //this.aboveLayer.setDepth(10);

        // Setup things in this level.
        this.rooms = [];
        this.stairs = this.physics.add.group();
        this.poit = this.physics.add.group();//ponto de interesse.
        this.collides = this.physics.add.group();
        this.warp = this.physics.add.group();//Warp nos cenários
        this.item = this.physics.add.group();
        this.doors = this.physics.add.group();
        // Loop through all the objects.
        this.map.findObject('Objects', function(object) {

            // rooms
            if (object.type === 'Room') {
                this.rooms.push(object);
            }
            
            //items
            if (object.type === 'item') 
            {
                if(object.name!='Lanterna'){
            this.item.add(this.Item_Var = new Item(this, object.x, object.y,object.name));
                this.Item_Var.body.immovable = true;
                this.Item_Var.name = object.name;
                console.log(this.item.body);
                }
            }

            // stairs
            //if (object.name === 'Stairs') {
            //    this.stairs.add(new Phaser.GameObjects.Sprite(this, object.x, object.y));
            //}
            
            //poit - ponto de interesse do jogador
            if (object.type === 'poit') {
                
                this.poit.add(this.Prox_porta = new Phaser.GameObjects.Sprite(this, object.x, object.y));
                
                if((object.name == 'Porta 1')||(object.name == 'Porta 2')){
                this.Prox_porta.isPorta = true;
                this.Prox_porta.body.immovable = true;   
                this.Prox_porta.setOrigin(0);
                this.Prox_porta.body.height = object.height;
                 this.Prox_porta.body.width = object.width;
                 this.Prox_porta.varial = object.name;
                }
                else{
                this.Prox_porta.isItem = true;
                this.Prox_porta.body.immovable = true;   
                this.Prox_porta.setOrigin(0);
                this.Prox_porta.body.height = object.height;
                this.Prox_porta.body.width = object.width;
                this.Prox_porta.varial = object.name.replace('_area','');
                }
                //if(this.Prox_porta.varial == 'Porta 1'){this.Prox_porta.ativo
            }
            
            
            // Puxando as colisões desenhadas no tiled
            if (object.type === 'collision') {
                this.collides.add(this.plop= new Phaser.GameObjects.Sprite(this, object.x, object.y));
                //Forma de arrumar a colisão do item
                this.plop.body.immovable = true;   
                this.plop.setOrigin(0);
                this.plop.body.height = object.height;
                 this.plop.body.width = object.width;
                
            }
            
            
            // Puxando as colisões das portas desenhadas no tiled
            if (object.type === 'collisionDoor') {
                this.doors.add(this.doors1= new Phaser.GameObjects.Sprite(this, object.x, object.y));
                //Forma de arrumar a colisão do item
                this.doors1.varial = object.name;
                this.doors1.body.immovable = true;   
                this.doors1.setOrigin(0);
                this.doors1.body.height = object.height;
                this.doors1.body.width = object.width;
                
            }
            
            if (object.type === 'warp') {
                this.warp.add(this.Teleporta= new Phaser.GameObjects.Sprite(this, object.x, object.y));
                //Forma de arrumar a colisão do item
                this.Teleporta.ID = object.name;
                this.Teleporta.body.immovable = true;   
                this.Teleporta.setOrigin(0);
                this.Teleporta.body.height = object.height;
                this.Teleporta.body.width = object.width;
            }
            
            
            
            
            // spawn points
            if (object.type === 'Spawn') {
                if (object.name === 'Player') {
                    this.player = new Player(this, object.x, object.y);
                }
            }
            if (object.type === 'EnemySpawn') {
                if (object.name === 'Enemy') {
                    this.inimigo = new Enemy(this, object.x, object.y);
                }
            }
        }, this);

        this.front = this.map.createStaticLayer("passamos por tras disso", [tileset1,tileset2,tileset3]);
        // Add collisions.
        
        this.physics.add.overlap(this.player, this.item, this.coleta, null, this);
        this.physics.add.collider(this.player,  this.collides); // colisões
        this.physics.add.collider(this.player,  this.doors); // portas
        this.physics.add.collider(this.inimigo,  this.doors);
        this.physics.add.collider(this.player,  this.warp, this.Leva, null, this); // portas

       this.physics.add.collider(this.player,  this.inimigo, function(){ //inimigo toca no personagem
            console.log('te peguei');
            this.Som_chuva.stop();
            this.scene.stop();
            this.scene.start('gameover'); 
        },null,this);
        
        this.physics.add.overlap(this.player,   this.poit, this.Interagir, null, this);

        // start camera
        this.cameras.main.setZoom(2);

        // Set first room boundaries.
        this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
                                    this.rooms[this.player.currentRoom].y,
                                    this.rooms[this.player.currentRoom].width,
                                    this.rooms[this.player.currentRoom].height,
                                    true);

        this.cameras.main.startFollow(this.player);

        this.cameras.main.fadeIn(2000, 0, 0, 0);


        // Listener for gamepad detection.
        this.input.gamepad.once('down', function (pad, button, index) {
            this.gamepad = pad;
        }, this);
        var spotlight = this.make.sprite({
        x: 300,
        y: 180,
        scale: 3,
        key: 'mask',
        add: false});
        this.mask = spotlight.createBitmapMask();
       
        let h;
        let w;
        let offx;
        let offy;
        this.DIRECTIONS = ['up', 'right', 'down', 'left'];
        this.speed = 120;
        
        this.pausado = false;
        this.keyObj1 = this.input.keyboard.addKey('ONE');
        this.keyObj2 = this.input.keyboard.addKey('TWO');
        this.keyObj3 = this.input.keyboard.addKey('THREE');
        this.keyObj4 = this.input.keyboard.addKey('FOUR');
        this.keyObj5 = this.input.keyboard.addKey('FIVE');
        this.keyObj6 = this.input.keyboard.addKey('SIX');
        this.keyObj7 = this.input.keyboard.addKey('SEVEN');
        //this.keys = scene.input.keyboard.addKeys('1,2,3,4,5,6,7');
         this.keyObj1.on('down', function(event){//Comando para teste
             if(this.item_coletado[0]!=null){
             this.scene.launch('desc',this.item_coletado[0]);// Linha de teste pra testar a criação da Cena descrição
             this.scene.pause();
             }
         },this);
        this.keyObj2.on('down', function(event){//Comando para teste
             if(this.item_coletado[1]!=null){
             this.scene.launch('desc',this.item_coletado[1]);// Linha de teste pra testar a criação da Cena descrição
             this.scene.pause();
             }
         },this);
        this.keyObj3.on('down', function(event){//Comando para teste
             if(this.item_coletado[2]!=null){
             this.scene.launch('desc',this.item_coletado[2]);// Linha de teste pra testar a criação da Cena descrição
             this.scene.pause();
             }
         },this);
        this.keyObj4.on('down', function(event){//Comando para teste
             if(this.item_coletado[3]!=null){
             this.scene.launch('desc',this.item_coletado[3]);// Linha de teste pra testar a criação da Cena descrição
             this.scene.pause();
             }
         },this);
        this.keyObj5.on('down', function(event){//Comando para teste
             if(this.item_coletado[4]!=null){
             this.scene.launch('desc',this.item_coletado[4]);// Linha de teste pra testar a criação da Cena descrição
             this.scene.pause();
             }
         },this);
        this.keyObj6.on('down', function(event){//Comando para teste
             if(this.item_coletado[5]!=null){
             this.scene.launch('desc',this.item_coletado[5]);// Linha de teste pra testar a criação da Cena descrição
             this.scene.pause();
             }
         },this);
        this.keyObj7.on('down', function(event){//Comando para teste
             if(this.item_coletado[6]!=null){
             this.scene.launch('desc',this.item_coletado[6]);// Linha de teste pra testar a criação da Cena descrição
             this.scene.pause();
             }
         },this);
        
        
        
        this.keyObj = this.input.keyboard.addKey('P');
        this.keyObj.on('down', function(event){
             this.scene.launch('pause');
             this.scene.pause();
        },this);
        this.events.on('resume', function () {
            this.reseta_inventario_keys();
        },this);
        
        let image = this.make.sprite({
        x: 300,
        y: 190,
        scale: .4,
        key: 'HUD'}).setScrollFactor(0);
        image.setAlpha(.3);
        this.Aleatorio=0;
        
        this.Over_cam = this.make.sprite({
        x: 300,
        y: 190,
        key: 'CAM'}).setScrollFactor(0);
        this.Over_cam.setAlpha(.911);
        this.Aleatorio=0;
        this.map.findObject('Objects', function(object) {
            //items
            if (object.type === 'item') 
            {
                if(object.name=='Lanterna'){
                this.item.add(this.Item_Var = new Item(this, object.x, object.y,object.name));
                this.Item_Var.body.immovable = true;
                this.Item_Var.name = object.name;
                console.log(this.item.body);
                }
            } 
        },this);
        
        
     console.log(this.map.getTileAt(14,26,false,this.colisao));
    }

    /** Update called every tick. */
    update(time, delta) {
        
        /* Potential Phaser 3 bug: fade effects seem to be limited by the camera width and height
        (I'm gussing that is what _ch and _cw variabels are), these look like they are set by the
        game config width and height instead of the camera boundaries. I'm setting them to match the
        level so fade effects cover everwhere the camerea could possibly be. Moved from create so
        fade works after screen resize.
        Weird side note: with arcade physics debug on this doesn't seem to be a problem. */
        this.cameras.main._ch = this.map.heightInPixels;
        this.cameras.main._cw = this.map.widthInPixels;

        // On player room change, stop player movement, fade camerea, and set boundaries.
        if (this.player.roomChange) {

            this.cameras.main.fadeOut(250, 0, 0, 0, function(camera, progress) {
                this.player.canMove = false;
                if (progress === 1) {
                    // Change camera boundaries when fade out complete.
                    this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
                                                this.rooms[this.player.currentRoom].y,
                                                this.rooms[this.player.currentRoom].width,
                                                this.rooms[this.player.currentRoom].height,
                                                true);

                    // Fade back in with new boundareis.
                    this.cameras.main.fadeIn(500, 0, 0, 0, function(camera, progress) {
                        if (progress === 1) {
                            this.player.canMove = true;
                            this.roomStart(this.player.currentRoom);
                            this.Aleatorio = Phaser.Math.Between(0, 1);//calcula a probabilidade do inimigo aparecer
                            console.log(this.Aleatorio);
                            if(this.Aleatorio==1){
                                if(!this.Som_Trovao.isPlaying){
                                this.Som_Trovao.play();
                                }else{this.Som_Trovao_aux.play();}
                                this.Perseguir = true;
                                this.cameras.main.flash(1200);
                                this.inimigo.x = this.player.x;
                                this.inimigo.x = Phaser.Math.Between(this.rooms[this.player.currentRoom].x,
                                                                     this.rooms[this.player.currentRoom].x +this.rooms[this.player.currentRoom].width)
                                this.inimigo.y = Phaser.Math.Between(this.rooms[this.player.currentRoom].y,
                                                                     this.rooms[this.player.currentRoom].y +this.rooms[this.player.currentRoom].height)
                            }
                            else{
                                this.Perseguir = false;
                            }
                        }
                    }, this);
                }
            }, this);
        }
        //Ativa perseguição
        if(this.Perseguir){
        this.gotoXY(this.player.x+this.player.body.width /
        2 + this.player.body.offset.x, this.player.y+this.player.body.height /
        2 + this.player.body.offset.y, this.navMesh);
        }else{
            this.ParaPerseguir();
        }
        
    }
    
    coleta(jogador,item){
        item.destroy();
        console.log(item.texture.key);
        
        this.Array_Pos_HUD = [{id:1,x:220,y:105},{id:2,x:245,y:105},
                              {id:3,x:271,y:105},{id:4,x:295,y:105},
                              {id:5,x:322,y:105},{id:6,x:346,y:105},
                              {id:6,x:370,y:105}]
            
            this.Hud_item = this.make.sprite({
            x: this.Array_Pos_HUD[this.contador].x,
            y: this.Array_Pos_HUD[this.contador].y,
            scale: .4,
            key: item.texture.key
            }).setScrollFactor(0);
         
         this.item_coletado[this.contador]=item.name;
         this.contador++;
         console.log(this.item_coletado);
        if(item.texture.key=='lanterna'){
            this.Over_cam.destroy();
            this.cameras.main.setMask(this.mask);
        }
        
        else if(item.texture.key=='chave1'){
            this.HasChave1 = true;
        }
        else if(item.texture.key=='chave2'){
            this.HasChave0 = true;
        }
        if(this.contador==7){
            this.FIM = true;
        }
        
    }
    Leva(jogador,warp){
        switch(warp.ID){
            case 'warp1':
                this.player.x= 1021;
                this.player.y= 917;
                break;
            case 'warp2':
                this.player.x= 1041;
                this.player.y= 1059;
                break;
            case 'warp3':
                this.player.x= 1317;
                this.player.y= 614;
                break;
            case 'warp4':
                this.player.x= 1172;
                this.player.y= 1065;
                break;
            case 'warp5':
                this.player.x= 932;
                this.player.y= 544;
                break;
            case 'warp6':
                this.player.x= 929;
                this.player.y= 610;
                break;
            case 'warp7':
                this.player.x= 447;
                this.player.y= 1151;
                break;
            case 'warp8':
                this.player.x= 560;
                this.player.y= 1152;
                break;
            case 'warp9':
                this.player.x= 673;
                this.player.y= 630;
                break;
            case 'warp10':
                this.Som_chuva.stop();
                this.scene.stop();
                this.scene.start('Fim');
                break;
        }
        if((warp.ID == 'Saida')&&(this.FIM)){
            this.player.x= 553;
            this.player.y= 1539;
        }
        if((warp.ID == 'Espelho')){
            this.player.x= 673;
            this.player.y= 538;
        }
    }
    retornaChave(ponto){
        if((ponto == 'Porta 1')&&(this.HasChave0)){
            return true;
        }
        else if((ponto == 'Porta 2')&&(this.HasChave1)){
            return true;
        }
        else{
            return false;
        }
    }
    Interagir(jogador, ponto){
            //console.log(ponto.varial);
            //console.log(ponto);
            if(ponto.isPorta){
                this.player.onPoit = true;
                if(this.retornaChave(ponto.varial)){
                this.player.LeftPorta=true;
                this.player.tilecamada = this.colisao;
                this.player.mapa = this.map;
                //console.log(this.doors);
                switch(ponto.varial){
                    case 'Porta 1':
                        this.player.Localiza_porta=1;
                        this.Armazena = [this.doors.getChildren()[0],
                                         this.doors.getChildren()[1]];
                        break;
                    case 'Porta 2':
                        this.player.Localiza_porta=2;
                        this.Armazena = [this.doors.getChildren()[2],
                                         this.doors.getChildren()[3]];
                        
                        break;
                }
                if(this.player.Porta_aberta){
                    //this.player.Porta_Aberta = false;
                    this.player.onPoit = false;
                    this.player.Porta_aberta = false;
                    ponto.destroy();
                    if(ponto.varial=='Porta 1'){
                    this.Armazena[0].body.x=993;
                    this.Armazena[0].body.y=704;
                    this.Armazena[0].body.height=32;
                    this.Armazena[0].body.width=5;
                    
                    this.Armazena[1].body.x=1050;
                    this.Armazena[1].body.y=704;
                    this.Armazena[1].body.height=32;
                    this.Armazena[1].body.width=5;
                    }
                    else{
                    this.Armazena[0].body.x=415;
                    this.Armazena[0].body.y=832;
                    this.Armazena[0].body.height=32;
                    this.Armazena[0].body.width=5;
                    
                    this.Armazena[1].body.x=474;
                    this.Armazena[1].body.y=832;
                    this.Armazena[1].body.height=32;
                    this.Armazena[1].body.width=5;  
                    }
                    this.player.LeftPorta=false;
                    
                
                    //console.log(this.doors.getChildren()[1].body); -->escolha da porta para  modificá-la a partir do index.
                    }
                }else{
                    //CASO O JOGADOR Não tenha a chave
                }
                
            }else if(ponto.isItem){
                this.player.onPoit = true;
                if(this.player.aperta){
                    this.player.onPoit = false;
                    this.Array_Objetos = this.item.children.entries;
                    this.Retorna =  this.Array_Objetos.filter(function(objeto) {
	                   return objeto.name == ponto.varial;
                        });

                console.log(this.Retorna[0]);//chaaaaaaaaaaaaaaa
                this.coleta(this.player,this.Retorna[0]);
                ponto.destroy();
                
                }
            }
    }
    
    roomStart(roomNumber) {//aaaaaaaaaaaaaaa
        if (roomNumber == 4) {
            //this.cameras.main.shake(2500, 0.001, true);
            //console.log(this.player.visited)
        }
    }
     findPath(start, finish) {
    navMesh.debugClear(); // Clears the overlay       
    navMesh.findPath(start, finish, {
        drawPolyPath: false, drawFinalPath: true,
    });
    let path = this.navMesh.findPath(start, finish);
    return path;
    }
    gotoXY(x, y, navMesh) {
    const p2 = new Phaser.Geom.Point(x, y);
    // the entities location, respective to the center of its hit box
    const trueX = this.inimigo.x+this.inimigo.body.width /
    2 + this.inimigo.body.offset.x;
    const trueY = this.inimigo.y+this.inimigo.body.height /
          2 + this.inimigo.body.offset.y;
    const p1 = new Phaser.Geom.Point(trueX, trueY);
    // cool library magic
    const path = navMesh.findPath(p1, p2);
    /* 0. up
    *  1. right
    *  2. down
    *  3. left
    */
    if (path) {
        /*if (path.length === 2 && Math.abs(path[1].x - trueX) < 5
        && Math.abs(path[1].y - trueY) < 5) {
        this.idlehere();
        return;
}*/
        // confusing code
        Math.abs(path[1].x - trueX) >= Math.abs(path[1].y - trueY) ?
         this.moveInDirection(((path[1].x - trueX < 0)*2)+1, false) :
          this.moveInDirection((path[1].y - trueY > 0)*2, false);
        }else{
          this.ParaPerseguir(); 
        }
        
        /*else{
            this.idlehere();
        }*/
    }
     ParaPerseguir(){
    this.inimigo.x= 782;
    this.inimigo.y= 114;     
    this.inimigo.body.velocity.x = 0;
    this.inimigo.body.velocity.y = 0;
         this.direcao ='down';
    this.inimigo.anims.play('stand-' + this.inimigo.direction, true);

     }
       moveInDirection(direction, sprint) {
        let dir = '';
        if (_.isString(direction) && _.includes(DIRECTIONS, direction)) {
            dir = direction.toLowerCase();
 } else if (_.isNumber(direction) && _.inRange(direction, 0, 4)) {
            dir = this.DIRECTIONS[direction];
        } else {
            console.log(direction);
            console.error('Invalid direction');
            return;
        }
        switch (dir) {
            case 'up':
                this.inimigo.body.velocity.y = -this.speed;
                this.inimigo.body.velocity.x = 0;
                this.inimigo.direction = 'up';
                break;
            case 'down':
                this.inimigo.body.velocity.y = this.speed;
                this.inimigo.body.velocity.x = 0;
                this.inimigo.direction = 'down';
                break;
            case 'right':
                this.inimigo.body.velocity.x = this.speed;
                this.inimigo.body.velocity.y = 0;
                this.inimigo.direction = 'right';
                break;
            case 'left':
                this.inimigo.body.velocity.x = -this.speed;
                this.inimigo.body.velocity.y = 0;
                this.inimigo.direction = 'left';
                break;
            default:
                console.error('Invalid direction');
                return;
        }
        this.inimigo.anims.play('anda-' + dir, true);
        //this.adjustHitbox('walk');
}
    reseta_inventario_keys(){
        this.keyObj1.reset();
        this.keyObj2.reset();
        this.keyObj3.reset();
        this.keyObj4.reset();
        this.keyObj5.reset();
        this.keyObj6.reset();
        this.keyObj7.reset();
           
    }
}
