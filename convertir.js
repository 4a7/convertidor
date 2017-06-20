var btnConvertir;
var posiciones_en_alfa={'A': 1, 'C': 3, 'B': 2, 'E': 5, 'D': 4, 'G': 7, 'F': 6, 'I': 9, 'H': 8, 'K': 11, 'J': 10, 'M': 13, 'L': 12, 'O': 15, 'N': 14, 'Q': 17, 'P': 16, 'S': 19, 'R': 18, 'U': 21, 'T': 20, 'W': 23, 'V': 22, 'Y': 25, 'X': 24, 'Z': 26}
var letras={10:"A",11:"B",12:"C",13:"D",14:"E",15:"F",16:"G",17:"H",18:"I",19:"J",20:"K",21:"L",22:"M",23:"N",24:"O",25:"P",26:"Q",27:"R",28:"S",29:"T",30:"U",31:"V",32:"W",33:"X",34:"Y",35:"Z"}
var numeroletra={'V': 22, 'L': 12, 'U': 21, 'P': 16, 'B': 2, 'H': 8, 'S': 19, 'N': 14, 'A': 1, 'Y': 25, 'W': 23, 'X': 24, 'I': 9, 'M': 13, 'K': 11, 'D': 4, 'C': 3, 'G': 7, 'F': 6, 'Z': 26, 'T': 20, 'O': 15, 'R': 18, 'Q': 17, 'E': 5, 'J': 10}
var letrasformato={1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F', 7: 'G', 8: 'H', 9: 'I', 10: 'J', 11: 'K', 12: 'L', 13: 'M', 14: 'N', 15: 'O', 16: 'P', 17: 'Q', 18: 'R', 19: 'S', 20: 'T', 21: 'U', 22: 'V', 23: 'W', 24: 'X', 25: 'Y', 26: 'Z'}
var result;
function deOtraA10(tira,fuente){
	tira=tira.toUpperCase();
	var lista=[];
	var check=1;
	tira=tira+"$";
	for(var i=0;i<tira.length-1;i++){
		var num="";
		if(tira.charAt(i+1)=='(' && ((tira.charAt(i)>='a'&&tira.charAt(i)<='z')||(tira.charAt(i)>='A'&&tira.charAt(i)<='Z'))){
			for(var j=i+2;j<=tira.length-1;j++){
				console.log(tira.charAt(j));
				if(!isNaN(tira.charAt(j))){
					console.log(tira.charAt(j));
					num+=tira.charAt(j);
				}
				else{
					break;
				}
			}
			num=parseInt(num, 10);
			lista.push([tira.charAt(i),num]);
			check=0;
		}
		else if(tira.charAt(i)==')'){
			check=1;
		}
		else if (tira.charAt(i+1)==')' || tira.charAt(i)=="(" || check==0){
			continue;
		}
		else if (tira.charAt(i)=='$'){
			continue;
		}
		else{
			lista.push([tira.charAt(i),0]);
		}
			
	}
	var resultado=0;
	var j=0;
	var w=0;
	lista.reverse();
	for(var i=0;i<lista.length;i++){
		if(isNaN(lista[i][0])){
			j=lista[i][0];
			w=((lista[i][1])*26)+9+posiciones_en_alfa[j];
			w=w*(Math.pow(parseInt(fuente, 10),i));
		}
		else{
			w=(parseInt(lista[i][0], 10))*(Math.pow(parseInt(fuente, 10),i));
		}
		resultado=resultado+w;
	}
	resultado=resultado.toString();
	return resultado;
}
function formato(num){
	var techitos=Math.floor((num-9)/26);
	var digito=(num-9)-(techitos*26);
	if(digito==0){
		digito=26;
		techitos-=1;
	}
	var retorno=letrasformato[digito]+"("+techitos.toString()+")";
	return retorno;
}
function de10aOtro(num,destino){
	num=parseInt(num,10);
	destino=parseInt(destino,10);
	var digitos=[];
	var division=0;
	while(num>0){
		division=num%destino;
		division=division.toString();
		digitos.push(division);
		num=Math.floor((num)/destino);
	}
	digitos.reverse();
	var retorno="";
	for(var i =0;i<digitos.length;i++){
		if(parseInt(digitos[i],10)>9 && parseInt(digitos[i],10)<=35){
			retorno=retorno+letras[parseInt(digitos[i],10)];
		}
		else if (parseInt(digitos[i])>35){
			retorno=retorno+formato(parseInt(digitos[i]));
		}
		else{
			retorno=retorno+digitos[i];
		}
	}
	return retorno;
}
function Convertir() {
	return function(){
		var c_bfuente=document.getElementById("bfuente");
		var c_bdestino=document.getElementById("bdestino");
		var c_nfuente=document.getElementById("nfuente");
		var nfuente=c_nfuente.value;
		var bfuente=c_bfuente.value;
		var bdestino=c_bdestino.value;
		if(isNaN(bfuente)||isNaN(bdestino)){
			result.innerHTML="NaN";
		}
		else{
			try{
				var numres=deOtraA10(nfuente,bfuente);
				numres=de10aOtro(numres,bdestino);
				result.innerHTML=numres;
			}
			catch (err){
				result.innerHTML("Error")
			}
			
		}
		
		
	};
};

var init=function(){
	result=document.getElementById('result')
	btnConvertir=document.getElementById("btn_convertir");
	btnConvertir.onclick=Convertir();
};
init();