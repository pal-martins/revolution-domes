 
// ==================  FUNCIÓN PARA CARGAR CANVAS  ==========================================
 
//console.log(`HayDiagDomo: ${HayDiagDomo}`);
 
 
 function cargaContextoCanvas(idCanvas){
   var elemento = document.getElementById(idCanvas);
   if(elemento && elemento.getContext){
      var contexto = elemento.getContext('2d');
      if(contexto){
         return contexto;
      }
   }
   return FALSE;
 }
 
 
function descargar_imagen() { 

	var TipoGeom = document.getElementById("Tipo-domo").value;
	var AlturaDomo = Number(document.getElementById("Domo-altura").value);
	var nNivelesTambor = Number(document.getElementById("Tambor-num-filas").value);
	var AlturaNivelTambor = Number(document.getElementById("Tambor-alt-filas").value);
	var RadioInfDomo = Number(document.getElementById("Domo-radio-inf").value);	
	
	let AlturaTotal = AlturaDomo + nNivelesTambor * AlturaNivelTambor;
	var NombreArchivo = "Palitroques_" + TipoGeom + " (Diam" + 2* RadioInfDomo +"m_Alt" + AlturaTotal +"m)"+ ".png";
 	
	const canvas = document.getElementById('micanvas');
	const dataURL = canvas.toDataURL('image/png');

	const link = document.createElement('a');
	link.href = dataURL;
	link.download = "Palitroques_" + TipoGeom + " (Diam" + 2* RadioInfDomo +"m_Alt" + AlturaTotal +"m)"+ ".png";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
} 


function descargarString(texto, nombreArchivo) {
  const blob = new Blob([texto], { type: 'text/plain' });
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = nombreArchivo;
  a.click();
  window.URL.revokeObjectURL(url);
  
}


 
// ==================  FUNCIÓN SABER SI ES PAR  ==========================================

function esPar(numero) {
  return numero % 2 === 0;
}

function esImpar(numero) {
  return numero % 2 !== 0;
}


// ==================  FUNCIÓN POLARES A CARTESIANAS  ==========================================

 function PolarToCart (PtoPolar) {
	for (let i = 0; i < PtoPolar.length; i++){
		let rho = PtoPolar[0];
		let theta = PtoPolar[1];
		let x = rho * Math.cos(theta);
		let y = rho * Math.sin(theta);
		if (PtoPolar.length == 3) {
			let z = PtoPolar[2];	
			var PtoCart = [x,y,z];
		} else {
			var PtoCart = [x,y];
		}			
	}
	
	return PtoCart;
}	
 
 
 // ==================  FUNCIÓN CALCULAR MÁXIMO DE UNA LISTA  ==========================================
 function MaxDeLista (Lista) {
	let Max = Lista[0];

	for (let Numero of Lista ) {

		if (Max < Numero){
			Max = Numero;
		}
	}
	return Max;
 }
 
  // ==================  FUNCIÓN CALCULAR MÍNIMO DE UNA LISTA  ==========================================
 function MinDeLista (Lista) {
	let Min = Lista[0];

	for (let Numero of Lista ) {

		if (Min > Numero){
			Min = Numero;
		}
	}
	return Min;
 }
 
 
 
 
 // ==================  FUNCIÓN CALCULAR LA GEOMETRÍA DOMO TENDIDO  ==========================================
 
 function CalcularDomoTendido (nLadosDomo, nNivelesDomo, AlturaDomo, RadioInfDomo) {
	 
	 let D = Math.sqrt(AlturaDomo**2 + RadioInfDomo **2);

	 let Alfa = Math.atan(RadioInfDomo/AlturaDomo);
	 let R = D / (2 * Math.cos(Alfa)) ;

	 let Beta = 2 * ((0.5 * Math.PI) - Alfa);
	 
	 let BetaN = Beta / nNivelesDomo;
	 
	 let ListaBetas = [];
	 let Radios = [];
	 let AlturasDomo = [];
	 for (let i = 0; i <= nNivelesDomo; i++){
		 ListaBetas.push((Beta - i * BetaN)* 180 /Math.PI);
		 let Betai = Beta - i * BetaN;
		 Radios.push(R * Math.sin(Betai));
		 AlturasDomo.push(R * Math.cos(Betai) - (R - AlturaDomo));		 
	 } 
	 
	 

	return ([Radios, AlturasDomo]);
 } 
  
  
  // ==================  FUNCIÓN CALCULAR LA GEOMETRÍA ZOME  ==========================================
  
 function CalcularZome (nLadosDomo, nNivelesDomo, AlturaDomo, RadioInfDomo) {
 
	let Alfa = 2 * Math.PI /nLadosDomo;
	
	let AlturaNivel = AlturaDomo / nNivelesDomo; 
	let AlturasDomo = [];
	
	let nNivelesEcuador = Math.ceil(0.5*nLadosDomo);
	
	for (i=0; i<= nNivelesDomo; i++) {
		AlturasDomo.push(AlturaNivel * i);
     }
  
  
    let RadiosZomeCompleto = []
 	for (i=0; i<= nLadosDomo; i++) {
		RadiosZomeCompleto.push(1 * Math.cos(0.5 * Alfa * (0.5 * nLadosDomo-i)));
    } 
  
	RadiosZomeCompleto.splice(0 , nLadosDomo - nNivelesDomo);
 
	
	
	let Modulo = RadioInfDomo / RadiosZomeCompleto[0];
	let RadiosDomo = [];
	for (i=0; i<= nNivelesDomo; i++) {
		RadiosDomo.push(Modulo * RadiosZomeCompleto[i])
		
	}	
 	console.log(`Radios: ${RadiosDomo}`);
	console.log(`AlturasDomo: ${AlturasDomo}`);	 
   	return ([RadiosDomo, AlturasDomo]);
  
  } 
  
  
  // ==================  FUNCIÓN CALCULAR LA GEOMETRÍA DEL TIPI  ========================================== 
  
