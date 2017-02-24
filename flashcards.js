var inquirer = require("inquirer");
var fs = require("fs");

function flashcard(front,back){
	this.question = front;
	this.answer = back;
	this.printfront = function(){
		console.log(front)
	};
	this.printback = function(){
		console.log(back)
	};
	this.flip = function(){

	};
}

//function to enter another flashcard
function enterNew(){
	inquirer.prompt([

		{
		    type: "confirm",
		    name: "enterNewFlash",
		    message: "Would you like to enter another flashcard?"
	  	}

	]).then(function(user){
		if(user.enterNewFlash === true){
			add();
		} else if (user.enterNewFlash === false){
			console.log("finished entering")
		}
	})
};

//function to add new flashcards
function add(){
	inquirer.prompt([

		{
			type: "input",
			name: "addQuestion",
			message: "Please enter the text to display on the front of this card."
		},
		{
			type: "input",
			name: "addAnswer",
			message: "Please enter the text to display on the back of this card."
		},

	]).then(function(card){
		var cardArray = [card.addQuestion, card.addAnswer];
		var jsonCard = JSON.stringify(cardArray);
		
		fs.appendFile("flashcards.txt", jsonCard + ";", function(err) {
			if (err) {
			  console.log(err);
			}
			else {
			    console.log("You added a new flashcard!");
			}	
		});
		enterNew();
	})
};

//function to review flashcards
function review(){
	console.log("Shuffling...")
	fs.readFile("flashcards.txt", "utf8", function(err, data) {

	var amtCards = data.split(";");
	var card = JSON.parse(amtCards[1]);
	var newCard = new flashcard(card[0],card[1]);
	console.log(newCard.question);

	

	});
};


//initial prompt
inquirer.prompt([
	
	{
		type: "input",
		name: "addReview",
		message: "Would you like to add or review flashcards?"
	}

]).then(function(user){

	if(user.addReview === "add"){
		add();

	} else if (user.addReview === "review"){
		review();
	};
});