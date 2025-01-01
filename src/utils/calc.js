export function calcWonderPoints(wonder, side, stageBuilt) {
    console.error(`wonder: ${JSON.stringify(wonder)}`)
    let result = 0
    let pointsByStages = undefined
    if(side == 'A'){
        pointsByStages = wonder.A.pointsByStages
    } else {
        pointsByStages = wonder.B.pointsByStages
    }

    for (let idx = 0; idx < pointsByStages.length; idx++) {
        if(idx < stageBuilt) {
            result += pointsByStages[idx];
        }
    }
    return result
}

export function calcGoldPoints(givenGoldCount) {
    console.error(`calcGoldPoints(${givenGoldCount})`)
    return Math.floor(givenGoldCount / 3)
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