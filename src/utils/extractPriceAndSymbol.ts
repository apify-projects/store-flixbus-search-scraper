const extractNumberAndSymbol = (textPrice: string) => {
    let priceFloatString: string = ""
    let symbol: string = ""

    const isNumber = (letter: string) => !isNaN(+letter);

    for (let i = 0; i < textPrice.length; i++) {
        const letter = textPrice[i]

        if(isNumber(letter)) {
            priceFloatString = priceFloatString + letter
        } else {
            if (letter === "." || letter === ",") {
                priceFloatString = priceFloatString + "."
            } else {
                symbol = symbol + letter
            }
        }
    }

    return {
        price: parseFloat(priceFloatString),
        symbol,
        text: textPrice
    }
};

export default extractNumberAndSymbol