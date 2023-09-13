'use strict'
const hours = document.querySelector('.hours')
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')
// currunt date + 24 hours
const timeToCount = (new Date().setHours(new Date().getHours()+24))
let prevTimeDiff = (timeToCount - new Date())/1000

let counter = setInterval(() => {

    const timeDiff=(timeToCount-new Date())/1000
    if (Math.floor(timeDiff) != Math.floor(prevTimeDiff) ){
        prevTimeDiff=timeDiff
        flipAll(timeDiff)
    }
    
},300);
function flipAll(timeDiff){
    if(timeDiff<0) {
        clearInterval(counter)
        return
    }

    const secondsDiff=Math.floor(timeDiff %60)
    const minutesDiff=Math.floor(timeDiff /60 %60)
    const hoursDiff = Math.floor(timeDiff/( 60 * 60)) 
    flip(seconds.children[1],Math.floor(secondsDiff/10))
    flip(seconds.children[2],secondsDiff % 10)
    flip(minutes.children[1],Math.floor(minutesDiff/10))
    flip(minutes.children[2],minutesDiff % 10)
    flip(hours.children[2],hoursDiff % 10)
    flip(hours.children[1],Math.floor(hoursDiff/10))
    
}

// seconds
// *        *
// *         *
// *          *
// flip(tens)  flip  (ones)
// * *           * *
// *  *           *  *
// *   *          *   *
// top bot         top  bot 

// 0 
// flip 0 => 9
// top half = 0
// top = 9
// half bottom = 9
// bottom


function flip(flipCard,newNumber) {
    let oldNumber=Number.parseInt(flipCard.children[0].textContent)
    if(newNumber===oldNumber)return



    const ttop = flipCard.querySelector('.top')
    const bottom = flipCard.querySelector('.bottom')
    const topHalf = document.createElement('div')
    const hlafBottom = document.createElement('div')
    topHalf.classList.add('top-half')
    hlafBottom.classList.add('half-bottom')
    topHalf.textContent = oldNumber
    hlafBottom.textContent = newNumber
    flipCard.append(topHalf)
    flipCard.append(hlafBottom)
    topHalf.addEventListener('animationstart', e => {
        ttop.textContent = newNumber
    })
    topHalf.addEventListener('animationend', e => {
        topHalf.remove()
    })
    hlafBottom.addEventListener('animationend', e => {
        bottom.textContent = newNumber
        hlafBottom.remove()
    })


}
