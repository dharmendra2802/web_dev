'use strict'
/************/

//setting random number
let number = Math.trunc(Math.random()*20)+1;

// storing high score
let high = 0;

//storing current score 
let score = 0;

//variable for user input
let userInput ;

// chances
let heartNO = 5;
let chance = ["five","four","three","two","one"];

/**********/
//restart / next round function
const again = function()
{
	document.querySelector("#hidden").textContent = "??";
	
	document.querySelector("#msg").textContent="Next Round !!!";
	heartNO=5;
	// refiiling hearts 
	for(let i=0;i<5;i++)
	{
		document.querySelector("."+chance[i]).style.display="inline-block";
	}
	number =  Math.trunc(Math.random()*20)+1;
	document.querySelector("#msg").textContent="Start Guessing!!";
	document.querySelector("#submit").addEventListener("click",start); 

}
/* Switch on and off*/

//new game 
const newGame = function()
{
	document.querySelector("#over-block").style.display="none";
	again();
}
//winning function
const win = function()
{
	document.querySelector("#msg").textContent="Correct!!!";
	document.querySelector("#hidden").textContent = number;
	score+= heartNO;
	document.querySelector(".score").textContent=score;
	setTimeout(again,1000);
}
// over fuction()
const over = function()
{
	if(score>high)
	{
		high=score;
		document.querySelector("#high-score").textContent=high;
	}
	score=0;
	document.querySelector(".score").textContent=score;
	document.querySelector("#over-block").style.display="block";




}
//failing function
const fail = function()
{
	document.querySelector("."+chance[heartNO-1]).style.display="none";
	heartNO--;
	if(heartNO===0)
	{
		over();

	}

}

//const animate function

//starting function
const start = function(){	
	//storing user input
	userInput=Number(document.querySelector("#guess").value);
	// applying conditions

document.querySelector("#guess").value="";
console.log(typeof userInput);
	if(userInput-number > 8)
	{
		document.querySelector("#msg").textContent="Very Big";
		fail();

	}else 
	{
		if(userInput>number)
			{document.querySelector("#msg").textContent="Big";
				fail();
			}
		else
		{
			if(number-userInput>8)
				{document.querySelector("#msg").textContent="Very Small";
					fail();
				}
			else
			{
				if (number>userInput)
					{document.querySelector("#msg").textContent="Small";
						fail();
					}				
				else
				{	if (number===userInput)
						win();
					else
						{document.querySelector("#msg").textContent="Enter Valid Input";
						}

				}

			}

		}
	}
}


//listening event of clicking submit
document.querySelector("#submit").addEventListener("click",start);
document.querySelector("#play-again").addEventListener("click",newGame);
