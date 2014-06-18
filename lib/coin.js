function Coin(numOfFrames) {
    this.currentFrame = 0;
    this.numOfFrames = numOfFrames;
    this.update = function () {
        this.currentFrame++;
        this.currentFrame %= this.numOfFrames;
    };

    this.images = [];
    for (var i = 0; i < this.numOfFrames; i++) {
        this.images[i] = new Image();
        this.images[i].src = "./img/coin/" + i + ".png";
    }

    this.getCurrentFrame = function () {
        return this.images[this.currentFrame];
    };
}

var coin = new Coin(1);