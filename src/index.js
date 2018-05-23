import './styles.less';
import 'esri/themes/light/main.scss';
import 'esri/themes/light/view.scss';
import 'font-awesome/css/font-awesome.css';

import './esriConfig';
import Map from 'esri/Map';
import View from 'esri/views/MapView';

var map = new Map({
    basemap: "streets"
  });

  var view = new View({
    container: "app",  
    map: map           
  });