 // ==================  FUNCIÓN PARA CALCULAR DXF  ==========================================
 
  
function descargarString(texto, nombreArchivo) {
  const blob = new Blob([texto], { type: 'text/plain' });
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = nombreArchivo;
  a.click();
  window.URL.revokeObjectURL(url);
  
}

// ==================  FUNCIÓN PARA CARGAR CANVAS  ==========================================
 

 

 
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
	 
 	console.log(`Radios: ${Radios}`);
	console.log(`AlturasDomo: ${AlturasDomo}`);	 	 

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
  
  
  // ==================  FUNCIÓN CREAR GEOMETRÍAS  ==========================================
  
 function calcular_geometrias_txt () {
	
	
	// --------- VALORES DEL FORMULARIO ------------
	
	// --------- TIPO DE GEOMETRIA ------------------	
	
	var TipoGeom = document.getElementById("Tipo-domo").value;
	
	// --------- VALORES DEL DOMO ------------------
	
	var nNivelesDomo = Number(document.getElementById("Domo-num-filas").value);
	var nLadosDomo = Number(document.getElementById("Domo-num-lados").value);	
	var AlturaDomo = Number(document.getElementById("Domo-altura").value);	
	var RadioInfDomo = Number(document.getElementById("Domo-radio-inf").value);
	
	
	// -------- VALORES DEL TAMBOR ----------------
	
	//var HayDiagTambor = document.getElementsByName("Tambor-diag")[0].checked;
	//var HayHorizTambor = document.getElementsByName("Tambor-horiz")[0].checked;
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
	var ColorTamborHorz = ColorDomoHoriz	
	var ColorTamborDiag = ColorDomoDiag
	
	
	
	
	
	
	
	
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
	}
	
	
	var Radios = Geometria[0];
	var AlturasDomo = Geometria[1];
	
	
	var nLados = nLadosDomo; //15;
	var nNivelesDomo = nNivelesDomo + 1;
	
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
		
		Alturas.push(AlturasDomo[i] +  AlturaTotalTambor)
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
	
	
	// AQUÍ CALCULO LOS VALORES DE LAS LONGITUDES DE LAS BARRAS
	//Radios
	//alturas
	
	LongDiagonales = [];
	LongHorizontales = [];
	
	ai = [];
	apoi = [];
	bi = [];
	ci = [];
	di = [];
	hi = [];
	
	 for (let i = 0; i < Radios.length-1; i++){
		var a = 2 * Radios[i] * Math.sin(0.5 * AngQuesito);
		var apo = Math.sqrt(Radios[i]**2 -(0.5*a)**2);
		var b = apo - Radios[i+1];
		var c = Math.sqrt((0.5*a)**2 + b**2);
		var h = Alturas[i+1] - Alturas[i];
		var d = Math.sqrt(h**2 + c**2);
		
		hi.push(h);
		LongDiagonales.push(d);
		LongHorizontales.push(a);	 
	 } 
	
	console.log(`LongDiagonales: ${LongDiagonales}`);
	console.log(`LongHorizontales: ${LongHorizontales}`);
	
	
	
	
	
	
	

	

	

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
	
	return([CoordTodosNiveles,LongDiagonales,LongHorizontales, Radios, Alturas,hi]);
	

} // CIERRE DE FUNCIÓN




 
function calcula_txt(){
	
	

	var DatosDomo = calcular_geometrias_txt ();
	var Radios = DatosDomo[3];
	var Alturas = DatosDomo[4];
	var LongDiagonales = DatosDomo[1];
	var LongHorizontales= DatosDomo[2];
	var hi = DatosDomo[5]

// DESCARGA EL FICHERO CON EL NOMBRE DE ARCHIVO
	var TipoGeom = document.getElementById("Tipo-domo").value;
	var LadosDomo = Number(document.getElementById("Domo-num-lados").value);
	var AlturaDomo = Number(document.getElementById("Domo-altura").value);
	var nNivelesTambor = Number(document.getElementById("Tambor-num-filas").value);
	var nNivelesDomo = Number(document.getElementById("Domo-num-filas").value);
	var AlturaNivelTambor = Number(document.getElementById("Tambor-alt-filas").value);
	var RadioInfDomo = Number(document.getElementById("Domo-radio-inf").value);	
	
	var nNiveles =  nNivelesTambor +nNivelesDomo
	
	let AlturaTotal = AlturaDomo + nNivelesTambor * AlturaNivelTambor;
	
	var NombreArchivo = "Palitroques_" +TipoGeom + " (Diam" + 2* RadioInfDomo +"m_Alt" + AlturaTotal +"m)"+ ".txt";	

	var nPalos = 2 * LadosDomo * (nNivelesDomo + nNivelesTambor);
	let CadenaTexto = "";
	CadenaTexto = CadenaTexto + "\r\n";		
	CadenaTexto = CadenaTexto + "================================================ REVOLUTION DOMES ===============================================" + "\r\n";	
	CadenaTexto = CadenaTexto + "\r\n";		
	CadenaTexto = CadenaTexto + "- DATOS GLOBALES" + "\r\n";	
	CadenaTexto = CadenaTexto + "\r\n";			
	CadenaTexto = CadenaTexto + "  TIPO DE GEOMETRIA: " + TipoGeom + "\r\n";
	CadenaTexto = CadenaTexto + "  NÚMERO LADOS POLÍGONO: " + LadosDomo + "\r\n";	
	CadenaTexto = CadenaTexto + "  NIVELES DE TAMBOR: " + nNivelesTambor + "\r\n";
	CadenaTexto = CadenaTexto + "  NIVELES DE DOMO: " + nNivelesDomo + "\r\n";	
	CadenaTexto = CadenaTexto + "  NIVELES DE TOTALES: " + nNiveles + "\r\n";		
	CadenaTexto = CadenaTexto + "  RADIO INFERIOR: " + RadioInfDomo + " m" + "\r\n";	
	CadenaTexto = CadenaTexto + "  ALTURA TOTAL: " + AlturaTotal +" m"+ "\r\n";
	CadenaTexto = CadenaTexto + "  NUMERO DE BARRAS: "+ nPalos + " uds" + "\r\n";
	CadenaTexto = CadenaTexto + "\r\n";	
	CadenaTexto = CadenaTexto + "=================================================================================================================" + "\r\n";
	CadenaTexto = CadenaTexto + "\r\n";		
	CadenaTexto = CadenaTexto + "- DATOS POR NIVELES" + "\r\n";	
	CadenaTexto = CadenaTexto + "\r\n";			
	 for (let i = 0; i < nNivelesTambor + nNivelesDomo; i++){
		var j = i+1;
		var h = Alturas[i+1]-Alturas[i];
		CadenaTexto = CadenaTexto + "·NIVEL: " + j + "\r\n";
		CadenaTexto = CadenaTexto + "\r\n";		
		CadenaTexto = CadenaTexto + "  Radio base = " + Radios[i].toFixed(3) + " m" + "\r\n";	
		CadenaTexto = CadenaTexto + "  Altura base = " + Alturas[i].toFixed(3) + " m" + "\r\n"; 
		CadenaTexto = CadenaTexto + "  Long Barra Horizontal = " + LongHorizontales[i].toFixed(3) + " m" + "\r\n"; 
		CadenaTexto = CadenaTexto + "  Long Barra Diagonal = " + LongDiagonales[i].toFixed(3) + " m" + "\r\n"; 
		CadenaTexto = CadenaTexto + "\r\n";	
		CadenaTexto = CadenaTexto + " - - - - - - - - - - - - - - - - - - - " + "\r\n";	
		CadenaTexto = CadenaTexto + "\r\n";		
	}
	

	descargarString(CadenaTexto, NombreArchivo); 
}






