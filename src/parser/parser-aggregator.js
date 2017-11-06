/* to add additional parsing functionality, you must
 * 1. add to TypeEnum enum file format */
/* 2. add parser class for corresponding file format */

export class ParserAggregator {
    constructor(parsers) {
        /* Map of parser functions */
        this.parsersMap = new Map();

        this.initParsers(parsers);
    }

    /* parse files data with correspondig parsing functions */
    parseByFormats(formatsList, data) {
        return Promise.all(data.map((item, index) => {
            /* check if format parser function exists in parserMap */
            if (this.parsersMap.has(formatsList[index])) {
                return this.parsersMap.get(formatsList[index]).prototype.parse(item);
            }
        }))
            .then(
                (result) => {
                    // console.log(result);
                    return result;
                },
                error => {
                    console.error(error);
                }
            );
    }

    /* initialize parser functions */
    initParsers(parsers) {
        parsers.forEach(parser => {
            this.parsersMap.set(parser.prototype.parserType, parser);
        });
    }
}




