export const extractFareAndSymbol = (textPrice: string) => {
    let priceFloatString = '';
    let symbol = '';

    // eslint-disable-next-line no-restricted-globals
    const isNumber = (letter: string) => !isNaN(+letter);

    const joinedTextPrice = textPrice.replace(/\s/g, '');

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
