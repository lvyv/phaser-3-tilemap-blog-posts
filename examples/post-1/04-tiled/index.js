/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */

const config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 1200,
  parent: "game-container",
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let controls;

function preload() {
  // this.load.image("tiles", "../assets/tilesets/tuxmon-sample-32px-extruded.png");
  // this.load.tilemapTiledJSON("map", "../assets/tilemaps/tuxemon-town.json");
  this.load.image("tiles", "../assets/tilesets/map-tileset.png");
  this.load.tilemapTiledJSON("map", "../assets/tilemaps/map3.json");
}

function create() {
  const map = this.make.tilemap({ key: "map" });

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  // const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
  const tileset = map.addTilesetImage("map-tileset", "tiles");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  // const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
  const worldLayer = map.createLayer("World", tileset, 0, 0);
  // const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);

  // Phaser supports multiple cameras, but you can access the default camera like this:
  const camera = this.cameras.main;

  // Set up the arrows to control the camera
  const cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5,
    zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
  });

  // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  // Help text that has a "fixed" position on the screen
  this.add
    .text(16, 16, "A E 缩放，箭头滚动", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#3d3d3d",
    })
    .setScrollFactor(0);
}

function update(time, delta) {
  // Apply the controls to the camera each update tick of the game
  controls.update(delta);
}
