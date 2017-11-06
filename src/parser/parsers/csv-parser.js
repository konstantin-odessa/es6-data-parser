// import { FormatParser } from '../format-parser';
import { FormatType } from '../format-type.enum';
import * as csvToJson from 'csvtojson';

export class CsvParser {
    get parserType() {
        return FormatType.csv;
    }
    parse(response) {
        const users = [];
        return new Promise((resolve, reject) => {
            csvToJson.Converter.prototype
                .fromString(response)
                .on('json', (jsonObj) => {
                    users.push(jsonObj);
                })
                .on('done', () => {
                    resolve({ format: FormatType.csv, data: { users: users } });
                })
                .on('error', (err) => {
                    reject(err);
                    console.error(err);
                });
        });

    }
}
