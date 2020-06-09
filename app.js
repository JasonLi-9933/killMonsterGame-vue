new Vue ({
  el: "#app",
  data: {
    seen: true, //Toggles which button section will be rendered.
    myBarWidth: "100%",
    myHealth: 100,
    monsterBarWidth: "100%",
    monsterHealth:100,
    actions:[ ] //Contains all the info of all actions in one game.
  },

  methods: {
    startAagin: function() {
      // Renew all the data
      this.seen = !this.seen;
      this.myBarWidth = "100%";
      this.myHealth = 100;
      this.monsterBarWidth = "100%";
      this.monsterHealth = 100;
      this.actions = [];
    },

    attack: function() {
      var myLoss = Math.floor(Math.random() * 12);
      var monsterLoss = Math.floor(Math.random() * 6);
      this.myHealth = this.myHealth - myLoss;
      this.monsterHealth = this.monsterHealth - monsterLoss;
      this.myBarWidth = this.myHealth + '%';
      this.monsterBarWidth = this.monsterHealth + '%';

      this.actions.push({pDmg:monsterLoss, mDmg:myLoss, heal:0 }); //Record the info about the healing action.

      gameCheck(this.myHealth, this.monsterHealth);
    },

    sAttack: function() {
      var myLoss = Math.floor(Math.random() * 12);
      var monsterLoss = Math.floor( (Math.random()+4) * 9);
      this.myHealth = this.myHealth - myLoss;
      this.monsterHealth = this.monsterHealth - monsterLoss;
      this.myBarWidth = this.myHealth + '%';
      this.monsterBarWidth = this.monsterHealth + '%';

      this.actions.push({pDmg:monsterLoss, mDmg:myLoss, heal:0 });//Record the info about the super-attack action.

      gameCheck(this.myHealth, this.monsterHealth);
    },

    heal: function() {
      var myLoss = Math.floor(Math.random() * 12);
      var myGain = Math.floor( (Math.random()+2) * 15);
      this.myHealth = this.myHealth - myLoss;

      if ( (this.myHealth+myGain) >= 100 ) { //Make sure the player cannot be over-healed.
        myGain = 100 - this.myHealth;
        this.myHealth = 100;
      }
      this.myBarWidth = this.myHealth + '%';

      this.actions.push({pDmg:0, mDmg:myLoss, heal:myGain}); //Record the info about the heal action.

      gameCheck(this.myHealth, this.monsterHealth);
    },

    giveUp: function() {
      this.seen = !this.seen;
    },


  }
});

function gameCheck(myHealth, monsterHealth) { //Check if the game is over after each round.
  if (myHealth <= 0 && monsterHealth > 0) {
    alert("You are dead!");
  }

  else if ( myHealth > 0 && monsterHealth <= 0 ) {
    alert("Congrats, you have slayed the monster!")
  }
};
