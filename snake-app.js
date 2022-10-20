document.addEventListener('DOMContentLoaded', () => {
	const squares = document.querySelectorAll('.grid div')
	const scoreDisplay = document.querySelector('span')
	const startBtn = document.querySelector('.start')

	const width = 10
	let currentIndex = 0 //first div in grid
	let appleIndex = 0 //first div in grid
	let currentSnake = [2,1,0] //all divs w/ value 2 = head, 0 = tail, 1= body
	let direction = 1
	let score = 0
	let speed = 0.9
	let intervalTime = 0
	let interval = 0

	// starts/restarts the game
	function start() {
		currentSnake.forEach(index => squares[index].classList.remove('snake'))
		squares[appleIndex].classList.remove('apple')
		clearInterval(interval)
		score = 0
		randomApple()
		direction = 1
		scoreDisplay.innerText = score
		intervalTime = 700 // controls speed 
		currentSnake = [2,1,0]
		currentIndex = 0
		currentSnake.forEach(index => squares[index].classList.add('snake'))
		interval = setInterval(moveOutcomes, intervalTime)
	}


	// function that deals with all the move outcomes of the snake
	function moveOutcomes(){

		// deals with snake hitting border, or itself
		if (
			(currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
			(currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right wall
			(currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
			(currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
			squares[currentSnake[0] + direction].classList.contains('snake') //snake hits itself
			) {
				return clearInterval(interval)
			}

		const tail = currentSnake.pop() // removes last ite of the array and shows it
		squares[tail].classList.remove('snake') // removes class of snake from the tail
		currentSnake.unshift(currentSnake[0] + direction) // gives directions to the head of the array

		// deals with snake getting apple
		if(squares[currentSnake[0]].classList.contains('apple')) {
			squares[currentSnake[0]].classList.remove('apple')
			squares[tail].classList.add('snake')
			currentSnake.push(tail)
			randomApple()
			score++
			scoreDisplay.textContent = score
			clearInterval(interval)
			intervalTime = intervalTime * speed
			interval = setInterval(moveOutcomes, intervalTime)
		}
		squares[currentSnake[0]].classList.add('snake')
	}

	//generate new apple once previous apple eaten
	function randomApple() {
		do {
			appleIndex = Math.floor(Math.random() * squares.length)
		} while(squares[appleIndex].classList.contains('snake'))
		squares[appleIndex].classList.add('apple')
	}

	//assign functions to keycodes
	function control(e){
		squares[currentIndex].classList.remove('snake') // removing classof snake from all squares as it moves

		if(e.keyCode === 39) {
			direction = 1 //right array on keyboard makes snake move right one space
		} else if(e.keyCode === 38) {
			direction = -width //press up arrow, snake goes back 10 divs (10x10 grid) aka going up one space
		} else if(e.keyCode === 37) {
			direction = -1 // press left, snake goes back one div
		} else if(e.keyCode === 40) {
			direction = +width // press down arrow, snake goes forward 10 divs, aka going down one space
		}
	}

	document.addEventListener('keyup', control) //watches for keystrokes
	startBtn.addEventListener('click', start)

})