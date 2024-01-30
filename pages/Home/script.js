// data
const timeline = [
	{
		year: 2023,
		month: 9,
		month_name: "Events",
		title: "Events"
	},
	{
		year: 2022,
		month: 6,
		month_name: "Gallery",
		title: "Gallery"
	},
	{
		year: 2021,
		month: 10,
		month_name: "Sponsors",
		title: "Sponsors"
	},
	{
		year: 2020,
		month: 10,
		month_name: "Team",
		title: "Team"
	},
	{ 
		year: 2019, 
	    month: 4, 
		month_name: "Vikisit Bharat@2047", 
		title: "Vikisit Bharat@2047" 
	// },
	// {
	// 	year: 2018,
	// 	month: 11,
	// 	month_name: "2018",
	// 	title: "Taarangana 2018"
	// },
	// {
	// 	year: 2017,
	// 	month: 10,
	// 	month_name: "2017",
	// 	title: "Taarangana 2017"
	// },
	// {
	// 	year: 2016,
	// 	month: 8,
	// 	month_name: "2016",
	// 	title: "Taarangana 2016"
	// },
	// { 
	// 	year: 2015, 
	// 	month: 6, 
	// 	month_name: "2015", 
	// 	title: "Taarangana 2015" 
	// },
	// {
	// 	year: 2014,
	// 	month: 7,
	// 	month_name: "2014",
	// 	title: "Taarangana 2014"
	// },
	// {
	// 	year: 2013,
	// 	month: 5,
	// 	month_name: "2013",
	// 	title: "Taarangana 2013"
	// },
	// {
	// 	year: 2012,
	// 	month: 11,
	// 	month_name: "2012",
	// 	title: "Taarangana 2012"
	}
];

//
const mario = document.getElementById("mario");
const ground = document.getElementById("ground");
const grass = document.getElementById("grass");
const eventsContainer = document.getElementById("events");
let currentIndex = -1;
let currentPipe;
let int1;

//const linking=document.getElementsByClassName("event active");

// click handler
const pipeHandler = () => {
	//clearInterval(int1);
	//document.getElementById("info").style.display = "none";

	// clear old
	!currentPipe || currentPipe.classList.remove("active");

	// get index
	const index = parseInt(event.currentTarget.dataset.index);

	// walk
	const xpos = -100 - index * 150 - 25;
	const curXpos = -100 - currentIndex * 150 - 25;
	const distance = curXpos - xpos;
	const duration = Math.abs(distance) * 3;
	// console.log(distance);
	eventsContainer.style.transitionDuration = `${duration}ms`;
	eventsContainer.style.transform = `translateX(${xpos}px)`;
	ground.style.transitionDuration = `${duration}ms`;
	ground.style.backgroundPosition = `${xpos}px 32px`;
	grass.style.transitionDuration = `${duration}ms`;
	grass.style.backgroundPosition = `${xpos}px 0`;

	//
	playSfx("jump");

	// walk style
	const dir = distance < 0 ? "left" : "right";
	mario.classList.remove(
		"idle",
		"walk-left",
		"walk-right",
		"search-left",
		"search-right"
	);
	mario.classList.add(`walk-${dir}`);
	int1 = setTimeout(
		(dir, target) => {
			mario.classList.remove(`walk-${dir}`);
			mario.classList.add(`search-${dir}`);
			target.classList.add("active");
		    target.addEventListener("click", ()=>{ 
				window.location.href = "pages/"+target.dataset.title +"/"+target.dataset.title+".html";
			} , true);
			// currentPip.removeEventListener("click", ()=>{ 
			// 	window.location.href = "pages/"+target.dataset.title +"/"+target.dataset.title+".html";
			// } , true);
			//target.removeEventListener('click', temp);
			// target.addEventListener('click',()=>{
			// 	if('active' in target.classList){
			// 		window.location.href = 'https://exampleURL.com/';
			// 	}
			// });
			playSfx("pipe");
			//alert('hello');
		},
		duration,
		dir,
		event.currentTarget
	);

	// store position
	currentIndex = index;
	currentPipe = event.currentTarget;
};

// setup timeline
timeline.forEach((event, index) => {
	const e = document.createElement("div");
	//const ea=window.getComputedStyle(e,"::after");
	//const anchor = document.createElement("a");
	//e.href="pages/Events/Events.html";
	// e.appendChild(anchor)
	//anchor.title=event.title;
	e.classList.add("event");
	e.dataset.index = index;
	e.dataset.title = event.title;
	//ea.style.color='red';
	//e.dataset.title=anchor;
	e.dataset.month = event.month_name;
	eventsContainer.appendChild(e);
	e.addEventListener("click", pipeHandler.bind(this));
	
});

/**
 * Audio handling
 */
const canAudio = "AudioContext" in window || "webkitAudioContext" in window;
const buffers = {};
let context = void 0;

if (canAudio) {
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	context = new AudioContext(); // Make it crossbrowser
	var gainNode = context.createGain();
	gainNode.gain.value = 1; // set volume to 100%
}

const playSfx = function play(id) {
	if (!canAudio || !buffers.hasOwnProperty(id)) return;
	const buffer = buffers[id];
	const source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.start();
};

const loadBuffers = (urls, ids) => {
	if (typeof urls == "string") urls = [urls];
	if (typeof ids == "string") ids = [ids];
	urls.forEach((url, index) => {
		window
			.fetch(url)
			.then((response) => response.arrayBuffer())
			.then((arrayBuffer) =>
				context.decodeAudioData(
					arrayBuffer,
					(audioBuffer) => {
						buffers[ids[index]] = audioBuffer;
					},
					(error) => console.log(error)
				)
			);
	});
};

loadBuffers(
	[
		"https://assets.codepen.io/439000/jump.mp3",
		"https://assets.codepen.io/439000/smb_pipe.mp3"
	],
	["jump", "pipe"]
);


// crosslinking pages
// const activeContainer = document.getElementById("active");
// activeContainer.setAttribute("href", "pages/Events/Events.html");