class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.render.bind(this)();
    $(".tower").on("click", (e)=>{
      let $tower = $(e.currentTarget);
      this.clickTower($tower);
      if (this.game.isWon()) {
        $("li").addClass('won');
        alert('You Win!');
      }
    });
  }


  setupTowers(){
    const $tower1 = $("<ul>").addClass('tower1 tower');
    const $tower2 = $("<ul>").addClass('tower2 tower');
    const $tower3 = $("<ul>").addClass('tower3 tower');
    const $disc1 = $("<li>").addClass('disc1');
    const $disc2 = $("<li>").addClass('disc2');
    const $disc3 = $("<li>").addClass('disc3');
    $tower1.append($disc1, $disc2, $disc3);
    $(".hanoi").append($tower1, $tower2, $tower3);
  }

  render() {
    this.clearTowers();
    this.game.towers.forEach( (tower, towerIdx) => {
      let $tower = $(".tower"+ (towerIdx+1));
      $tower.attr("idx",towerIdx);
      tower.forEach( (disc)  => {
        let $disc = $("<li>").addClass('disc'+disc);
        $tower.prepend($disc);
      });
    });
  }

  clearTowers() {
    $(".tower").children().remove();
  }



  clickTower($tower) {
    if (this.firstClick === undefined) {
      this.firstClick = $tower;
      $tower.addClass('clicked');
    } else {
      const firstClick = this.firstClick.attr("idx");
      const secondClick = $tower.attr("idx");
      if (this.game.isValidMove(firstClick, secondClick)) {
        this.game.move(firstClick, secondClick);
        this.render();
      } else {
        alert("The move is not valid");
      }
      this.firstClick.removeClass('clicked');
      this.firstClick = undefined;
    }

    // firstClick
  }

}

module.exports = View;
