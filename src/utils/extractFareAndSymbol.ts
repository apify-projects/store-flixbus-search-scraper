const extractFareAndSymbol = (textPrice: string) => {
    let priceFloatString: string = ""
    let symbol: string = ""

    const isNumber = (letter: string) => !isNaN(+letter);

    const joinedTextPrice = textPrice.replace(/\s/g, "")

    for (let i = 0; i < joinedTextPrice.length; i++) {
        const letter = joinedTextPrice[i]

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
        text: joinedTextPrice
    }
};

export default extractFareAndSymbol