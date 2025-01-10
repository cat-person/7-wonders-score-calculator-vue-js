import wonders from '@/assets/wonders.json'

function getWonder(wonderId, side) {
    console.error(`calc.getWonder (wonderId: ${wonderId}, side: ${side}`)
    let result = undefined
    wonders.forEach((wonder) => { 
        if(wonder.id == wonderId){
            result = wonder
        }
    })
    if(side == 'A'){
      return result.A
    } else {
      return result.B
    }
}

export function calcWonderPoints(wonderData) {
    console.error(`calc.calcWonderPoints(wonderData: ${JSON.stringify(wonderData)})`)
    let wonder = getWonder(wonderData.id, wonderData.side)

    let result = 0
    let pointsByStages = wonder.pointsByStages

    for (let idx = 0; idx < pointsByStages.length; idx++) {
        if(idx < wonderData.stageBuilt) {
            result += pointsByStages[idx];
        }
    }
    return result
}

export function calcCoinPoints(givenCoinCount) {
    console.error(`calcCoinPoints(${givenCoinCount})`)
    return Math.floor(givenCoinCount / 3)
}

export function calcMilitary(battles) {
    var result = -6

    if(battles['bronze.left'] === 'Won') {
        result += 2
    }
    if(battles['bronze.right'] === 'Won') {
        result += 2
    }   
    if(battles['silver.left'] === 'Won') {
        result += 4
    }
    if(battles['silver.right'] === 'Won') {
        result += 4
    }
    if(battles['golden.left'] === 'Won') {
        result += 6
    }
    if(battles['golden.right'] === 'Won') {
        result += 6
    }

    return result
}

export function calcSciencePoints(clayCount, measurerCount, cogCount) {
    return clayCount * clayCount + measurerCount * measurerCount + cogCount * cogCount + 7 * (Math.min.apply(Math, [clayCount, measurerCount, cogCount]))
}

export function calcSum(playerScore) {
    console.error(`calcSum(playerScore: ${JSON.stringify(playerScore)})`)
    let wonderPoints = calcWonderPoints(playerScore.wonder) // err
    let coinPoints = calcCoinPoints(playerScore.coinCount)
    let militaryPoints = calcMilitary(playerScore.battles)
    let culturePoints = playerScore.culturePoints
    let tradePoints = playerScore.tradePoints
    let sciencePoints = calcSciencePoints(playerScore.science.clayCount, playerScore.science.measurerCount, playerScore.science.cogCount)
    let guildPoints = playerScore.guildPoints

    return wonderPoints 
        + coinPoints
        + militaryPoints
        + culturePoints
        + tradePoints
        + sciencePoints
        + guildPoints
}