var canvas = document.getElementById("screen")
var screenCtx = canvas.getContext("2d")

const screenSizeX  = 400;
const screenSizeY = 400;
const pixelCountX = 20;
const pixelCountY = 20;
const pixelSizeX = screenSizeX/pixelCountX;
const pixelSizeY = screenSizeY/pixelCountY;

document.addEventListener("keydown",changeDirectionHandler)

function changeDirectionHandler(e){
    e.preventDefault();
    switch (e.key) {
        case "ArrowUp":
            console.log("up")
            snake.setDirection("up")
            break;
        
        case "ArrowDown":
            console.log("down")
            snake.setDirection("down")
        break;
        case "ArrowLeft":
            console.log("left")
            snake.setDirection("left")
        break;

        case "ArrowRight":
            console.log("right")
            snake.setDirection("right")
        break;

        default:
            break;
    }

    
}

var snake = {
    pieces : [{x:3,y:0}, {x:2, y:0},{x:1 , y:0}],
    direction: {x: 1, y: 0},
    move(a){

        //console.log("Before")
        //console.table(this.pieces)
        for(let i  = this.pieces.length -1; i> 0 ; i-- ){
            //console.log(this.pieces[i])
            //console.log(this.pieces[i-1])
            this.pieces[i] ={ x:this.pieces[i-1].x, y:this.pieces[i-1].y};

        }
        //console.log("------------")
        //console.table(this.pieces)

        this.pieces[0].x = this.pieces[0].x + this.direction.x;
        this.pieces[0].y = this.pieces[0].y + this.direction.y;

        //console.log("AFT")
        //console.table(this.pieces)
        //console.log(a)
    },
    setDirection(dir){
        switch (dir) {
            case "up":
                this.direction = {x:0,y:-1}
                break;
            case "down":                
                this.direction = {x:0,y:1}
                break;
            case "left":
                this.direction = {x:-1,y:0}
                break;
            case "right":
                this.direction = {x:1,y:0}
                break;
            default:
                break;
        }
        //  this.move("from setDir");
    },
    detectDefinedCollision(x,y){
        if((this.pieces[0].x === x) && (this.pieces[0].y === y)){
            console.log("collision")
            return true;

    }}
    ,
    pushTail(){
        length = this.pieces.length
        this.pieces.push({x: this.pieces[length-1].x, y: this.pieces[length-1].y})
    },
    detectTailCollision(){
        let collision = false
        let piecesArr = []
        this.pieces.forEach(piece => {
            piecesArr.push(piece);
        })
        piecesArr.shift()
        piecesArr.forEach(piece => {
            
            if(this.detectDefinedCollision(piece.x, piece.y)){
                collision =  true
                
            }
        });
        return collision
    },
    detectBorderCollision(startx, starty, endx, endy){
        let head = this.pieces[0]
        if(head.x < startx || head.x >= endx || head.y <starty || head.y >= endy){
            
            return true
        }
        else{
            return false
        }
    },
    reset(){
        this.pieces = [{x:3,y:0}, {x:2, y:0},{x:1 , y:0}]
    }    
    
}
var food = {
    x: Math.round((Math.random() * 100)%pixelCountX)-1,
    y:Math.round((Math.random()*100)%pixelCountY)-1,
    update(){
    this.x =Math.round((Math.random() * 100)%pixelCountX) -1,
    this.y = Math.round((Math.random()*100)%pixelCountY) -1
    }
}


function render(Snake,Food, ScreenContext){
    ScreenContext.fillStyle = "#1fff5f"
    ScreenContext.fillRect(0,0,screenSizeX, screenSizeY)

    Snake.pieces.forEach(coord => {
        ScreenContext.fillStyle = "#ff22ff"
        ScreenContext.fillRect(coord.x * pixelSizeX, coord.y * pixelSizeY,pixelSizeX, pixelSizeY);
    });

    ScreenContext.fillStyle = "#ff2200"
    ScreenContext.fillRect(Food.x* pixelSizeX, Food.y * pixelSizeY, pixelSizeX, pixelSizeY)
    
}

function gameMain(){
    let renderingInterval = setInterval(()=>{
    
        render(snake, food, screenCtx)
    }, 100)
    let gameLogic  = setInterval(() => {
    snake.move("from main")
    if(snake.detectDefinedCollision(food.x,food.y)){
        food.update()
        snake.pushTail();
    }
    if(    snake.detectTailCollision()){
        console.log("bateu em si mesmo")
        clearInterval(gameLogic)
        clearInterval(renderingInterval)
        menu()
    }
    if(snake.detectBorderCollision(0,0,pixelCountX, pixelCountY)){
        console.log("outOfScreen")
        clearInterval(gameLogic)
        clearInterval(renderingInterval)
        menu()
    }
    //console.log("timeout")
}, 500);

}

function startGame(e){
    console.log(e)
    btnXstart = screenSizeX/2 -60 
    btnXend = screenSizeX/2 + 60
    btnYStart = screenSizeY/2 - 20
    btnYend = screenSizeY/2 + 20
    if(e.clientX > btnXstart && e.clientX < btnXend && e.clientY > btnYStart && e.clientY < btnYend ){
        console.log("btnClicked")
        gameMain()
    }
}

function menu(){
    screenCtx.fillStyle = "#67f867"
    screenCtx.fillRect(0,0, screenSizeX, screenSizeY)
    screenCtx.fillStyle = "#008f05"
    screenCtx.fillRect(screenSizeX/2 - 60, screenSizeY/2 -20, 120,40)

    canvas.addEventListener("click", startGame)
}


menu()



screenCtx.fillStyle = "#ff00ff"

 
