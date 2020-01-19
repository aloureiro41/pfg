/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class MyView1 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;  
       
          
        }
       #mapid{
        position: center;
        width: 100%;
        height: 700px; 
        overflow:visible;
       
       } 


       .leaflet-routing-alternatives-container{
          background:white;
          border:white;
          overflow:auto;

       }

       .leaflet-routing-alt{
        overflow:auto;
     

     }
        
      </style>
      <!-- Definimos la hoja de estilo del mapa para evitar problemas de renderización -->
      <link rel="stylesheet" href="/leaflet/leaflet.css" />
      <div id="mapid"</div>
     
    `;
  }
  
  ready (){

    super.ready();
      
    var mymap = L.map(this.$.mapid).setView([40.41429901123, -3.7016000747681], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18}).addTo(mymap);
    var mylayer=L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                  maxZoom: 18}).addTo(mymap);
        L.control.scale().addTo(mymap);
    //Creamos el icono personalizado para nuestra posición
    var myicon = new L.Icon({ 
      iconUrl: 'images/marker-icon-2x-red.png',
      //shadowUrl: 'img/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    //Nos geoposicionamos
    navigator.geolocation.getCurrentPosition(function(location){
    var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    //Añadimos el marcador de nuestra posición
    var mymarker = L.marker((latlng),{icon: myicon}).addTo(mymap).bindPopup("Mi Posicion actual").openPopup();
    
 
    //Creamos la función para crear los botones necesarios
    function createButton(label, container) {
      var btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
  }
   
  //Añadimos el resto de marcadores de nuestra página
  for (var i=0; i< contenidoMuseo.length;i++){
    var marcadores= L.marker([raizMuseo.childNodes[i].childNodes[1].innerHTML, raizMuseo.childNodes[i].childNodes[2].innerHTML],{ title: raizMuseo.childNodes[i].childNodes[0].innerHTML }, {draggable: true}).addTo(mymap);
    var nuevaPosicion=new L.LatLng(raizMuseo.childNodes[i].childNodes[1].innerHTML,raizMuseo.childNodes[i].childNodes[2].innerHTML);
    var ruta=L.Routing.control;
    //Definimos la función de pulsar sobre el marcador y que nos aparezcan los dos botones de acción   
    marcadores.on('click',function(e){

      var container = L.DomUtil.create('div');
      var rutaBoton = createButton('Calcular Ruta', container);
      var reiniciarBoton = createButton('Reiniciar mapa', container);
      L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(mymap);
      //Cuando pulsamos sobre el boton de calcular ruta, llamamos a la funcionalidad
      // de LeaftLet Routing Machine
      L.DomEvent.on(rutaBoton, 'click', function() {
        //Definimos las propiedades de control de las rutas a definir
        ruta= L.Routing.control({
            waypoints: [
              latlng,
              e.latlng
            ],
            // Se llama al generador de rutas de GraphHopper
            
            router: L.Routing.graphHopper('4ce28a77-309d-46aa-8f5a-2efe973ba858', {
                urlParameters: {
                    vehicle: 'foot',
                    locale: 'es_ES',     
                    
                }
        })
        
          }).addTo(mymap);
          mymap.closePopup();
        
    });

    L.DomEvent.on(reiniciarBoton, 'click', function() {
        
      window.location.reload();
    });

  });
  
  }

    });


}
  
}

window.customElements.define('my-view1', MyView1);
