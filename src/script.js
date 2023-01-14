let result = $('.result')
let data = $('.data')
let numbers = [] 
let degreesRandom = [0, 90, 180, 270]   // array to store degrees used to randomize
let animal = Math.floor(Math.random() * 3) + 1;  // random from 1 to 3

for(let i = 1;i<=9;i++)
    result.append($(`<div class="cell" ondrop="drop(event)" ondragover="allowDrop(event, this)"></div>`))

for(let i=1, k=0;i<=10;i++)
{
    let number = Math.floor(Math.random() * 10) + 1;  // random from 1 to 10
    
    if(isDuplicated(numbers, number))
    {
        i--
        continue
    }

    numbers[k] = number
    k++

    if(number < 10)
        data.append($(`<div class="pieces" ondrop="drop(event)" ondragover="allowDrop(event, this)">
                            <img src="../images/animal${animal}/${number}.jpg" draggable="true" ondragstart="drag(event)" id="img${number}">
                        </div>`))
    else
        data.append($(`<div class="pieces" ondrop="drop(event)" ondragover="allowDrop(event, this)">
                            <img src="../images/animal${animal}/${number}.jpg" draggable="true" ondragstart="drag(event)" id="img${number}">
                        </div>`))
    
    // rotate image after initializating
    let degree = degreesRandom[Math.floor(Math.random() * degreesRandom.length)]
    $('#img' + number).css('transform', `rotate(${degree}deg)`)
}

function isDuplicated(numbers, n)
{
    for(let i=0;i<numbers.length;i++)
        if(numbers[i] === n) 
            return true
    
    return false
}     

function allowDrop(ev, div) 
{
    if(div.childElementCount === 0)
        ev.preventDefault();
}

function drag(ev) 
{
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) 
{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function changeImage() {
    location.reload();
}

$('img').click(function () 
{
    let degree = (($(this).data('degree') || 0) + 90) % 360  // get
    
    $(this).css('transform', `rotate(${degree}deg)`)
    $(this).data('degree', degree)  // set
})