let dart = document.getElementsByClassName('dart')[0];
let body = document.getElementsByTagName('body')[0];

dart.style.bottom = '100px';
dart.style.left = '70px';
dart.style.transform = `rotate(180deg)`;

let aimInterval = setInterval(() => {
    let rotationString = dart.style.transform;
    console.log(rotationString.match(/\d+/)[0]);
    let rotation = Number(rotationString.match(/\d+/)[0]);
    rotation += 1;
    dart.style.transform = `rotate(${rotation}deg)`;
    console.log('rotation:', rotation);
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
        let timeElapsed = Date.now() - startTime;
        draw(timeElapsed);
    }, 20);
    body.addEventListener('click', function() {
        clearInterval(windUpInterval);
    });
}

function draw(timeElapsed) {
    let rotationString = dart.style.transform;
    let rotation = Number(rotationString.match(/\d+/)[0]);
    let angle = rotation - 180;
    let ratio = Math.tan(angle);
    console.log('rotation:', rotation, 'angle:', angle, 'ratio:', ratio);
    let left = dart.style.left;
    let bottom = dart.style.bottom;
    console.log('left:', left, 'bottom:', bottom);

    // let leftNumber = Number(dart.style.left.match(/\d+/)[0]);
    // console.log('leftNumber:', leftNumber);

    dart.style.left = left * ratio + 'px';
    dart.style.bottom = bottom * ratio + 'px';
    console.log('new left:', dart.style.left, 'new bottom:', dart.style.bottom);

    // dart.style.left = timeElapsed / 10 + 'px';
    // dart.style.bottom = timeElapsed / 10 + 'px';
}