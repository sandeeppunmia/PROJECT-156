AFRAME.registerComponent("game-play", {
    schema: {
      elementId: { type: "string", default: "#coin1" },      
    },
    init:function(){
      var duration=120;
      var timerEl = document.querySelector("#timer")
      this.startTimer(duration,timerEl);
    },
    isCollided: function(elementId) {
      const element = document.querySelector(elementId);
      element.addEventListener("collide", e => {
        if(elementId.includes("#coin")){
          console.log(elementId + "collision")
          element.setAttribute("visible",false);
          this.updateScore();
          this.updateTargets();
        }      
      });
    },

    /*isCollided: function(elementId) {
      const element = document.querySelector(elementId);
      element.addEventListener("collide", e => {
        if (elementId.includes("#coin")) {          
          console.log("coin collision");
          
        }
        else if(elementId.includes("#fish")){
          console.log("fish collision");
        }         
      });
    },*/

    startTimer:function(duration,timerEl){
      var minutes;
      var seconds;

      setInterval(()=>{
        if(duration>=0){
          minutes = parseInt(duration/60);
          seconds = parseInt(duration%60);
          if(minutes<10){
            minutes = "0" + minutes;
          }
          if(seconds<10){
            seconds = "0" +seconds;
          }
          timerEl.setAttribute("text",{
            value:minutes + ":" + seconds,
          })
          duration-=1
        }
        else{
          this.gameOver();
        }
      },1000)
    },

    updateTargets:function(){
      var element = document.querySelector("#targets")
      var count = element.getAttribute("text").value;
      var currentTargets = parseInt(count)
      currentTargets -= 1
      element.setAttribute("text",{
          value:currentTargets
      })

      if(currentTargets == 0){
        this.gameWon();
      }
  },

    updateScore:function(){
      var element = document.querySelector("#score")
      var count = element.getAttribute("text").value;
      var currentScore = parseInt(count);
      currentScore+=50
      element.setAttribute("text",{
        value:currentScore,
      });
    },

    gameOver:function(){
      var diverEl = document.querySelector("#scubaDiver")
      var element = document.querySelector("#game_over_text")
      element.setAttribute("visible",true)
      diverEl.setAttribute("dynamic-body",{
        mass:1
      })
    },

    gameWon:function(){
      var diverEl = document.querySelector("#scubaDiver")
      var element = document.querySelector("#game_won_text")
      element.setAttribute("visible",true)
      diverEl.setAttribute("dynamic-body",{
        mass:1
      })
    },

    update:function(){
      this.isCollided(this.data.elementId)
    }
  });
  