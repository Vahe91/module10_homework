const sendBtn = document.querySelector('.send-btn');
const locationBtn = document.querySelector('.location-btn');
const output = document.querySelector('.output');

let websocket = new WebSocket('wss://echo-ws-service.herokuapp.com');

websocket.onopen;

websocket.onmessage = function (event) {
    writeToScreen(event.data, 'received-message');
};


function writeToScreen(message, className = '') {
    let pre = document.createElement('p');
    pre.classList.add('message');
    if (className !== '') {
        pre.classList.add(className);
    }
    pre.innerHTML = message;
    output.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
    const input = document.querySelector('.input-field');
    if(input.value.length) {
        writeToScreen(input.value);
        websocket.send(input.value);
        input.value = '';
    }
})

locationBtn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        writeToScreen(`<a href='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}' target="_blank" style="text-decoration: none">Гео-локация</a>`);
    });
})