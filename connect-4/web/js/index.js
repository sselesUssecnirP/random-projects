let spanElements = Array.from(document.getElementsByClassName('whoseTurn'));

spanElements.forEach(element => {
    element.innerHTML = "yellow";
});

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
    dropToken(id, theTurn) {
        console.log('opened dropToken')

        column = id.charAt(1)
        id = `L1${id}`

        const doTheThing = (iteration, column, theTurn, id) => {
            console.log(`opened doTheThing... iterations: ${iteration}`)
            console.log(`id: ${id}`)

            let item = document.getElementById(id);

            let previousId, previousItem;
            if (iteration > 0) {
                previousId = `L${Number.parseInt(id.charAt(1)) - 1}C${column}`;
                previousItem = document.getElementById(previousId);
                console.log(`previousId: ${previousId}`)
            }

            id = `L${Number.parseInt(id.charAt(1)) + 1}C${column}`

            if (theTurn === "yellow") {
                item.style.backgroundColor = "#f0f55d";
                tableItems[`column${column}`][iteration].token = "yellow";
                console.log(`theTurn: ${theTurn} // yellow lol`)
                if (iteration > 1) {
                    tableItems[`column${column}`][iteration - 1].token = ""
                    previousItem.style.backgroundColor = ""
                };
            }
            else {
                item.style.backgroundColor = "#ff0000";
                tableItems[`column${column}`][iteration].token = "red";
                console.log(`theTurn: ${theTurn} // red lol`)
                if (iteration > 1) {
                    tableItems[`column${column}`][iteration - 1] = ""
                    previousItem.style.backgroundColor = ""
                };
            }

            if (iteration < 5)
                if  (tableItems[`column${column}`][iteration + 1].token == "") setTimeout(doTheThing, 95, iteration + 1, column, theTurn, id)
        }

        setTimeout(doTheThing, 95, 0, column, theTurn, id)
    }
};

const userWon = (user) => {
    console.log('opened userWon')

    alert(`${user} won!`)
    // reset game
}

const addToken = async (id) => {
    console.log('opened addToken')

    let spanElements = Array.from(document.getElementsByClassName('whoseTurn'));

    spanElements.forEach(element => {
        if (currentTurn === "yellow") {
            element.innerHTML = "red";
        }
        else {
            element.innerHTML = "yellow";
        };
    });

    if (currentTurn === "yellow") currentTurn = "red"
    else currentTurn = "yellow";

    let tableItem;

    tableItems.dropToken(id, currentTurn === "yellow" ? "red" : "yellow");
}