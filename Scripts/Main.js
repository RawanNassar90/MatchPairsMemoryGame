var koGame;
$(document).ready(function() {
    koGame = new GameViewModel();
    ko.applyBindings(koGame, document.getElementById("divGame"));
    koGame.getRandomImages();
})
GameViewModel = function() {
    var self = this;
    self.imgsRows = ko.observableArray();
    self.imgsRow1 = ko.observableArray();
    self.imgsRow2 = ko.observableArray();
    self.imgsRow3 = ko.observableArray();
    self.imgsRow4 = ko.observableArray();
    self.allImgesCount = ko.observable(16);
    self.allDisapearedImgesCount = ko.observable(0);
    self.cardsFlipped = ko.observable(0);
    self.displaySuccessMsg = ko.observable('none');
    self.displayImgsRows = ko.observable('inline-block');
    self.score = ko.observable(0);
    self.gameTitle = ko.observable('Match Pairs Memory Game');
    self.disableClickOnImage = ko.observable(true);
    self.clickedImgName = ko.observable("");
    self.clickedImgPositionX = ko.observable(-1);
    self.clickedImgPositionY = ko.observable(-1);
    self.clickedImgIndex = ko.observable(-1);
    self.clickedImgUrl = ko.observable("");
    self.clickedShownImgUrl = ko.observable("");
    self.firstClickedImgIndex = ko.observable(-1);
    self.firstClickedImgPositionX = ko.observable(-1);
    self.firstClickedImgPositionY = ko.observable(-1);
    self.firstCurrentShownImgUrl = ko.observable("");
    self.firstClickedImgName = ko.observable("");
    self.secondClickedImgIndex = ko.observable(-1);
    self.secondClickedImgPositionX = ko.observable(-1);
    self.secondClickedImgPositionY = ko.observable(-1);
    self.secondCurrentShownImgUrl = ko.observable("");
    self.secondClickedImgName = ko.observable("");
    self.emptyImgUrl = ko.observable("url(Images/Images100x100/EmptyImg.png)");
    self.disapearedImgsRowsFirstPart = ko.observableArray();
    self.disapearedImgsRowsSecondPart = ko.observableArray();
    self.getRandomImages = function() {
        koGame.displayImgsRows('inline-block');
        var currentShownImgUrl = "url(Images/Images100x100/EmptyImg.png)";
        var imgSuffixArray = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        var imgUrl;
        for (var i = 0; i < 16; i++) {
           var randomInt = Math.floor(Math.random() * imgSuffixArray.length);
           var  imgUrl = "url(Images/Images100x100/Img" + imgSuffixArray[randomInt] + ".png)";
           var  imgName = "Img" + imgSuffixArray[randomInt] + ".png";
            var imgProps ={
                    'imgName': ko.observable(imgName),
                    'imgIndex': ko.observable(i),
                    'imgUrl': ko.observable(imgUrl),
                    'imgPointerEvent': ko.observable('none'),
                    'currentShownImgUrl': ko.observable(imgUrl)
                }

            if (i < 4) {
                koGame.imgsRow1.push(imgProps);
            } else if (i < 8) {
                koGame.imgsRow2.push(imgProps);
            } else if (i < 12) {
                koGame.imgsRow3.push(imgProps);
            } else if (i < 16) {
               koGame.imgsRow4.push(imgProps);
            }
            imgSuffixArray.splice(randomInt, 1);


        }
        koGame.imgsRows.push(self.imgsRow1);
        koGame.imgsRows.push(self.imgsRow2);
        koGame.imgsRows.push(self.imgsRow3);
        koGame.imgsRows.push(self.imgsRow4);
        setTimeout(function() {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    (koGame.imgsRows()[i])()[j].currentShownImgUrl(koGame.emptyImgUrl());
                }
            }

            setTimeout(function() {
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        (koGame.imgsRows()[i])()[j].imgPointerEvent('auto');
                    }
                }
                koGame.disableClickOnImage(false);

            }, 500);

        }, 2500);

    }

    self.onClickImage = function(data, event) {
        koGame.clickedImgPositionX(-1);
        koGame.clickedImgPositionY(-1);
        koGame.clickedImgIndex(data.imgIndex());
        koGame.clickedImgName(data.imgName());
        koGame.clickedImgUrl(data.imgUrl());
        koGame.clickedShownImgUrl(data.currentShownImgUrl());
        if (koGame.disableClickOnImage()) return false;
        koGame.cardsFlipped(koGame.cardsFlipped() + 1);
        if (koGame.firstClickedImgIndex() != -1 && koGame.secondClickedImgIndex() != -1) {
            if ((koGame.imgsRows()[koGame.firstClickedImgPositionY()])()[koGame.firstClickedImgPositionX()].imgUrl() !=
                (koGame.imgsRows()[koGame.secondClickedImgPositionY()])()[koGame.secondClickedImgPositionX()].imgUrl()) {
                (koGame.imgsRows()[koGame.firstClickedImgPositionY()])()[koGame.firstClickedImgPositionX()].currentShownImgUrl(koGame.emptyImgUrl());
                (koGame.imgsRows()[koGame.secondClickedImgPositionY()])()[koGame.secondClickedImgPositionX()].currentShownImgUrl(koGame.emptyImgUrl());
                koGame.firstClickedImgIndex(-1);
                koGame.secondClickedImgIndex(-1);
                koGame.firstClickedImgPositionY(-1);
                koGame.firstClickedImgPositionX(-1);
                koGame.secondClickedImgPositionY(-1);
                koGame.secondClickedImgPositionX(-1);
            }
            return;
        }


        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if ((koGame.imgsRows()[i])()[j].imgIndex() == koGame.clickedImgIndex()) {
                    (koGame.imgsRows()[i])()[j].currentShownImgUrl(koGame.clickedImgUrl());
                    koGame.clickedImgPositionX(j);
                    koGame.clickedImgPositionY(i);
                    break;
                }
            }
        }

        if (koGame.firstClickedImgIndex() == -1) {
            koGame.firstClickedImgIndex(koGame.clickedImgIndex());
            koGame.firstClickedImgPositionX(koGame.clickedImgPositionX());
            koGame.firstClickedImgPositionY(koGame.clickedImgPositionY());
            koGame.firstCurrentShownImgUrl(koGame.clickedImgUrl());
            koGame.firstClickedImgName(koGame.clickedImgName());
            (koGame.imgsRows()[koGame.firstClickedImgPositionY()])()[koGame.firstClickedImgPositionX()].imgPointerEvent('none');


        } else if (koGame.secondClickedImgIndex() == -1) {
            koGame.secondClickedImgIndex(koGame.clickedImgIndex());
            koGame.secondClickedImgPositionX(koGame.clickedImgPositionX());
            koGame.secondClickedImgPositionY(koGame.clickedImgPositionY());
            koGame.secondCurrentShownImgUrl(koGame.clickedImgUrl());
            (koGame.imgsRows()[koGame.secondClickedImgPositionY()])()[koGame.secondClickedImgPositionX()].imgPointerEvent('none');


            setTimeout(function() {
                if ((koGame.imgsRows()[koGame.firstClickedImgPositionY()])()[koGame.firstClickedImgPositionX()].imgUrl() !=
                    (koGame.imgsRows()[koGame.secondClickedImgPositionY()])()[koGame.secondClickedImgPositionX()].imgUrl()) {
                    (koGame.imgsRows()[koGame.firstClickedImgPositionY()])()[koGame.firstClickedImgPositionX()].currentShownImgUrl(koGame.emptyImgUrl());
                    (koGame.imgsRows()[koGame.secondClickedImgPositionY()])()[koGame.secondClickedImgPositionX()].currentShownImgUrl(koGame.emptyImgUrl());
                    koGame.score(koGame.score() - 5);
                    (koGame.imgsRows()[koGame.firstClickedImgPositionY()])()[koGame.firstClickedImgPositionX()].imgPointerEvent('auto');
                    (koGame.imgsRows()[koGame.secondClickedImgPositionY()])()[koGame.secondClickedImgPositionX()].imgPointerEvent('auto');

                } else {
                    koGame.score(koGame.score() + 5);
                    (koGame.imgsRows()[koGame.firstClickedImgPositionY()])()[koGame.firstClickedImgPositionX()].imgPointerEvent('none');
                    (koGame.imgsRows()[koGame.secondClickedImgPositionY()])()[koGame.secondClickedImgPositionX()].imgPointerEvent('none');
                    (koGame.imgsRows()[koGame.firstClickedImgPositionY()])()[koGame.firstClickedImgPositionX()].currentShownImgUrl("");
                    (koGame.imgsRows()[koGame.secondClickedImgPositionY()])()[koGame.secondClickedImgPositionX()].currentShownImgUrl("");

                    koGame.allDisapearedImgesCount(koGame.allDisapearedImgesCount() + 2);

                    if (koGame.allDisapearedImgesCount() < 9) {
                        koGame.disapearedImgsRowsFirstPart.push({
                            'imgUrl': ko.observable('url(Images/Images20x20/' + koGame.firstClickedImgName() + ')')
                        });
                    }

                    if (koGame.allDisapearedImgesCount() > 9) {
                        koGame.disapearedImgsRowsSecondPart.push({
                            'imgUrl': ko.observable('url(Images/Images20x20/' + koGame.firstClickedImgName() + ')')
                        });
                    }


                    if (koGame.allImgesCount() == koGame.allDisapearedImgesCount()) {
                        koGame.displayImgsRows('none');
                        koGame.displaySuccessMsg('block');
                    }
                }
                koGame.firstClickedImgIndex(-1);
                koGame.secondClickedImgIndex(-1);
                koGame.firstClickedImgPositionY(-1);
                koGame.firstClickedImgPositionX(-1);
                koGame.secondClickedImgPositionY(-1);
                koGame.secondClickedImgPositionX(-1);
            }, 500)

        }
    }
    self.refresh = function(data, event) {

        koGame.disableClickOnImage(true);
        koGame.clickedImgPositionX(-1);
        koGame.clickedImgPositionY(-1);
        koGame.clickedImgIndex(-1);
        koGame.clickedImgUrl("");
        koGame.clickedShownImgUrl("");
        koGame.firstClickedImgIndex(-1);
        koGame.firstClickedImgPositionX(-1);
        koGame.firstClickedImgPositionY(-1);
        koGame.firstCurrentShownImgUrl("");
        koGame.secondClickedImgIndex(-1);
        koGame.secondClickedImgPositionX(-1);
        koGame.secondClickedImgPositionY(-1);
        koGame.secondCurrentShownImgUrl("");
        koGame.cardsFlipped(0);
        koGame.score(0);
        koGame.imgsRow1.removeAll();
        koGame.imgsRow2.removeAll();
        koGame.imgsRow3.removeAll();
        koGame.imgsRow4.removeAll();
        koGame.imgsRows.removeAll();
        koGame.disapearedImgsRowsFirstPart.removeAll();
        koGame.disapearedImgsRowsSecondPart.removeAll();
        koGame.displaySuccessMsg('none');
        koGame.getRandomImages();

    }
    self.getLogoDetails = function() {
        window.location.href = "https://www.linkedin.com/in/rawan-nassar-904/"
    }
}