const cards = document.querySelectorAll('.card');
let game =  document.getElementById("result");
let times =  document.getElementById("remain");

let loss = 7;
let win = 0;

times.innerHTML = loss;
let hasFlipped = false;

let first,second;

let lock = false;

function initTimer() {

    loss--;
    times.innerText = loss;

    
}

function flipTheCard()
{
    if(lock) return;
    this.classList.toggle('flip');
    
    if(hasFlipped == false){
        hasFlipped = true;
        first = this;
        return;
    }

    hasFlipped = false;
    second = this;

    check();    
    winOrLoss();
}

function winOrLoss(){
    if(win==6 && loss>0){
        game.innerText="WIN!";
    }
    else if(win<6 && loss==0){
        game.innerText="Loss!";
    }
}

function check()
{
    if(first.dataset.name == second.dataset.name){
        disablecard();
        
        win++;
    }
    else
    {
        initTimer();
        unFlipcard();
    }
}

function disablecard()
{
    first.removeEventListener('click',flipTheCard)
   
    second.removeEventListener('click',flipTheCard)
   
    reset();
}

function unFlipcard()
{
    lock = true;
    setTimeout(()=>{
       
        first.classList.remove('flip');
       
        second.classList.remove('flip');
       
        reset();
    },1000)
}

function reset(){
     [hasFlipped,lock] = [false,false];
     
     [first,second] = [null,null];
}

(function shuffle(){
    cards.forEach(card=>{
        let randomPosition = Math.floor(Math.random()*12);
      
        card.style.order = randomPosition;
    })
})();

cards.forEach(card=> card.addEventListener('click',flipTheCard));