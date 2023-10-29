const WEEK = [ "SUN" , "MON" , "TUE" , "WED" , "THU" , "FRI" , "SAT"];

function updateTime(){
    var now = new Date();

    document.getElementById("time").innerText =
            zeroPadding(now.getHours(), 2) + ":" + 
            zeroPadding(now.getMinutes(), 2) + ":" + 
            zeroPadding(now.getSeconds(), 2);

    document.getElementById("date1").innerText =
            now.getFullYear() + "-" +
            zeroPadding(now.getMonth()+ 1, 2) + "-" +
            zeroPadding(now.getDate(), 2) + " " +
            WEEK[now.getDay()];
}

updateTime();
setInterval(updateTime, 1000);

function zeroPadding(num, digit){
    return String(num).padStart(digit, "0");
}
// 原始碼
window.addEventListener('load', function () {
    const saveBtn = document.getElementById('save')
    const deleteBtn = document.getElementById('delete')
    const deleteAllBtn = document.getElementById('deleteAll')
    const list = document.getElementById('list')
    const date = document.getElementById('date')
    const note = document.getElementById('note')

    if (localStorage.listContent == undefined) {
        localStorage.listContent = JSON.stringify([])
    }
    let listContent = JSON.parse(localStorage.listContent)

    function saveToStorage(i) {
        localStorage.listContent = JSON.stringify(i)
    }

    render(listContent)

    function render(listContent) {
        let listHtml = ''
        listContent.forEach(function (item) {
            listHtml = listHtml + `
                <div class='listItem'>
                    <p>Date: ${item.date}</p>
                    <p>Note: ${item.note}</p>
                </div>
            `
        })

        list.innerHTML = listHtml
        saveToStorage(listContent)
    }

    saveBtn.addEventListener('click', function () {
        listContent.unshift({
            date: date.value,
            note: note.value
        })

        render(listContent)

        date.value = ''
        note.value = ''
    })

    note.addEventListener('keyup', function (event) {
        if (event.keyCode == 13) {
            listContent.unshift({
                date: date.value,
                note: note.value
            })
            render(listContent)

            date.value = ''
            note.value = ''
        }
    })

    deleteBtn.addEventListener('click', function () {
        listContent.shift()

        render(listContent)
    })

    deleteAllBtn.addEventListener('click', function () {
        if (window.confirm('Are you sure to clear ALL the notes?')) {
            listContent = []
            saveToStorage(listContent)
            render(listContent)
        }
    })
})