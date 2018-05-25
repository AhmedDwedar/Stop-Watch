$(function(){
    //all var
    var mode = "false"; //app mode
    //time counter
    var timeCounter = 0;
    // time lap
    var lapCounter = 0;
    //set interval function
    var action;
    // number of laps
    var lapnumber = 0;
    //minutes,seconed,centisecond for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    // on app load show start and lap button
    // this function we put inside it what we want to appeat
    hideshowButtons("#startButton","#lapButton");
    // click on start button
    $("#startButton").click(function(){
         //mode on 
        mode = true;
        // show stop and lap button
        hideshowButtons("#stopButton","#lapButton");
        // start counter
        startAction();
        
    });
    
    
     //click on stop button
    $("#stopButton").click(function(){
        // show the resum and reset
         hideshowButtons("#resumeButton","#resetButton");
        //stop counter
        // to stop the interval use clearinterval
        clearInterval(action);
    });
    //click on resum button
   
    $("#resumeButton").click(function(){
         //show stop and lap
        hideshowButtons("#stopButton","#lapButton");
        //countinue the increase counter
          startAction();
    });
    // click on reset button make all counter zero and reload
    $("#resetButton").click(function(){
        location.reload();
    });
    // click on the lapbutton
    $("#lapButton").click(function(){
       // if mode=on 
       if(mode){
           //stop action
        clearInterval(action);
             //resetlap and print lap detalies
        lapCounter = 0;
        addLap();
            //strat action
        startAction();
       }
        
    });
    
    
    
    //function what we will use it
    function  hideshowButtons(x,y){
        //we head all button
        $(".control").hide();
        // we show the button what we wabt
        $(x).show();
        $(y).show();
    }
   
    
    // function to increase the counter start the counter
    function startAction(){
       action = setInterval(function(){
           timeCounter++;
           lapCounter++;
           //convert the increase to minutes seconds centisecond
           updateTime();
       },10);
    }
    //convert the counters to min sec centiseconds
    function  updateTime(){
        // the timecounter
        //1min60sec*100 centisec = 6000 centisec
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec = 100 centisec
        timeSeconds = Math.floor((timeCounter%6000)/100);
        // centiesec
        timeCentiseconds = (timeCounter%6000)%100;
        // to cahnge text in html
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));
        
        // the lapcounter
         //1min60sec*100 centisec = 6000 centisec
        lapMinutes= Math.floor(lapCounter/6000);
        //1sec = 100 centisec
        lapSeconds = Math.floor((lapCounter%6000)/100);
        // centiesec
        lapCentiseconds = (lapCounter%6000)%100;
        // to change
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }
    //make function to formate our number
    function format(number){
        if(number<10){
            return '0' + number;
        }else{
            return number;
        }
        
    }
    // function to print ditailes
   function addLap(){
        lapnumber++;
           var myLapDetails =
               '<div class="lap">'+
                    '<div class="laptimetitle">'+
                        'Lap'+ lapnumber +
                    '</div>'+
                    '<div class="laptime">'+
                        '<span>'+ format(lapMinutes) +'</span>'+
                        ':<span>'+ format(lapSeconds) +'</span>'+
                        ':<span>'+ format(lapCentiseconds) +'</span>'+
                    '</div>'+
               '</div>';
        $(myLapDetails).appendTo("#laps");
    }
});