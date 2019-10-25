var MenuState = {
    create:function(){
        button = game.add.button(game.world.centerX,300,'button',action,0,1,2);
        button.anchor.set(.5)
        button.scale.set(2.5)
        var ontext = game.add.text(game.world.centerX,150,'MENU',{font:'60px Arial',fill:'#ffcc00'})
        ontext.anchor.set(.5);
        
        var ontextJogar = game.add.text(button.x,button.y,'JOGAR',{font:'30px Arial',fill:'#fff'})
        ontextJogar.anchor.set(.5);
        /*ontextJogar.inputEnabled= true;
        ontextJogar.input.useHandCursor=true;
        ontextJogar.events.onInputDown.add(function(){
            game.state.start('stage1');
        })*/
        
        var ontextTutorial = game.add.text(game.world.centerX,400,'TUTORIAL',{font:'30px Arial',fill:'#fff'})
        ontextTutorial.anchor.set(.5);
        
        var ontextSair = game.add.text(game.world.centerX,500,'SAIR',{font:'30px Arial',fill:'#fff'})
        ontextSair.anchor.set(.5);
        
        console.log('está rodando menu!');
        game.stage.backgroundColor= '#595959';
        /*game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;*/
    }
}
function action(){
    game.state.start('stage1');
}
function Sair(){
    console.log('aaaaaa');
}
function tutorial(){
    console.log('aaaaaa');
}