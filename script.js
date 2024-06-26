// let minValue  = parseInt(prompt('Минимальное знание числа для игры (-999)','0')) || 0;
// let maxValue = parseInt(prompt('Максимальное знание числа для игры (999)','100')) || 100;
let minValue = 0;
let maxValue = 100;
// Проверка и коррекция минимального значения
//minValue = minValue < -999 ? -999 : minValue;
// Проверка и коррекция максимального значения
//maxValue = maxValue > 999 ? 999  : maxValue;

//alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;

const check = [
    `Я всегда угадываю\n\u{1F60E}`,
    `Winnnn\n\u{1F92F}`,
    `Похоже я угадал\n\u{1F92F}`,
    `Победа за мной\n\u{1F92F}`
];
const Questions = [
    `Вы загадали число `,
    `Ииии, ваше число `,
    `Возможно это оно `,
    `Хммм.. может ли быть что это число `];

const answerPhrase = [
    `Вы загадали неправильное число!\n\u{1F914}`,
    `Я сдаюсь..\n\u{1F92F}`,
    `Как так то..\n\u{1F92F}`,
    `Как я мог(\n\u{1F92F}`
]

const progressWin = document.getElementById('progressWin');
const progressLose = document.getElementById('progressLose');
let progress = [[],[]];  // Прогресс удач и нет 
let win = 0;
let lose = 0;

document.getElementById('btnRetry').addEventListener('click', function () {
    bsOffcanvas.show();

    orderNumber = 1;
    orderNumberField.innerText = orderNumber;
    gameRun = true;

    answerNumber = Math.floor((minValue + maxValue) / 2);
    answerField.innerText = Questions[0] + `${answerNumber}?`;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.floor(Math.random()*answerPhrase.length);

                lose = lose +1;
                progress[1][0] = lose;
                progressLose.innerText = progress[1][0];
            answerField.innerText = answerPhrase[phraseRandom];
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;

            orderNumberField.innerText = orderNumber;
            
            const phraseRandom = Math.floor(Math.random()*Questions.length);

            const textNumber = numberToText(answerNumber);
            if (textNumber.length <= 20) {
                answerField.innerText = Questions[phraseRandom] + `${textNumber}?`;
            } else {
                answerField.innerText = Questions[phraseRandom] + `${answerNumber}?`;
            }

        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.floor(Math.random()*answerPhrase.length);
            
            lose = lose +1;
            progress[1][0] = lose;
            progressLose.innerText = progress[1][0];
            answerField.innerText = answerPhrase[phraseRandom];
            gameRun = false;
        } else {

            maxValue = Math.max(minValue, answerNumber - 1); 
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;

            orderNumberField.innerText = orderNumber;

            const phraseRandom = Math.floor(Math.random()*Questions.length);

            const textNumber = numberToText(answerNumber);
            if (textNumber.length <= 20) {
                answerField.innerText = Questions[phraseRandom] + `${textNumber}?`;
            } else {
                answerField.innerText = Questions[phraseRandom] + `${answerNumber}?`;
            }
    
        }
    }
})



document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){

        const phraseRandom = Math.floor(Math.random()*check.length);
        answerField.innerText = check[phraseRandom];
        
        win = win +1;
        progress[0][0]=win;
        progressWin.innerText = progress[0][0];

        gameRun = false;
    }
})

var toggle = document.getElementById("staticBackdrop");
var bsOffcanvas = new bootstrap.Offcanvas(toggle);
bsOffcanvas.show();



const form1 = document.querySelector('.needs-validation');

$('#modalExample').modal('hide');

form1.addEventListener('submit', (event) => {
    event.preventDefault();

     var forms = document.querySelectorAll('.needs-validation')
  
     // Зацикливайтесь на них и предотвращайте отправку
    Array.prototype.slice.call(forms)
       .forEach(function (form) {
         form.addEventListener('submit', function (event)  {
           if (!form.checkValidity()) {
            bsOffcanvas.show();
             event.preventDefault()
             event.stopPropagation()
           }
          form.classList.add('was-validated')
          if(form.checkValidity()){

             minValue = parseInt(document.getElementById('validationCustom01').value) ;
             maxValue = parseInt(document.getElementById('validationServer02').value) ;

            if (isNaN(minValue) || isNaN(maxValue)){
                 const modal = new bootstrap.Modal(document.getElementById('modalExample'));
                 modal.show();
                 bsOffcanvas.show();
                 document.getElementById('validationCustom01').value = parseInt(document.getElementById('validationCustom01').value) || 0;
                document.getElementById('validationServer02').value = parseInt(document.getElementById('validationServer02').value) ||100;
                
            }
if (minValue  < -999 ){
    // Проверка и коррекция минимального значения
minValue = minValue < -999 ? -999 : minValue;
}
if (maxValue > 999){
    maxValue = maxValue > 999 ? 999  : maxValue;
}
document.getElementById('numbersMin').innerText = minValue;
document.getElementById('numbersMax').innerText = maxValue;  
           }
        }, false)
       })

  document.getElementById('btnGame').addEventListener('click', function () {
    $('#staticBackdrop').offcanvas('hide');
  })
     
});


// Функция для преобразования числа в текст
function numberToText(number) {
    if (number === 0) {
      return "ноль";
    }
  
    const numbers = [
      "", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять",
      "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"
    ];
  
    const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
  
    if (number < 20) {
      return numbers[number];
    } else if (number < 100) {
      return tens[Math.floor(number / 10)] + (number % 10 !== 0 ? " " + numbers[number % 10] : "");
    } else {
      return numbers[Math.floor(number / 100)] + " " +  "сто" + (number % 100 !== 0 ? " " + numberToText(number % 100) : "");
    }
  }
  
  document.getElementById('prog').addEventListener('click', function () {

     win = 0;
     progressLose.innerText = 0;
     progressWin.innerText = 0;
});