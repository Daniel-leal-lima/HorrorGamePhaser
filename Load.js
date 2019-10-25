var Loadstate = {
    preload:function(){
        var progressbar = game.add.sprite(game.world.centerX,250,'progress');
        progressbar.anchor.set(.5);
        game.load.setPreloadSprite(progressbar);
        
        game.load.spritesheet('Player','img/personagem.png',16,32);
        game.load.spritesheet('Player2','img/Overworld.png');
        game.load.spritesheet('button','img/flixel-button.png',80,20)

    },
    create:function(){
        console.log('estou rodando load!');
        game.state.start('menu');
    }
}