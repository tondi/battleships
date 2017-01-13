	/* 1. Generowanie tablicy */
	var tab = new Array(12);
	for(var x = 0; x < 12; x++){
		tab[x] = new Array(12);
	}

	/* 2. Wypełnianie jej zerami */

	for(var x1 = 0; x1 < 12; x1++){
		for(var x2 = 0; x2 < 12; x2++)
			tab[x1][x2] = 0;
		}
	 
	//sconsole.log(tab);

	/////////////
	/* FUNKCJE */
	/////////////


	function rand(min, max){
		min = parseInt( min, 10 );
		max = parseInt( max, 10 );
		return Math.floor( Math.random() * ( max - min + 1 ) + min );
	}


	function sprawdzPoziomo(x, y, masztow){
		//x = 8;
		//y = 8;
		//console.log(tab[12][9]);
		for(var k = -1; k < masztow + 1; k++){
			//console.log(k);
			for(var i = -1; i < 2; i++){
				//console.log((x+k),(y+i));
				if(tab[x+k][y+i] == 2){
					return false;
				}else
					continue;
					
					
			}
		}
		return true;
	}

	function sprawdzPionowo(x, y, masztow){
		
		for(var k = -1; k < masztow + 1; k++){
			for(var i = -1; i < 2; i++){
				//console.log((x+i),(y+k));
				if(tab[x+i][y+k] == 2){
					return false;
				}else
					continue;
			
			}
		
		}
		return true;
	}
		
	function wstawPoziomo(x, y, masztow){
		for(var k = -1; k < masztow + 1; k++){
			for(var i = -1; i < 2; i++){
				tab[x+k][y+i] = 1;
			}
		}
		for(var p = 0; p < masztow; p++){
			tab[x+p][y] = 2;
		}
	}


	function wstawPionowo(x, y, masztow){
		for(var k = -1; k < masztow + 1; k++){
			for(var i = -1; i < 2; i++){
				tab[x+i][y+k] = 1;
			}
		}
		for(var p = 0; p < masztow; p++){
			tab[x][y+p] = 2;
		}
	}

	///////////////
	/* DALEJ KOD */
	///////////////

	var b = 1;

	var postawionych = 0;


	var x;
	var y;
	var kierunek;
	var flaga;



	for(var masztow = 4; masztow > 0; masztow--){ // 6. Powtarzam dla kolejnych statków
		console.log("Masztow: 	" + masztow);
		
		for(var c = 0; c < b; c++){
			console.log("Kolejny statek...");
			
			
			flaga = 0;
			
			while(flaga == 0){
				
				
				// Losowanie kierunku
				
				kierunek = Math.floor(rand(0,1)); // 0 = poziomy
				
				// Losowanie miejsca wstawienia statku
				
				if(kierunek == 0){
					x = rand(1, (10 - masztow + 1));
					y = rand(1,10);							
				}else{
					x = rand(1,10);
					y = rand(1,(10 - masztow + 1));
				}
				
				console.log("Wspolrzedne: " + x, y, "Kierunek: " + kierunek);
			
				
				// 5. w zależności od kierunku sprawdź czy wszytkie elementy tablicy gdzie ma znaleźć się statek - oraz sąsiadujące - nie są zajęte (w tablicy są zera)
				

				if(kierunek == 0){
					if(sprawdzPoziomo(x, y, masztow) == true){
						wstawPoziomo(x, y, masztow);
						
						console.log("..Postawiony!");
						postawionych++;
						flaga = 1;
						
						console.log(tab.join("\n"));
					}else
						console.log("Zajete");
					
				}else{
					if(sprawdzPionowo(x, y, masztow) == true){
						wstawPionowo(x, y, masztow);
						tab[x][y] = 2;
						console.log("..Postawiony!");
						postawionych++;
						flaga = 1;
						
						console.log(tab.join("\n"));			
					}else
						console.log("Zajete");
					
				}
			}
			
		}
		
		b++;
	}



	console.log("Postawionych " + postawionych);

	//////////////////////////////
	////// Tworzenie planszy//////
	//////////////////////////////

	var element = new Array(10);
	for(var q = 0; q < 10; q++){
		element[q] = new Array(10);
	}

	//// Tworzenie planszy divów
	for(p = 0; p < 10; p++){
		for(var r = 0; r < 10; r++){
			element[p][r] = document.createElement('div');
			element[p][r].id = p +" "+ r;
		}
	}

	////// Nadawanie im klasy zaleznej od wartosci komorki tabeli
	for(p = 1; p < 11; p++){
		for(r = 1; r < 11; r++){
			if(tab[p][r] == 0){
				element[p-1][r-1].className = "c";
			}
			else
				if(tab[p][r] == 1){
					element[p-1][r-1].className = "b";
				}
				else
					if(tab[p][r] == 2){
						element[p-1][r-1].className = "a";
					}
		}
	}


	function abc(){
		for(p = 0; p < 10; p++){
			for(r = 0; r < 10; r++){
					document.getElementById('container').appendChild(element[p][r]);
			}
		}
	}

	//////////////////////////////////////////////////////////////////

	////////// Ładowanie funkcji ///////////////////////////

	function addLoadEvent(func) {
	  var oldonload = window.onload;
	  if (typeof window.onload != 'function') {
		window.onload = func;
	  } else {
		window.onload = function() {
		  if (oldonload) {
			oldonload();
		  }
		  func();
		}
	  }
	}
	addLoadEvent(abc);
	//addLoadEvent(xyz);

