import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-d8209-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const winsListInDB = ref(database, "winsList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const winsListEl = document.getElementById("wins-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    if (inputValue.trim() !== "") { // Check if the input value is not empty or whitespace
        push(winsListInDB, inputValue)
        clearInputFieldEl()
    }
})

onValue(winsListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearWinsListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToWinsListEl(currentItem)
        }    
    } else {
        winsListEl.innerHTML = "Tiny wins, big impact - Embrace the power of 1% progress."
    }
})

function clearWinsListEl() {
    winsListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToWinsListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `winsList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    winsListEl.append(newEl)
}
