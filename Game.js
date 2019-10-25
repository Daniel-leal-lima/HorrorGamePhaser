var game = new Phaser.Game(800,750,Phaser.AUTO);
game.state.add('boot',BootState);
game.state.add('load',Loadstate);
game.state.add('menu',MenuState);
game.state.add('stage1',stage1State);
game.state.add('stage2',stage2State);
game.state.add('end',EndState);

game.state.start('boot');