// a list that will store all the url 
let myLeads = []

// getting elements of HTML 
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')
const leadsFromLocalStorange = JSON.parse(localStorage.getItem("myLeads"))

// checking local storage is empty or not
if (leadsFromLocalStorange){
    myLeads = leadsFromLocalStorange
    render(myLeads)
}

// rendering saved links on extention view section
function render(leads){
    let listItem = ""
    for (let i = 0;i<leads.length;i++){
        listItem += `<li>
                        <a target = '_blank' href=' ${leads[i]} '> 
                            ${leads[i]} 
                        </a>
                    </li>`

    }
    ulEl.innerHTML = listItem
}

// delete button to clear local storage & the list
deleteBtn.addEventListener('dblclick', function(){
    console.log('double click')
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// taking inputs url from the input section of the extensions
inputBtn.addEventListener('click', function(){
    myLeads.push(inputEl.value)
    console.log(myLeads)
    inputEl.value = ''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

    console.log(localStorage.getItem("myLeads"))
    
})

// getting current tab url 
tabBtn.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

})
