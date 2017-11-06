import { FormatType } from '../format-type.enum';
import * as csvToJson from 'csvjson';


export class CsvParser {
    get parserType() {
        return FormatType.csv;
    }
    parse(response) {
        let users = csvToJson.toObject(response, { headers: true });
        return Promise.resolve({ format: FormatType.csv, data: { users: users } });
    }
}
