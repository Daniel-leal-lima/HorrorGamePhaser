var BootState ={
    preload: function(){
        game.load.image('progress','img/progress.png')
        //mapa do tiled 
        game.load.tilemap('desert', 'map/desert.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'map/tmw_desert_spacing.png');
        //--------------
    },
    create:function(){
    game.state.start('load');
    }
}