let dart = document.getElementsByClassName('dart')[0];
let body = document.getElementsByTagName('body')[0];

let rotation = 180;
dart.style.transform = `rotate(${rotation}deg)`;

let aimInterval = setInterval(() => {
    console.log('in aimInterval');
    let rotationString = dart.style.transform;
    console.log('rotationString:', rotationString);
    console.log(rotationString.match(/\d+/)[0]);
    let rotation = Number(rotationString.match(/\d+/)[0]);
    console.log('rotation:', rotation);
    rotation += 1;
    dart.style.transform = `rotate(${rotation}deg)`;
}, 15);

body.addEventListener('click', stopAimingDart);

function stopAimingDart() {
    clearInterval(aimInterval);
    windUpDart();
    body.removeEventListener('click', stopAimingDart);
}

let startTime = Date.now();

function windUpDart() {
    let windUpInterval = setInterval(() => {
        console.log('in windUpInterval');
        let timeElapsed = Date.now() - startTime;
        draw(timeElapsed);
    }, 20);
    body.addEventListener('click', function() {
        clearInterval(windUpInterval);
    });
}

function draw(timeElapsed) {
    console.log(dart.style.left);
    dart.style.left = timeElapsed / 10 + 'px';
    dart.style.bottom = timeElapsed / 10 + 'px';
}