app = {
	select: document.getElementById('select'),
	video: document.querySelector('video'),
	debug: document.querySelector('.debug'),
	init:() =>{

		navigator.mediaDevices.getUserMedia({audio: true, video: true})
		.then(function(stream) {
			navigator.mediaDevices.enumerateDevices().then(app.listDevices);
		})
		.catch(function(err) {
			console.log('GUM failed with error, time diff: ', Date.now() - now);
		});
		
	},

	listDevices:(mediaDevice)=>{
		console.log(mediaDevice);


		app.select.innerHTML = '';
		app.select.appendChild(document.createElement('option'));

		// list video inputs
		mediaDevice.forEach(mediaDevice => {
			
			app.debug.innerHTML += `<p>${mediaDevice.label} - ${mediaDevice.kind}</p>`;
			// app.debug.appendChild("HA");

			if (mediaDevice.kind === 'videoinput') {
				const option = document.createElement('option');
				option.value = mediaDevice.deviceId;
				const label = mediaDevice.label;
				const textNode = document.createTextNode(label);
				option.appendChild(textNode);
				select.appendChild(option);
			}
		});

		app.bindEvents();
	},

	bindEvents:()=>{

		app.select.addEventListener('change', (e)=>{
			console.log(e);
			console.log(e.target.value);
			if(e.target.value == ''){
				console.log('select a camera');
			} else {
				app.deviceID = e.target.value;
				app.initCamera(e.target.value);
			}

		});
	},

	initCamera:(deviceID)=>{
		const constraints = {
			audio: true, 
			video: { 
				width: 640, 
				height: 480,
				deviceId: {
					exact: deviceID
				}
			} 
		}; 

		navigator.mediaDevices.getUserMedia(constraints)
		.then( (mediaStream) => {
			app.video.srcObject = mediaStream;
				app.video.onloadedmetadata = (e) => {
					app.video.play();
				};
		})
		.catch((err) => {
				 console.log(err.name + ": " + err.message); 
			}); 
	}
},

window.onload = app.init;