function CalcularTipi(nLadosDomo, nNivelesDomo, AlturaDomo, RadioInfDomo){
	
	let AlturaNivel = AlturaDomo / nNivelesDomo;
	let PendienteTipi = AlturaDomo / RadioInfDomo;
	let BaseNivel =  AlturaNivel / PendienteTipi; //base del triángulito que se forma en cada nivel
	
	let AlturasDomo = [];
	let RadiosDomo = [];
	for (let i=0; i<= nNivelesDomo; i++){
		AlturasDomo.push(AlturaNivel * i);
		RadiosDomo.push (RadioInfDomo - i * BaseNivel);
	}
	
	
	console.log(`Radios: ${RadiosDomo}`);
	console.log(`AlturasDomo: ${AlturasDomo}`);	
	return ([RadiosDomo, AlturasDomo]);  
}	
  
  // ==================  FUNCIÓN DIBUJAR EL CANVAS  ==========================================
  
 function calcular_datos () {
	
	// --------- CARGAMOS EL CANVAS ------------
	
	var contexto = cargaContextoCanvas('micanvas'); // Cargo el contexto del canvas en "micanvas", 


	// --------- VALORES DEL FORMULARIO ------------
	
	// --------- TIPO DE GEOMETRIA ------------------	
	
	var TipoGeom = document.getElementById("Tipo-domo").value;
	
	// --------- VALORES DEL DOMO ------------------
	
	var nNivelesDomo = Number(document.getElementById("Domo-num-filas").value);
	var nLadosDomo = Number(document.getElementById("Domo-num-lados").value);	
	var AlturaDomo = Number(document.getElementById("Domo-altura").value);	
	var RadioInfDomo = Number(document.getElementById("Domo-radio-inf").value);	
	var Apuntamiento = Number(document.getElementById("Domo-apuntamiento").value);	// solo G-Dome
	
	// -------- VALORES DEL TAMBOR ----------------
	
	var HayDiagDomo = document.getElementsByName("Domo-diag")[0].checked;
	var HayHorizDomo = document.getElementsByName("Domo-horiz")[0].checked;
		
	
	var nNivelesTambor = Number(document.getElementById("Tambor-num-filas").value);
	var AlturaNivelTambor = Number(document.getElementById("Tambor-alt-filas").value);
	
	
	if  (nNivelesTambor > 0){
		var HayTambor = true;
	} else {
		var HayTambor = false;
	}	
	
	
	var ColorDomoHoriz = document.getElementById("color1").value;	
	var ColorDomoDiag = document.getElementById("color2").value;
	var ColorTamborHoriz = ColorDomoHoriz;	
	var ColorTamborDiag = ColorDomoDiag;
	
	
	
	
	
	
	
	// --------- VALORES DEL DOMO ------------
	
	
	switch (TipoGeom) {
		case "L-Dome":
			Geometria = CalcularDomoTendido (nLadosDomo, nNivelesDomo, AlturaDomo, RadioInfDomo);
		break;
		case "Zome":
			Geometria = CalcularZome (nLadosDomo, nNivelesDomo, AlturaDomo, RadioInfDomo);
		break;
		case "Tipi":
			Geometria = CalcularTipi(nLadosDomo, nNivelesDomo, AlturaDomo, RadioInfDomo);
		break;	
		case "G-Dome":
			Geometria = CalcularDomoGotico(nLadosDomo, nNivelesDomo, AlturaDomo, RadioInfDomo, Apuntamiento);
		break;
	}
	
	
	var Radios = Geometria[0];
	var AlturasDomo = Geometria[1];
	
	
	var nLados = nLadosDomo; //15;
	var nNivelesDomo = nNivelesDomo + 1;
	//var Radios = [4.00, 3.56, 3.00, 2.34, 1.61, 0.82, 0.00, 0.00, 0.00, 0.00, 0.00];
	//var AlturasDomo = [0.00, 0.69, 1.29, 1.78, 2.14, 2.36, 2.44, 2.44, 2.44, 2.44, 2.44];
	
	
	var AngQuesito = 2 * Math.PI / nLados;
	var Diametro = 2 * Radios [0];

	var AlturaTotalTambor = nNivelesTambor * AlturaNivelTambor;	
	var AlturaDomo = AlturasDomo[nNivelesDomo-1];
	var AlturaTotal = AlturaDomo + AlturaTotalTambor;
	var BaseDomo = AlturaTotalTambor;
	var AlturaMono = 1.8;
	
	
	//le sumamos la altura del tambor a las alturas del domo
	var Alturas = [];
	
	for (i=0; i < AlturasDomo.length; i++){
		
		Alturas.push(AlturasDomo[i] +  AlturaTotalTambor);
	}	
		

	// --------- VALORES DEL TAMBOR ------------
	
	var nNivelesTambor = nNivelesTambor;
	var nNiveles = nNivelesDomo + nNivelesTambor;

	var AngQuesito = 2 * Math.PI / nLados;
	
	var RadioMax = MaxDeLista(Radios);	
	var Diametro = 2 * RadioMax;
	var AlturaTotal = AlturaDomo + AlturaTotalTambor;
	
	var RadiosTambor = [];
	var AlturasTambor = [];
	var RadioTambor = Radios[0];
	
	for (let i = nNivelesTambor-1; i >=0 ; i--){
			
		Radios.unshift(RadioTambor);
		Alturas.unshift(AlturaNivelTambor * (i)); 
	}	
	
	
	

	

	

     // --------- GENERAMOS LISTAS DE ÁNGULOS POR NIVELES (PAR O IMPAR) ------------
	 
	var AngulosPar = [];
	var AngulosImpar =[];
	for (let i = 0; i < nLados; i++) {
		let Ang = AngulosPar.push(AngQuesito * i);
			Ang = AngulosImpar.push(AngQuesito * i + 0.5 * AngQuesito);
	}
	
	
	
     // --------- GENERAMOS LISTAS DE PUNTOS DE COORDENADAS (LISTA DE FILAS) ------------	
	 // PASAMOS DE COORDENADAS POLARES A CARTESIANAS
	 
	
	var CoordTodosNiveles = []  //Lista con las listas de las coordenadas por niveles
	var CoordNivel =[]			//Lista con las coordenadas de cada nivel
	
	for (let j = 0; j < nNiveles; j++) {
		var CoordNivel = []
		for (let i = 0; i < nLados; i++) {
			if (esPar(j)){
				let CoordPtoPolar = [Radios[j], AngulosPar[i], Alturas[j]];
				var CoordPtoCart = PolarToCart(CoordPtoPolar);
			} else {
				let CoordPtoPolar = [Radios[j], AngulosImpar[i], Alturas[j]];
				var CoordPtoCart = PolarToCart(CoordPtoPolar);
			}	
			CoordNivel.push(CoordPtoCart);
		}
		CoordTodosNiveles.push(CoordNivel)
	}
	



	// --------- CARGAMOS EL CANVAS ------------
	if(contexto){
			
			
			
		//VARIABLES DEL CANVAS
	   	var AnchoCanvas = micanvas.width;
		var AltoCanvas = micanvas.height;
		
		var AltoPlanta = 1/2 * AltoCanvas;
		var AnchoPlanta = micanvas.width;
		
		var AltoAlzado = 1/2 * AltoCanvas;
		var AnchoAlzado = micanvas.width;
		
		var CentroPlantaY = AltoCanvas - 0.5 * AltoPlanta;
		var CentroPlantaX = 0.5 * AnchoPlanta;
		
		var CentroAlzadoX = 0.5 * AnchoAlzado
		var CentroAlzadoY = 1/2 * AltoCanvas;
		
		
		

		
		contexto.textAlign = "right";
		contexto.font = "12px serif";
		ColorCota = "#7c7c7c"

		
		
		//  ------  REAJUSTAMOS LAS PROPORCIONES DEL DOMO  ------------------
		
		var AlturaMaxima = Math.max(AlturaTotal, AlturaMono, Diametro)		
		var AjusteZoom = AltoAlzado / (1.1 * AlturaMaxima);		
		
		Diametro = AjusteZoom * Diametro;
		AlturaDomo = AjusteZoom * AlturaDomo;
		AlturaTotal = AjusteZoom * AlturaTotal;
		BaseDomo = AjusteZoom * BaseDomo;		
		
		
		
		for (let j = 0; j < CoordTodosNiveles.length; j++){
			for (let i = 0; i < CoordTodosNiveles[0].length; i++) {
				for (let z = 0; z < CoordTodosNiveles[0][0].length; z++) {
					
					CoordTodosNiveles[j][i][z] = AjusteZoom * CoordTodosNiveles[j][i][z];
				}
			}
		}
		
				
		
		//  ----------  LIMPIAMOS EL CANVAS  --------------
		contexto.clearRect(0, 0, micanvas.width, micanvas.height);
		
		//  -----------  DIBUJAMOS LA BASE  ----------------
		contexto.lineWidth = 1;
		contexto.strokeStyle = "#7c7c7c";
		contexto.beginPath();
		contexto.moveTo(0,AltoCanvas - AltoPlanta);
		contexto.lineTo(AnchoCanvas, AltoCanvas - AltoPlanta);
		contexto.stroke();
		contexto.closePath();		
		
		
		
		// --------- DIBUJAMOS LAS COTAS  -----------------

		//COTA DIÁMETRO DOMO EN PLANTA 
		DistCota = 1.2;
		DistCota2 = 1.6;
		
		DistTextoCota = 1.25;
		DistTextoCota2 = 1.65

		
		//COTA RADIO DOMO EN PLANTA

		
		
		//COTA RADIO DOMO EN PLANTA

		var DiametroTambor = 2 * RadioInfDomo * AjusteZoom;

		
		
		
		
		
		
		
		
		
		
		
		
		
		

		
		// --------- DIBUJAMOS EL MONO  -----------------

		var PtosMono = [[0,0],[-0.2,0],[0.15,0],[0,0.8],[-0.2,1.4],[0.2,1.5],[-0.3,0.8],[0.4,0.8],[-0.05,1.44],[0.05,1.46],[-0.1,1.7],[0.1,1.7],[0,1.8]];
		var LineasMono = [[1,3],[2,3],[3,4],[4,5],[3,5],[4,6],[5,7],[8,10],[10,12],[9,11],[11,12]];
		
		for (let i = 0; i < PtosMono.length; i++){
			PtosMono[i][0] = CentroAlzadoX + DistCota*(0.5 * Diametro) + AjusteZoom * PtosMono[i][0];
			PtosMono[i][1] = CentroAlzadoY - AjusteZoom * PtosMono[i][1];
		}
		
		
		contexto.lineWidth = 2;
		contexto.strokeStyle = "#83ff00";
		
		for (let i = 0; i < LineasMono.length; i++){
			var Pto1 = LineasMono[i][0];
			var Pto2 = LineasMono[i][1];
			contexto.beginPath();
			contexto.moveTo(PtosMono[Pto1][0] , PtosMono[Pto1][1]);
			contexto.lineTo(PtosMono[Pto2][0] , PtosMono[Pto2][1]);
			contexto.stroke();
			contexto.closePath();
		}
		
		
		//  =========================  DIBUJAMOS LA PLANTA  ====================================================
		
		//DIBUJAMOS LAS HORIZONTALES DE LA PLANTA
		if (HayHorizDomo){
			for (let j = 0; j < nNiveles; j++){
				
				if(j < nNivelesTambor){
					var ColorHoriz = ColorTamborHoriz;
					var ColorDiag = ColorTamborDiag;
				} else {
					var ColorHoriz = ColorDomoHoriz;
					var ColorDiag = ColorDomoDiag;
				}	
									
				contexto.lineWidth=1;
				contexto.strokeStyle = ColorHoriz;
				contexto.beginPath();
				contexto.moveTo(CentroPlantaX + CoordTodosNiveles [j][0][0] , CentroPlantaY - CoordTodosNiveles [j][0][1] );
				
				for (let i = 0; i < nLados; i++) {
					
					contexto.lineTo(CentroPlantaX + CoordTodosNiveles [j][i][0] , CentroPlantaY - CoordTodosNiveles [j][i][1] );		
				}
				
				contexto.lineTo(CentroPlantaX + CoordTodosNiveles [j][0][0] , CentroPlantaY - CoordTodosNiveles [j][0][1] );	
				contexto.stroke();
				contexto.closePath();	
				
			} //Cerramos el dibujo de las horizontales
		} //cerramos condicional de mostrar horizontales

		//DIBUJAMOS LAS DIAGONALES DE LA PLANTA	
		if (HayDiagDomo){	
			for (let j = 0; j < nNiveles-1; j++){
				
				if(j < nNivelesTambor){
					var ColorHoriz = ColorTamborHoriz;
					var ColorDiag = ColorTamborDiag;
				} else {
					var ColorHoriz = ColorDomoHoriz;
					var ColorDiag = ColorDomoDiag;
				}
				
				contexto.lineWidth=1;
				contexto.strokeStyle = ColorDiag;
				
				if (esPar(j)){
				
					contexto.beginPath();
					contexto.moveTo(CentroPlantaX + CoordTodosNiveles [j][0][0] , CentroPlantaY - CoordTodosNiveles [j][0][1] );
					
					for (let i = 0; i < nLados; i++) {

						contexto.lineTo(CentroPlantaX + CoordTodosNiveles [j][i][0] , CentroPlantaY - CoordTodosNiveles [j][i][1] );							
						contexto.lineTo(CentroPlantaX + CoordTodosNiveles [j+1][i][0] , CentroPlantaY - CoordTodosNiveles [j+1][i][1] );
					}
					contexto.lineTo(CentroPlantaX + CoordTodosNiveles [j][0][0] , CentroPlantaY - CoordTodosNiveles [j][0][1] );	
					contexto.stroke();
					contexto.closePath();	
				
				} else {			
					
					contexto.beginPath();
					contexto.moveTo(CentroPlantaX + CoordTodosNiveles [j][0][0] , CentroPlantaY - CoordTodosNiveles [j][0][1] );
					
					for (let i = 0; i < nLados-1; i++) {

						contexto.lineTo(CentroPlantaX + CoordTodosNiveles [j][i][0] , CentroPlantaY - CoordTodosNiveles [j][i][1] );							
						contexto.lineTo(CentroPlantaX + CoordTodosNiveles [j+1][i+1][0] , CentroPlantaY - CoordTodosNiveles [j+1][i+1][1] );
					}
					contexto.lineTo(CentroPlantaX + CoordTodosNiveles [j][nLados-1][0] , CentroPlantaY - CoordTodosNiveles [j][nLados-1][1] );						
					contexto.lineTo(CentroPlantaX + CoordTodosNiveles [j+1][0][0] , CentroPlantaY - CoordTodosNiveles [j+1][0][1] );	
					contexto.lineTo(CentroPlantaX + CoordTodosNiveles [j][0][0] , CentroPlantaY - CoordTodosNiveles [j][0][1] );				
					contexto.stroke();
					contexto.closePath();					
				}
			} //Cerramos el dibujo de las diagonales
		} //cerramos condicional de mostrar diagonales
		




		
		//  =========================  DIBUJAMOS EL ALZADO  ====================================================
		
		//DIBUJAMOS LAS HORIZONTALES DEL ALZADO
		if (HayHorizDomo){
			for (let j = 0; j < nNiveles; j++){
				
				if(j < nNivelesTambor){
					var ColorHoriz = ColorTamborHoriz;
					var ColorDiag = ColorTamborDiag;
				} else {
					var ColorHoriz = ColorDomoHoriz;
					var ColorDiag = ColorDomoDiag;
				}
				
				contexto.lineWidth=1;
				contexto.strokeStyle = ColorHoriz;
				contexto.beginPath();
				contexto.moveTo(CentroAlzadoX + CoordTodosNiveles [j][0][0] , CentroAlzadoY - CoordTodosNiveles [j][0][2] );
				
				for (let i = 0; i < nLados; i++) {
					
					contexto.lineTo(CentroAlzadoX + CoordTodosNiveles [j][i][0] , CentroAlzadoY - CoordTodosNiveles [j][i][2] );		
				}
				
				contexto.lineTo(CentroAlzadoX + CoordTodosNiveles [j][0][0] , CentroAlzadoY - CoordTodosNiveles [j][0][2] );	
				contexto.stroke();
				contexto.closePath();	
				
			} //Cerramos el dibujo de las horizontales		
		} //cerramos condicional de mostrar horizontales		
		
		//DIBUJAMOS LAS DIAGONALES DEL ALZADO	
		if (HayDiagDomo){		
			for (let j = 0; j < nNiveles-1; j++){
				
				if(j < nNivelesTambor){
					var ColorHoriz = ColorTamborHoriz;
					var ColorDiag = ColorTamborDiag;
				} else {
					var ColorHoriz = ColorDomoHoriz;
					var ColorDiag = ColorDomoDiag;
				}
				
				contexto.lineWidth=1;
				contexto.strokeStyle = ColorDiag;
				
				if (esPar(j)){
				
					contexto.beginPath();
					contexto.moveTo(CentroAlzadoX + CoordTodosNiveles [j][0][0] , CentroAlzadoY - CoordTodosNiveles [j][0][2] );
					
					for (let i = 0; i < nLados; i++) {

						contexto.lineTo(CentroAlzadoX + CoordTodosNiveles [j][i][0] , CentroAlzadoY - CoordTodosNiveles [j][i][2] );							
						contexto.lineTo(CentroAlzadoX + CoordTodosNiveles [j+1][i][0] , CentroAlzadoY - CoordTodosNiveles [j+1][i][2] );
					}
					contexto.lineTo(CentroAlzadoX + CoordTodosNiveles [j][0][0] , CentroAlzadoY - CoordTodosNiveles [j][0][2] );	
					contexto.stroke();
					contexto.closePath();	
				
				} else {			
					
					contexto.beginPath();
					contexto.moveTo(CentroAlzadoX + CoordTodosNiveles [j][0][0] , CentroAlzadoY - CoordTodosNiveles [j][0][2] );
					
					for (let i = 0; i < nLados-1; i++) {

						contexto.lineTo(CentroAlzadoX + CoordTodosNiveles [j][i][0] , CentroAlzadoY - CoordTodosNiveles [j][i][2] );							
						contexto.lineTo(CentroAlzadoX + CoordTodosNiveles [j+1][i+1][0] , CentroAlzadoY - CoordTodosNiveles [j+1][i+1][2] );
					}
					contexto.lineTo(CentroAlzadoX + CoordTodosNiveles [j][nLados-1][0] , CentroAlzadoY - CoordTodosNiveles [j][nLados-1][2] );						
					contexto.lineTo(CentroAlzadoX + CoordTodosNiveles [j+1][0][0] , CentroAlzadoY - CoordTodosNiveles [j+1][0][2] );	
					contexto.lineTo(CentroAlzadoX + CoordTodosNiveles [j][0][0] , CentroAlzadoY - CoordTodosNiveles [j][0][2] );				
					contexto.stroke();
					contexto.closePath();					
				}
			} //Cerramos el dibujo de las diagonales	
		} //cerramos condicional de mostrar diagonales		
		
		
		
		
	} //Cierre de canvas
	
	


} // CIERRE DE FUNCIÓN