import { DataLoaderService } from './data-loader-service';

export class DataParser {
    constructor (formatList, aggregator) {
        /* file formats to parse */
        this.formatList = formatList;
        /* parser aggregator, transforms data to json object */
        this.aggregator = aggregator;
    }

    loadData() {
        return DataLoaderService.prototype.getData(this.formatList)
            .then(asyncData => {
                return Promise.all(asyncData)
                    .then(data => {
                        // console.log(data);
                        return this.aggregator.parseByFormats(this.formatList, data);
                    });
                });
    }
}
