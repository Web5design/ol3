goog.require('ol.Map');
goog.require('ol.RendererHint');
goog.require('ol.View2D');
goog.require('ol.interaction');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.MapQuestOpenAerial');
goog.require('ol.source.Vector');
goog.require('ol.style.Fill');
goog.require('ol.style.Rule');
goog.require('ol.style.Shape');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');

var raster = new ol.layer.Tile({
  source: new ol.source.MapQuestOpenAerial()
});

var vector = new ol.layer.Vector({
  source: new ol.source.Vector({parser: null}),
  style: new ol.style.Style({
    rules: [
      new ol.style.Rule({
        filter: 'renderIntent("selected")',
        symbolizers: [
          new ol.style.Shape({
            fill: new ol.style.Fill({
              color: '#0099ff',
              opacity: 1
            }),
            size: 16
          }),
          new ol.style.Fill({
            color: '#ffffff',
            opacity: 0.5
          }),
          new ol.style.Stroke({
            color: 'white',
            width: 5
          }),
          new ol.style.Stroke({
            color: '#0099ff',
            width: 3
          })
        ]
      }),
      new ol.style.Rule({
        filter: 'renderIntent("temporary")',
        symbolizers: [
          new ol.style.Shape({
            fill: new ol.style.Fill({
              color: '#0099ff',
              opacity: 1
            }),
            stroke: new ol.style.Stroke({
              color: 'white',
              opacity: 0.75
            }),
            size: 14,
            zIndex: 1
          })
        ]
      })
    ],
    symbolizers: [
      new ol.style.Shape({
        fill: new ol.style.Fill({
          color: '#0033ff',
          opacity: 1
        }),
        size: 14
      }),
      new ol.style.Fill({
        color: 'white',
        opacity: 0.2
      }),
      new ol.style.Stroke({
        color: '#ffcc33',
        width: 1.5
      })
    ]
  })
});

var modeSelect = document.getElementById('mode');

var draw = new ol.interaction.Draw({
  layer: vector,
  mode: /** @type {ol.interaction.DrawMode} */
      (modeSelect.options[modeSelect.selectedIndex].value)
});


/**
 * Let user change the draw mode.
 * @param {Event} e Change event.
 */
modeSelect.onchange = function(e) {
  draw.setMode(/** @type {ol.interaction.DrawMode} */
      (modeSelect.options[modeSelect.selectedIndex].value));
};

var map = new ol.Map({
  interactions: ol.interaction.defaults().extend([draw]),
  layers: [raster, vector],
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    center: [-11000000, 4600000],
    zoom: 4
  })
});
