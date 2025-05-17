function rollDice(){
    const numOfDiceInput = document.getElementById("numOfDice");
    const numOfDice = Math.min(numOfDiceInput.value, 21);
    const diceResult = document.getElementById("diceResult");
    const diceImages = document.getElementById("diceImages");
    const values = [];
    const images = [];

    for(let i = 0; i < numOfDice; i++){
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="taringud/${value}.png" alt="Täring ${value}">`);
    }

    diceResult.innerHTML = `<strong>Veeretasid: ${values.join(', ')}</strong>`;
    diceImages.innerHTML = images.join('');
}