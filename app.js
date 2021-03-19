Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      battleLog: [],
      currentRound: 1,
      specialAttackUsedRound: 0,
      winner: null,
      test: { a: 5 },
    };
  },
  computed: {
    monsterBarStyles() {
      return {
        width: this.monsterHealth > 0 ? `${this.monsterHealth}%` : 0,
      };
    },
    playerBarStyles() {
      return {
        width: this.playerHealth > 0 ? `${this.playerHealth}%` : 0,
      };
    },
    specialAttackDisabled() {
      console.log(this.currentRound + 3 >= this.specialAttackUsedRound);
      return this.currentRound - this.specialAttackUsedRound <= 3;
    },
    playerWinner() {
      return this.winner === 'player';
    },
    monsterWinner() {
      return this.winner === 'monster';
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        this.winner = 'player';
      }
    },
  },
  methods: {
    playerAttack() {
      const atkVal = getRandomValue(5, 7);
      this.monsterHealth -= atkVal;
      this.nextRound('Player Attacks', atkVal);
      console.log(this.battleLog);
    },
    monsterAttack() {
      const atkVal = getRandomValue(8, 7);
      this.playerHealth -= atkVal;
      this.logAction('Monster Attacks', atkVal);
    },
    specialAttackMonster() {
      const atkVal = getRandomValue(10, 15);
      this.monsterHealth -= atkVal;
      this.specialAttackUsedRound = this.currentRound;
      this.nextRound('Player Attacks with Special Attack', atkVal);
    },
    heal() {
      const healVal = getRandomValue(8, 12);
      if (this.playerHealth + healVal > 100) {
        const tempHealth = this.playerHealth;
        this.playerHealth = 100;
        this.nextRound('Player Heals', 100 - tempHealth);
      } else {
        this.playerHealth += healVal;
        this.nextRound('Player Heals', healVal);
      }
    },
    surrender() {
      this.winner = 'monster';
    },
    newGame() {
      this.currentRound = 1;
      this.specialAttackUsedRound = 0;
      this.winner = null;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.battleLog = [];
    },
    nextRound(action, amount) {
      this.monsterAttack();
      this.currentRound++;
      this.logAction(action, amount);
    },
    logAction(action, amount) {
      const event = { action, amount };
      this.battleLog.unshift(event);
    },
  },
}).mount('#game');

function getRandomValue(min, range) {
  return Math.floor(Math.random() * range) + min;
}
