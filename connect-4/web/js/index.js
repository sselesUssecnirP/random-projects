let spanElements = Array.from(document.getElementsByClassName('whoseTurn'));

spanElements.forEach(element => {
    element.innerHTML = "yellow";
    element.parentNode.style.backgroundColor = "#f0f55d"
});

const detectWinner = () => {
    let keys = Object.keys(tableItems)
    keys.pop()
    console.log(keys)
    keys.forEach(key => {
        let itemsv = "";
        tableItems[key].forEach(item => {
            itemsv = `${itemsv}${item.token.charAt(0)}`
        });

        

        console.log(`AFTER dropToken() -- items: ${itemsv}`)

        if (/y{4}/.test(itemsv)) 
            userWon('yellow');
        else if (/r{4}/.test(itemsv))
            userWon('red');
    });
}

let currentTurn = "yellow";
const tableItems = {
    column1: [
        { line: 1, token: ''},
        { line: 2, token: ''},
        { line: 3, token: ''},
        { line: 4, token: ''},
        { line: 5, token: ''},
        { line: 6, token: ''}
    ],
    column2: [
        { line: 1, token: ''},
        { line: 2, token: ''},
        { line: 3, token: ''},
        { line: 4, token: ''},
        { line: 5, token: ''},
        { line: 6, token: ''}
    ],
    column3: [
        { line: 1, token: ''},
        { line: 2, token: ''},
        { line: 3, token: ''},
        { line: 4, token: ''},
        { line: 5, token: ''},
        { line: 6, token: ''}
    ],
    column4: [
        { line: 1, token: ''},
        { line: 2, token: ''},
        { line: 3, token: ''},
        { line: 4, token: ''},
        { line: 5, token: ''},
        { line: 6, token: ''}
    ],
    column5: [
        { line: 1, token: ''},
        { line: 2, token: ''},
        { line: 3, token: ''},
        { line: 4, token: ''},
        { line: 5, token: ''},
        { line: 6, token: ''}
    ],
    column6: [
        { line: 1, token: ''},
        { line: 2, token: ''},
        { line: 3, token: ''},
        { line: 4, token: ''},
        { line: 5, token: ''},
        { line: 6, token: ''}
    ],
    column7: [
        { line: 1, token: ''},
        { line: 2, token: ''},
        { line: 3, token: ''},
        { line: 4, token: ''},
        { line: 5, token: ''},
        { line: 6, token: ''}
    ],
    async dropToken(id, theTurn) {
        console.log('opened dropToken')

        column = id.charAt(1)
        id = `L1${id}`

        const doTheThing = (iteration, column, theTurn, id) => {
            console.log(`%copened doTheThing... iterations: ${iteration} // id: ${id} // col: ${column}`, `color: #ee5533`)

            let item = document.getElementById(id);

            let previousId, previousItem;
            if (iteration > 0) {
                previousId = `L${Number.parseInt(id.charAt(1)) - 1}C${column}`;
                previousItem = document.getElementById(previousId);
                console.log(`%cpreviousId: ${previousId}`, `color: #00ff00`);
            }

            id = `L${Number.parseInt(id.charAt(1)) + 1}C${column}`

            if (theTurn === "yellow") {
                item.style.backgroundColor = "#f0f55d";
                tableItems[`column${column}`][iteration].token = "yellow";
                console.log(`%ctheTurn: ${theTurn} // yellow lol`, `color: #00ff00`);
                if (iteration >= 1) {
                    previousItem.style.backgroundColor = "";
                    tableItems[`column${column}`][iteration - 1].token = "";
                };
            }
            else if (theTurn === "red") {
                item.style.backgroundColor = "#ff0000";
                tableItems[`column${column}`][iteration].token = "red";
                console.log(`%ctheTurn: ${theTurn} // red lol`, `color: #00ff00`);
                if (iteration >= 1) {
                    previousItem.style.backgroundColor = "";
                    tableItems[`column${column}`][iteration - 1].token = "";
                };
            }

            if (iteration < 5)
                if  (tableItems[`column${column}`][iteration + 1].token == "") setTimeout(doTheThing, 95, iteration + 1, column, theTurn, id)
        }

        setTimeout(doTheThing, 95, 0, column, theTurn, id)

        await ((ms) => {
            return new Promise(resolve => setTimeout(resolve, ms))
        })(125*7)

        detectWinner()
    }
};

const userWon = (user) => {
    console.log('opened userWon')
    alert(`${user} won!`)
    window.location.reload()
}

const addToken = async (id) => {
    console.log('opened addToken')

    if (tableItems[`column${id.charAt(1)}`][0].token !== "")
        return;

    let spanElements = Array.from(document.getElementsByClassName('whoseTurn'));

    spanElements.forEach(element => {
        if (currentTurn === "yellow") {
            element.innerHTML = "red";
            element.parentNode.style.backgroundColor = "#FF0000"
            element.parentNode.style.color = "#fff"
        }
        else {
            element.innerHTML = "yellow";
            element.parentNode.style.backgroundColor = "#f0f55d"
            element.parentNode.style.color = "#000"
        };
    });

    if (currentTurn === "yellow") currentTurn = "red"
    else currentTurn = "yellow";

    tableItems.dropToken(id, currentTurn === "yellow" ? "red" : "yellow");
}