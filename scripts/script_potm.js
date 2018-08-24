/*-----------------------------------------

    Education Through eXploration
    Arizona State University           

-----------------------------------------*/

var play_btn, playspeed_sldr, valYOU, playpause_boolean, panelTop_btn;

//Document Ready
$(function() {
	//Set variables
	playpause_boolean = true;
	play_pause = $(".play-pause");
  	play_btn = $(".play-pause BUTTON.pause");
  	playspeed_sldr = $("#playspeed");
  	panelTop_btn = $("#subscreen BUTTON.panel-top");
  	taskContainer = $("#task-container"); 

  	//Events
  	play_btn.on("click", playPause);	
  	playspeed_sldr.on("input", playPause2);  
  	panelTop_btn.on("click", toggleCollapse);  
});

function toggleCollapse(){
	taskContainer.toggleClass("height-none");
	panelTop_btn.toggleClass("chev-up chev-down");
	console.log("collapse");
}

//Functions
function playPause(){
	//Get value of playspeed slider
	valYOU = parseInt( playspeed_sldr.val() );

	//Send value to Sim
	gameInstance.SendMessage('SolarSystem', 'UpdateSpeedSliderViaCAPI', valYOU);
	
	//Detect play state
	if(playpause_boolean){
		//pause sim
		play_btn.toggleClass("play", true);
		playpause_boolean = false;

		//Send value to Sim
		gameInstance.SendMessage('SolarSystem', 'UpdateSpeedSliderViaCAPI', 0);
	} else {
		//play sim
		play_btn.toggleClass("play", false);
		playpause_boolean = true;

		if(valYOU == 0){
			//Update play slider
			playspeed_sldr.val(50);

			//Send a default value to Sim
			gameInstance.SendMessage('SolarSystem', 'UpdateSpeedSliderViaCAPI', 50);

		} else {
			//Send value to Sim
			gameInstance.SendMessage('SolarSystem', 'UpdateSpeedSliderViaCAPI', valYOU);
		}
	}
	

	//Toggle play/pause icon (begins with pause icon displayed)
	//play_btn.toggleClass("play");
}

function playPause2(){
	//Get value of playspeed slider
	valYOU = parseInt( $("#playspeed").val() );

	//Detect if paused
	if(!playpause_boolean){
		//change play icon to pause icon
		play_btn.toggleClass("play", false);
		playpause_boolean = true;				
	}

	if(valYOU == 0){
		//change pause icons to play icon
		play_btn.toggleClass("play", true);
		playpause_boolean = false;
	} 
	
	//Send value to Sim
	gameInstance.SendMessage('SolarSystem', 'UpdateSpeedSliderViaCAPI', valYOU);
}


