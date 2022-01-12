////To be honest I did not it by myself ; I searched the solution. Although I figure out
// the strategy, I am not able to write it with the konwledge I earned from class. 
// I think it is so much higher than our level. 
const game = {
    xTurn: true,
    xState: [],
    oState: [],
    winningStates: [
    
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}

document.addEventListener('click', event => {
    const target = event.target
    const isTile = target.classList.contains('tile')
    const isDisabled = target.classList.contains('disabled')

    if (isTile && !isDisabled) {
        const tileValue = target.dataset.value
        game.xTurn === true ? game.xState.push(tileValue) : game.oState.push(tileValue)
        target.classList.add('disabled')
        target.classList.add(game.xTurn ? 'fill-x' : 'fill-o')

        game.xTurn = !game.xTurn
        
        // If all cells are disabled, then its draw
        if (!document.querySelectorAll('.tile:not(.disabled)').length) {
            document.querySelector('.game-over').classList.add('visible')
            document.querySelector('.game-over-text').textContent = 'Draw!'
        }

        game.winningStates.forEach(winningState => {
            const xWins = winningState.every(state => game.xState.includes(state))
            const oWins = winningState.every(state => game.oState.includes(state))

            if (xWins || oWins) {
                document.querySelectorAll('.tile').forEach(cell => cell.classList.add('disabled'))
                document.querySelector('.game-over').classList.add('visible')
                document.querySelector('.game-over-text').textContent = xWins? 'X wins!' : 'O wins!'
            }
        })
    }
})

document.querySelector('.reset').addEventListener('click', () => {
    document.querySelector('.game-over').classList.remove('visible')
    document.querySelectorAll('.tile').forEach(cell => {
        cell.classList.remove('disabled', 'fill-x', 'fill-o')
    })

    game.xTurn = true
    game.xState = []
    game.oState = []
})