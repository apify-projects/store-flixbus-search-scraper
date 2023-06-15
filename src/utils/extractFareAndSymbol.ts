export const extractFareAndSymbol = (farePrice: string) => {
    let priceFloatString = '';
    let symbol = '';

    // eslint-disable-next-line no-restricted-globals
    const isNumber = (letter: string) => !isNaN(+letter);

    const joinedTextPrice = farePrice.replace(/\s/g, '');

    // Scan through the farePrice
    // If the current letter can be a number it will be added to priceFloatString
    // that will be then converted to float
    // But if the letter cannot be a number it will be checked and then put to symbol
    for (let i = 0; i < joinedTextPrice.length; i++) {
        const letter = joinedTextPrice[i];

        if (isNumber(letter)) {
            priceFloatString += letter;
        } else if (letter === '.' || letter === ',') {
            priceFloatString = `${priceFloatString}.`;
        } else {
            symbol += letter;
        }
    }

    return {
        price: parseFloat(priceFloatString),
        symbol,
        text: joinedTextPrice,
    };
};
