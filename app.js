new Vue ({
  el: "#app",
  data: {
    gameOn: false, //Toggles which button section will be rendered.
    myBarWidth: "100%",
    myHealth: 100,
    monsterBarWidth: "100%",
    monsterHealth:100,
    actions:[ ] //Contains all the info of all actions in one game.
  },

  methods: {
    startAagin: function() {
      // Renew all the data
      this.gameOn = true;
      this.myHealth = 100;
      this.monsterHealth = 100;
      this.actions = [];
    },

    attack: function() {
      var myLoss = this.monsterDamage();
      var monsterLoss = this.playerDamage();
      this.myHealth = this.myHealth - myLoss;
      this.monsterHealth = this.monsterHealth - monsterLoss;

      this.actions.push({pDmg:monsterLoss, mDmg:myLoss, heal:0 }); //Record the info about the healing action.

      this.gameCheck();
    },

    sAttack: function() {
      var myLoss = this.monsterDamage();
      var monsterLoss = this.playerDamage();
      this.myHealth = this.myHealth - myLoss;
      this.monsterHealth = this.monsterHealth - monsterLoss;

      this.actions.push({pDmg:monsterLoss, mDmg:myLoss, heal:0 });//Record the info about the super-attack action.

      this.gameCheck();
    },

    heal: function() {
      var myLoss = this.monsterDamage();
      var myGain = this.healing();
      this.myHealth = this.myHealth - myLoss;

      if ( (this.myHealth+myGain) >= 100 ) { //Make sure the player cannot be over-healed.
        myGain = 100 - this.myHealth;
        this.myHealth = 100;
      }
      else {
        this.myHealth += myGain;
      }

      this.actions.push({pDmg:0, mDmg:myLoss, heal:myGain}); //Record the info about the heal action.

      this.gameCheck();
    },

    giveUp: function() {
      this.seen = !this.seen;
    },

    playerDamage: function() {
        return Math.floor(Math.random() * 9);
    },

    monsterDamage: function () {
        return Math.floor(Math.random() * 12);
    },

    healing: function () {
        return Math.floor(Math.random() * 20);
    },

    gameCheck: function () { //Check if the game is over after each round. Ask player to try again if they want.
      if (this.myHealth <= 0 && this.monsterHealth > 0) {
        if(confirm("You are dead! Try again?")) {
          this.startAagin();
        }
        else {
          this.gameOn = false;
        }
      }

      else if ( this.myHealth > 0 && this.monsterHealth <= 0 ) {
        if(confirm("Congrats, you have slayed the monster! Try again")) {
          this.startAagin();
        }
        else {
          this.gameOn = false;
        }
      }
    }

  }
});
