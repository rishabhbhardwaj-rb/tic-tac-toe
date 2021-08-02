var currentPlayer = "X";
var gameActive = true;

var count = 0;
var gridItems = ["item-1","item-2","item-3","item-4","item-5","item-6","item-7","item-8","item-9"];
var gameState = ["","","","","","","","",""];
function handleItemClick(){
    userClickedIndex = gridItems.indexOf(this.id);
    // console.log(userClickedIndex);
    if(gameState[userClickedIndex] !== "" || !gameActive) return;

    
    gameState[userClickedIndex] = currentPlayer;
    if(currentPlayer === "X"){
        $(this).css("color","#40514E")
    }else{
        $(this).css("color","#EAF6F6");
    }
    $(this).html(currentPlayer);

    checkGameResult();
    
}
var winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function checkGameResult(){
    count++;
    let result = false;
    if(count>4){

        for(var i=0;i<8; i++ ){
            let a = winCondition[i][0];
            let b = winCondition[i][1];
            let c = winCondition[i][2];
            if(gameState[a]===""|| gameState[b]===""|| gameState[c]==="") continue;
            if( gameState[a]===gameState[b]  && gameState[b] === gameState[c]){
                result = true;
                $("#"+gridItems[a]).css("background-color","#F76B8A");
                $("#"+gridItems[b]).css("background-color","#F76B8A")
                $("#"+gridItems[c]).css("background-color","#F76B8A")
                break;
            }
        }
        if(result){
            setTimeout(function(){
                $(".game-result").fadeIn();
                $(".result-display").html(currentPlayer+" Winner!");
            }, 200);
                       
            setTimeout(function(){
                $(".game-status").html("Press Any Key To Restart");

            }, 600);

            $(document).on("keydown",restartGame);
            gameActive = false;
            return;
        }
        let isDraw = !gameState.includes("");
        if(isDraw){
            gameActive = false;
            $(".game-result").fadeIn();
            $(".result-display").html(" Draw!!")
            setTimeout(function(){
                $(".game-status").html("Press Any Key To restart");
            }, 600);
            
            

            $(document).on("keydown",restartGame);
            return;
        }
    }
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    $(".game-status").html(currentPlayer+" Turn");
}

function restartGame(){
    gameState = ["","","","","","","","",""];
    gameActive = true;
    currentPlayer = "X";
    $(".item").html("");
    setTimeout(function(){
        $(".game-status").html("X Turn");
    }, 200);
    
    $(".item").css("background-color", "#66BFBF")
    $(".game-result").fadeOut();
    $(document).off("keydown");

}





$(".item").click(handleItemClick);
$(".btn").click(restartGame);

