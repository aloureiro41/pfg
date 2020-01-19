/* Script de preprocesamiento XML */
		
      //1. Creamos objeto XMLHttpRequest
      if (window.XMLHttpRequest) {
				// Código específico para los navegadores
				// IE7+, Firefox, Chrome, Opera, Safari
				var xmlhttp = new XMLHttpRequest();
                
			} else {
				// Código específico para los navegadores IE6, IE5
				var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
            
            //2. Abrimos el archivo xml en formato asíncrono
          xmlhttp.open("GET", "http://127.0.0.1:8081/xml/parques.xml", false);
          xmlhttp.onreadystatechange = function(){
		      if((xmlhttp.readyState===4) && (xmlhttp.status===200)){
              
              }
            }
            //3. Lanzamos la consulta HTTP al servidor
            xmlhttp.send();
          
            //4. Creamos el documento XML en memoria
            var xmlDoc=xmlhttp.responseXML;
            
            //5. Mostrar la lista de los nodos relacionados con la raíz
            
            var contenidoJardines=xmlDoc.getElementsByTagName("atributo");
            
            //Generamos un XML DOM en memoria que será posteriormente cargaremos con los datos requeridos 
            //La forma de generarlo:
            //1. Definimos un árbol DOM con DOM Implementation --- var doc=document.implementation.createDocument("", "", null);
            //2. Definimos los nodos a crear ---- var ContenidoElement = doc.createElement("contenido");
            //3. Introducimos los datos ---- nombreElement.textContent="Museo del Prado";
            //4. Introducimos en el DOM los nodos: padre.appenchild(hijo)
            
            var doc=document.implementation.createDocument("", "", null);
            var raizJardines = doc.createElement("contenido");
            for (var i=0;i< contenidoJardines.length;i++){
                var objeto=doc.createElement("jardines");
                var nombre=doc.createElement("nombre");
                var lat = doc.createElement("latitud");
                var long = doc.createElement("longitud");     
                
                if (contenidoJardines[i].attributes.getNamedItem("nombre").nodeValue == "NOMBRE") {
                    
                     var jardin=contenidoJardines[i].innerHTML;
                     
                 }
                     
                          
                if (contenidoJardines[i].attributes.getNamedItem("nombre").nodeValue == "LATITUD") {
                     
                        
                        var latitud=contenidoJardines[i].innerHTML;                             
                }  
                  
               if (contenidoJardines[i].attributes.getNamedItem("nombre").nodeValue == "LONGITUD") {
                        
                    var longitud=contenidoJardines[i].innerHTML;
                   
                    nombre.textContent=jardin; 
                    objeto.appendChild(nombre);
                    raizJardines.appendChild(objeto);
                    lat.textContent=latitud;
                    objeto.appendChild(lat);
                    long.textContent=longitud;
                    objeto.appendChild(long);
                    raizJardines.appendChild(objeto);               
                
                    }   
                       
              }
               
             doc.appendChild(contenidoJardines);
             //console.log(doc); 
             
