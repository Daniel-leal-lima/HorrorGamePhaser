// I like to know my options (https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig).
const config = {

    title: 'this game -Test',           // The title of the game. Shown in the browser console.

    url: 'http://deeznut',    // The URL of the game. Shown in the browser console.

    version: 'ery early version',   // The version of the game. Shown in the browser console.

    autoFocus: true,                // Automatically call window.focus() when the game boots.
                                    // Usually necessary to capture input events if the game is in
                                    // a separate frame.

    input: {
        keyboard: true,     // Keyboard input configuration. true uses the default configuration and false disables keyboard input.
        mouse: true,        // Mouse input configuration. true uses the default configuration and false disables mouse input.
        gamepad: true,      // Gamepad input configuration. true enables gamepad input.
    },

    disableContextMenu: true,       // Disable the browser's default 'contextmenu' event (usually
                                    // triggered by a right-button mouse click).

    // Physics configuration.
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scale: {

        width: 600,
        height: 360,
        zoom: 2
    }, plugins: {
    scene: [
      {
        key: "PhaserNavMeshPlugin", // Key to store the plugin class under in cache
        plugin: PhaserNavMeshPlugin, // Class that constructs plugins
        mapping: "navMeshPlugin", // Property mapping to use for the scene, e.g. this.navMeshPlugin
        start: true
      }
    ]
  }
};
