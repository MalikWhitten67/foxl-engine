class foxlengine{
    constructor(params){
   

        this.gamePlace = document.createElement("div");
        this.gamePlace.style.width = "100%";
        this.gamePlace.style.height = "100%";
        this.gamePlace.style.position = "absolute";
        this.gamePlace.style.top = "0";
        this.gamePlace.style.left = "0";
        this.gamePlace.style.zIndex = "1000";
        this.gamePlace.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.collision_blocks = []
    }


    load(){
        document.body.appendChild(this.gamePlace);
    }
    set_volume(volume){
        this.audio.volume = volume
    }

    get_volume(){
        return this.audio.volume
    }

    drawCollisionBlock(x, y, width, height, color, id, show){
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = y + "px";
        div.style.left = x + "px";
        div.style.width = width + "px";
        div.style.height = height + "px";
        div.style.backgroundColor = color;
        div.id = id;
        this.collision_blocks.push(div)
        this.gamePlace.appendChild(div);
        if(show == true){
            div.style.display = "block"
        }else{
            div.style.display = "none"
        }
    }

    drawRect(x, y, width, height, color, id){
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = y + "px";
        div.style.left = x + "px";
        div.style.width = width + "px";
        div.style.height = height + "px";
        div.style.backgroundColor = color;
        div.id = id;
        this.gamePlace.appendChild(div);
    }
    drawCircle(x, y, radius, color){
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = y + "px";
        div.style.left = x + "px";
        div.style.width = radius * 2 + "px";
        div.style.height = radius * 2 + "px";
        div.style.borderRadius = "50%";
        div.style.backgroundColor = color;
        this.gamePlace.appendChild(div);
    }
    drawText(text, x, y, color, font, id){
         var span = document.createElement("span");
         span.style.position = "absolute";
         span.style.top = y + "px";
         span.style.left = x + "px";
         span.style.color = color;
         span.style.font = font;
         span.innerHTML = text;
         span.id = id;
         this.gamePlace.appendChild(span);
    }

    run(callback){
        var game = this.gamePlace
        // create a game loop
        var run = function() {
            // call the callback function once per frame
            callback();
            window.requestAnimationFrame(run, game );
        }
    
        // start the game loop
        run();
    }
    collision(element1, element2){
         // return true if the two elements are colliding else return false
            var rect1 = element1.getBoundingClientRect();
            var rect2 = element2.getBoundingClientRect();
            return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);

                
    }


}

class foxlgenerator extends foxlengine{
    constructor(){
       this.levels  = ["level1.html", "level2.html"]
       this. dificulties = ["easy", "medium", "hard"]
       this.level = this.levels[Math.floor(Math.random() * this.levels.length)]

    }

    async generate(offsetdiff){
        let difficulty = this.dificulties[Math.floor(Math.random() * this.dificulties.length)]
        let offset = Math.floor(Math.random() * offsetdiff)
        let jdata = {level: this.level, difficulty: difficulty, offset: offset}
        return jdata
    }
}


class foxlaudio extends foxlengine{
    constructor(file_path, volume){
        super()
        this.file_path = file_path
        this.volume = volume
    
    }
    

    load(){
        fetch(this.file_path)
        .then(response => response.blob())
        .then(blob => {
            this.audio = new Audio(URL.createObjectURL(blob))
            this.audio.volume = this.volume
        })

    }
    play(){
        this.audio.play()
    }
    pause(){
        this.audio.pause()
    }
}
 
class foxlControls{
    constructor(){
        this.keys = {
            "ArrowUp": false,
            "ArrowDown": false,
            "ArrowLeft": false,
            "ArrowRight": false,
            " ": false,
            "KeyW": false,
            "KeyS": false,
            "KeyA": false,
            "KeyD": false,
            "KeyE": false,
            "KeyQ": false,
            "KeyR": false,
            "KeyF": false,
            "KeyG": false,
            "KeyH": false,
            "KeyJ": false,
            "KeyK": false,
            "KeyL": false,
            "KeyZ": false,
            "KeyX": false,
            "KeyC": false,
            "KeyV": false,
            "KeyB": false,
            "KeyN": false,
            "KeyM": false,
            "KeyP": false,
            "KeyO": false,
            "KeyI": false,
            "KeyU": false,
            "KeyY": false,
            "KeyT": false,
            "Key1": false,
            "Key2": false,
            "Key3": false,
            "Key4": false,
            "Key5": false,
            "Key6": false,
            "Key7": false,
            "Key8": false,
            "Key9": false,
            "Key0": false,
            "Enter": false,
            "ShiftLeft": false,
            "ShiftRight": false,
            "ControlLeft": false,
            "ControlRight": false,
            "AltLeft": false,
            "AltRight": false,

        }


    }
    async keydown(event){
         window.addEventListener("keydown", (event) => {
            this.keys[event.code] = true;
            
         });
         window.addEventListener("keyup", (event) => {
            this.keys[event.code] = false;
          
        });
        return this.keys

    }
     
}
