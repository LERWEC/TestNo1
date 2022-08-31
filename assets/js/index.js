let pageNum = 1;
let lenLi = undefined;
let limit = 10;
let pgEl = `_page=${pageNum}`
let com = '<h4>Коментарии</h4><p>Саша:Ну такое<br>Foirt:Tye emose tritedorio cumpacto espansio<br>Саша:Ну а я то тебя прекрасно понимаю</p> '

function respFch(resp) {
    let reLe = resp.length;
    if(reLe == 0){
        pageNum--
        return false
    }else if(reLe < 10){
        lenLi = reLe - 1
        for (let i = 9; i > lenLi; i--){
            document.getElementById(`el${i}`).classList.toggle('close')
        }
    }else{
        for (let i = 9; i > lenLi; i--) {
            document.getElementById(`el${i}`).classList.toggle('close')
        }
        lenLi = undefined;
    }
    for (let i = 0; i < reLe; i++) { document.getElementById(`el${i}`).innerHTML = `<h2>${resp[i].id}.${resp[i].title}</h2><h3>${resp[i].body}</h3><button onclick="openEl(${resp[i].id})">Open</button><button onclick="removeEl(event)">Del</button>` }

    console.log(pageNum)
    console.log(pgEl.length)
}

fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));



function nextList() {
    pageNum++;
    if (pgEl.length > 10){
        serchEl()
    }else{
        pgEl = `_page=${pageNum}`
        fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));
    };
};

function backList() {
    if (pageNum > 1) {
        pageNum--
        if (pgEl.length > 10) {
            serchEl()
        } else {
            fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));
        }  
      };
};

function serchEl() {
    let form = document.getElementById('serch-form');
    let vl = form.text.value
    pgEl = `q=${vl}&_page=${pageNum}`

    fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));

    return false
}

function removeEl(e) {
    let el = e.currentTarget.parentElement
    el.classList.toggle('close')

}

function openEl(elId){
    let el = document.getElementById(`op-el`)
    document.getElementById(`btn`).classList.toggle('close')
    document.getElementById(`elem`).classList.toggle('close')
    el.classList.toggle('open')
    fetch(`https://jsonplaceholder.typicode.com/posts?id=${elId}`).then(response => response.json()).then(response =>{
        console.log(response)
        el.innerHTML = `<h2>${response[0].id}.${response[0].title}</h2><h3>${response[0].body}${com}<label for="com">Ост. ком.</label><input type="text" id="srch" name="com"><input type="button" onclick="alert('Нужно авторизоваться!')" value="отпр."></h3><button onclick="bckList()">Bck</button>`
    });
}

function bckList() {
    fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));
    document.getElementById(`btn`).classList.toggle('close')
    document.getElementById(`elem`).classList.toggle('close')
    document.getElementById(`op-el`).classList.toggle('open')
}



