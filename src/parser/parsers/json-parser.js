// import { FormatParser } from '../format-parser';
import { FormatType } from '../format-type.enum';

export class JsonParser {
    get parserType() {
        return FormatType.json;
    }
    parse(response) {
        const data = JSON.parse(response);
        return Promise.resolve({ format: FormatType.json, data: data });
        // return new Promise((resolve, reject) => {
        //     resolve({ format: FormatType.json, data: data });
        // });
    }
}
