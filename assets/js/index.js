let pageNum = 1;
let lenLi = undefined;
let limit = 10;
let pgEl = `_page=${pageNum}`
let com = '<h4>Коментарии</h4><p>Саша:Ну такое<br>Foirt:Tye emose tritedorio cumpacto espansio<br>Саша:Ну а я то тебя прекрасно понимаю</p> '
let listDelite = []
let arrAddElem = []
let srchVersion = true
let vl = ''

function respFch(resp) {
    let respLength = resp.length;
    if(respLength == 0){
        pageNum--
        return false
    }else if(respLength < 10){
        lenLi = respLength - 1
        for (let i = 9; i > lenLi; i--){
            document.getElementById(`el${i}`).classList.toggle('close')
        }
    }else{
        for (let i = 9; i > lenLi; i--) {
            document.getElementById(`el${i}`).classList.toggle('close')
        }
        lenLi = undefined;
    }

    for (let i = 0; i < resp.length; i++){
        if(listDelite.includes(`${resp[i].id}`)){
            resp.splice(i, 1)
            console.log(resp.length)
            i--
        }
    }

    if(resp.length < respLength){
        respFch(resp)
    }else{
        for (let i = 0; i < respLength; i++) { 
            document.getElementById(`el${i}`).innerHTML = `<h2>${resp[i].id}</h2><h2>${resp[i].title}</h2><h3>${resp[i].body}</h3><button onclick="openEl(${resp[i].id})">Open</button><button onclick="removeEl(event)">Del</button>`
        }
    }
}

fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));



function nextList() {
    pageNum++;
    if (pgEl.length > 10){
        serchEl(false)
    }else{
        pgEl = `_page=${pageNum}`
        fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));
    };
};

function backList() {
    if (pageNum > 1) {
        pageNum--
        if (pgEl.length > 10) {
            serchEl(false)
        } else {
            pgEl = `_page=${pageNum}`
            fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));
        }  
      };
};

function serchEl(i) {
    let form = document.getElementById('srch');
    if(i&&form.value == ''){
        return false
    }
    if(i&&form.value!==''){
        vl = form.value
        srchVersion = true
        form.value=''
    }

    if(pgEl.length < 10){
        document.getElementById('srch-bck').classList.toggle('open')
        document.getElementById('btn-add').classList.toggle('srchBack')
    }
    if(srchVersion){
        srchVersion = false
        pageNum = 1
    }
    pgEl = `q=${vl}&_page=${pageNum}`
    fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));

    return false
}

function srchBck(){
    document.getElementById('srch-bck').classList.toggle('open')
    document.getElementById('btn-add').classList.toggle('srchBack')

    srchVersion = true
    pageNum = 1
    
    pgEl = `_page=${pageNum}`
    fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));

    return false
}

function removeEl(e) {
    let parentElem = e.currentTarget.parentElement
    let firstChildElem = parentElem.firstElementChild
    listDelite.push(firstChildElem.innerHTML)
    fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));
    console.log(listDelite)
}

function openEl(elId){
    let el = document.getElementById(`op-el`)
    document.getElementById(`btn`).classList.toggle('close')
    document.getElementById(`elem`).classList.toggle('close')
    document.getElementById(`serch-form`).classList.toggle('srchBack')

    el.classList.toggle('open')
    fetch(`https://jsonplaceholder.typicode.com/posts?id=${elId}`).then(response => response.json()).then(response =>{
        el.innerHTML = `<h2>${response[0].id}.${response[0].title}</h2><h3>${response[0].body}${com}<label for="com">Ост. ком.</label><input type="text" id="srch" name="com"><input type="button" onclick="alert('Нужно авторизоваться!')" value="отпр."></h3><button onclick="bckList(event)">Bck</button>`
    });
}

function bckList(e) {
    fetch(`https://jsonplaceholder.typicode.com/posts?${pgEl}&_limit=10`).then(response => response.json()).then(response => respFch(response));
    document.getElementById(`btn`).classList.toggle('close')
    document.getElementById(`elem`).classList.toggle('close')
    document.getElementById(`serch-form`).classList.toggle('srchBack')

    let elemParent = e.currentTarget.parentElement
    elemParent.classList.toggle('open')
}

function addEl(){
    document.getElementById(`btn`).classList.toggle('close')
    document.getElementById(`elem`).classList.toggle('close')
    document.getElementById(`serch-form`).classList.toggle('srchBack')
    
    let elemAdd = document.getElementById(`add-elem`)
    elemAdd.classList.toggle('open')
    elemAdd.innerHTML = '<label for="title">Название</label><br><input type="text" id="add-title" name="title"><br><label for="body">Пост</label><br><textarea name="body" id="add-body" cols="30" rows="10"></textarea><br><button onclick="addElemInList(event)">Add</button><br><button onclick="bckList(event)">Bck</button>' 
}

function addElemInList(e){
    let addTitle = document.getElementById('add-title');
    let vlTitle = addTitle.value
    let addBody = document.getElementById('add-body');
    let vlBody = addBody.value
    if(vlTitle&&vlBody){
        fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: vlTitle,
    body: vlBody,
    userId: 11,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}).then((response) => response.json()).then((response) => alert(`Добавлен новый пост ${response.id}. ${response.title}`));
bckList(e)
    }
}

