export const score = document.getElementById('curr-score');
export let currScore = 0; // to store current score
const audio = new Audio('img/sound.mp3');

let addScoreBy = 1;
const VELOCITY = .02; // speed of the ball
let VELOCITY_FACTOR = .0000008; //factor by which spped will increase

export default class Ball{

    constructor(ballEle)
    {
        this.ballEle=ballEle;
        this.reset();
    }

    // making getter and setter function for x and y

    get x()
    {
        return parseFloat(getComputedStyle(this.ballEle).getPropertyValue("--x"));
        // getcomputedstyle with return all the style property of ballele
        // getpropertyvalue will return the particular value
        //  to parseFloat so calculation can be done easily
    }
    set x(value)
    {
        this.ballEle.style.setProperty("--x",value);
    }

    get y()
    {
        return parseFloat(getComputedStyle(this.ballEle).getPropertyValue("--y"));
    }
    set y(value)
    {
        this.ballEle.style.setProperty("--y",value);
    }

    // getInfo function 
    // to return inof about its size and position
    getInfo()
    {
        return this.ballEle.getBoundingClientRect();
    }

    // reset function
    // to give random direction to the ball
    reset()
    {
        // setting default position
        this.x = 40;
        this.y = 40;
        this.direction = {x:0,y:0};//holding direction info

        while(Math.abs(this.direction.x) <=.2 || Math.abs(this.direction.x)>=.9)
        {
            // to get a random direction value
            // btw 0 to 360
            const heading = randomNumber(0,2 * Math.PI);
            // console.log(heading);
            this.direction = {
                x:Math.cos(heading),
                y:Math.sin(heading)
            };
        }
        // console.log(this.direction)
        this.velocity = VELOCITY;
    }

    // update function to change the positon of the ball
    update(delta,padInfoa)
    {
        // increaing the speed as time passing by 
        this.velocity+= VELOCITY_FACTOR*delta;


        this.x+= this.velocity * delta * this.direction.x;
        this.y+= this.velocity * delta * this.direction.y;
        
        // now info has data about its position
        const info = this.getInfo();
        
        // holding info about the container
        const container = document.getElementById('cont');
        const cont_info = container.getBoundingClientRect(); 
        // console.log(cont_info);

        // if the ball touches the top or bottom of the container
        if(info.y >= cont_info.bottom-10 || info.y <= cont_info.top )
            this.direction.y *=-1;
    
        if( padInfoa.some( r=> isCollided( r, info) ) )
        {
            audio.play();
            if(currScore<10)
                addScoreBy=1;
            else{
                if(currScore>10 && currScore<25)
                    addScoreBy=2;
                else
                    addScoreBy=3;
            }

            this.direction.x *=-1;           
            currScore+=addScoreBy;
            score.innerHTML=currScore;
        }
    }
}

// to generate a random number btw range of f and s
function randomNumber(f,s)
{
    // console.log(f+" "+s);
    return Math.random() * (s-f) + f;
}

// function to check whether ball and pad collided or not
//  p is pad , b is ball
function isCollided(p,b)
{
    return (
        p.left <= b.right && 
        p.right >= b.left &&
        p.top <= b.bottom &&
        p.bottom >= b.top
    )
} 

