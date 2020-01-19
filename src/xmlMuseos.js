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
          xmlhttp.open("GET", "http://127.0.0.1:8081/xml/museos.xml", false);

          xmlhttp.onreadystatechange = function(){
		      if((xmlhttp.readyState===4) && (xmlhttp.status===200)){
              
              }
            }
            //3. Lanzamos la consulta HTTP al servidor
            xmlhttp.send();
          
            //4. Creamos el documento XML en memoria
            var xmlDoc=xmlhttp.responseXML;
            
            //5. Mostrar la lista de los nodos relacionados con la raíz
            
            var contenidoMuseo=xmlDoc.getElementsByTagName("atributo");
            
            //Generamos un XML DOM en memoria que será posteriormente cargaremos con los datos requeridos 
            //La forma de generarlo:
            //1. Definimos un árbol DOM con DOM Implementation --- var doc=document.implementation.createDocument("", "", null);
            //2. Definimos los nodos a crear ---- var ContenidoElement = doc.createElement("contenido");
            //3. Introducimos los datos ---- nombreElement.textContent="Museo del Prado";
            //4. Introducimos en el DOM los nodos: padre.appenchild(hijo)
            
            var doc=document.implementation.createDocument("", "", null);
            var raizMuseo = doc.createElement("contenido");
            for (var i=0;i< contenidoMuseo.length;i++){
                var objeto=doc.createElement("museo");
                var nombre=doc.createElement("nombre");
                var lat = doc.createElement("latitud");
                var long = doc.createElement("longitud");     
                
                if (contenidoMuseo[i].attributes.getNamedItem("nombre").nodeValue == "NOMBRE") {
                    
                     var museo=contenidoMuseo[i].innerHTML;
                     
                 }
                     
                          
                if (contenidoMuseo[i].attributes.getNamedItem("nombre").nodeValue == "LATITUD") {
                     
                        
                        var latitud=contenidoMuseo[i].innerHTML;                             
                }  
                  
               if (contenidoMuseo[i].attributes.getNamedItem("nombre").nodeValue == "LONGITUD") {
                        
                    var longitud=contenidoMuseo[i].innerHTML;
                   
                    nombre.textContent=museo; 
                    objeto.appendChild(nombre);
                    raizMuseo.appendChild(objeto);
                    lat.textContent=latitud;
                    objeto.appendChild(lat);
                    long.textContent=longitud;
                    objeto.appendChild(long);
                    raizMuseo.appendChild(objeto);
                  
                
                    }   
                       
              }
               
             doc.appendChild(raizMuseo);
             //console.log(doc); 
             
