// import { FormatParser } from '../format-parser';
import { FormatType } from '../format-type.enum';
import * as xml2js from 'xml2js';

export class XmlParser {
    get parserType() {
        return FormatType.xml;
    }
    parse(response) {
        return new Promise((resolve, reject) => {
            xml2js.parseString( response, function (err, result) {
                if (err) {
                    reject(err);
                }
                result.users = result.users.user.map(item => {
                    return {
                        id: item.$.id,
                        firstName: item.firstName ? item.firstName[0] : '',
                        secondName: item.secondName ? item.secondName[0] : '',
                        email: item.email ? item.email[0] : '',
                        phoneNumber: item.phoneNumber ? item.phoneNumber[0] : '',
                    };
                });
                resolve({ format: FormatType.xml, data: result });
            });
        });

    }
}
