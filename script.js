const totalCases = document.querySelector(".displayTotalCases")
const statesContainer = document.querySelector(".statesContainer")
const recoveredData = document.querySelector(".recoveredData")
const deathsData = document.querySelector(".deathsData")
const table = document.querySelector("table")
const information = document.querySelector(".information")
const infoImage = document.querySelector(".infoImage")
let today = new Date()
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1);
// console.log(date)
const covidUrlToday = `https://api.covid19api.com/live/country/india/status/confirmed/date/${date}`
const scrollDownImage = document.querySelector(".scrollDown")
function thousands_separators(num)
{
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

fetch(covidUrlToday).then((data) => {
    // console.log(data.text());
    return data.text();
}).then((result => {
    // console.log(result);
    const array = JSON.parse(result);
    // console.log(array);
    // let i=0;
    for(let i=0; i<36 ; i++){
        array.sort(function (a, b) {
            return b.Active - a.Active;
          });
        let element = document.createElement("div")
        element.classList.add("new")
        element.innerHTML = `<div class="states">
        <div class="stateName">${array[i].Province}</div>
        <div class="stateNumber">${thousands_separators(array[i].Active)}</div>
        </div>`
        statesContainer.appendChild(element);
        let sum=0;
        for(let i=0; i<36;i++){
            sum += array[i].Active;
        }
        totalCases.innerHTML = thousands_separators(sum);

}
    let sumRecovered=0;
    let sumDeaths = 0;
    array.forEach(element => {
        sumRecovered += element.Recovered
        sumDeaths += element.Deaths
    })
    
    recoveredData.innerHTML = thousands_separators(sumRecovered);
    deathsData.innerHTML = thousands_separators(sumDeaths);
}))




statesContainer.addEventListener("mousewheel", () => {
    scrollDownImage.style.opacity = 0;
})

//Inforamtion box
information.addEventListener('mouseenter', () => {
    infoImage.classList.add("open");
})
information.addEventListener('mouseleave', () => {
    infoImage.classList.remove("open");
})

