var BootState ={
    preload: function(){
        game.load.image('progress','img/progress.png')

    },
    create:function(){
    game.state.start('load');
    }
}