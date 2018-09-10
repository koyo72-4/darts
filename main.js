let dart = document.getElementsByClassName('dart')[0];
let body = document.getElementsByTagName('body')[0];

dart.style.bottom = '70px';
dart.style.left = '70px';
dart.style.transform = `rotate(180deg)`;

body.addEventListener('click', stopAimingDart);

let aimInterval = setInterval(() => {
    let rotationString = dart.style.transform;
    let rotation = Number(rotationString.match(/\d+/)[0]);
    rotation += 1;
    dart.style.transform = `rotate(${rotation}deg)`;
}, 15);

function stopAimingDart() {
    clearInterval(aimInterval);
    windUpDart();
    body.removeEventListener('click', stopAimingDart);
}

function windUpDart() {
    let windUpInterval = setInterval(() => {
        draw();
    }, 25);

    body.addEventListener('click', clearIntervalAndDisplayMessage);
    
    function clearIntervalAndDisplayMessage() {
        clearInterval(windUpInterval);
        displayMessage();
        body.removeEventListener('click', clearIntervalAndDisplayMessage);
    }
}

function draw() {
    let rotationString = dart.style.transform;
    let rotation = Number(rotationString.match(/\d+/)[0]);

    let angle = rotation - 180;
    let angleInRadians = angle * (Math.PI / 180);

    let ratio = Math.tan(angleInRadians);

    let left = Number(dart.style.left.match(/\d+/)[0]);
    let bottom = Number(dart.style.bottom.match(/\d+/)[0]);

    dart.style.bottom = (bottom + 5) + 'px';
    dart.style.left = (left + 5 * ratio) + 'px';
}

function displayMessage() {
    let audio = new Audio('Song7.m4a');
    audio.play();
    let messageDiv = document.createElement('div');
    messageDiv.id = 'message-div';
    messageDiv.style.margin = '30px';
    messageDiv.style.border = '1px solid black';
    messageDiv.style.width = messageDiv.style.height = '300px';
    messageDiv.textContent = 'HAPPY BIRTHDAY!';
    body.appendChild(messageDiv);
}