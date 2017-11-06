import { DataParser } from './data-parser';
import { ParserAggregator } from './parser/parser-aggregator';
import { CsvParser } from './parser/parsers/csv-parser';
import { JsonParser } from './parser/parsers/json-parser';
import { XmlParser } from './parser/parsers/xml-parser';
import { FormatType } from './parser/format-type.enum';

/* available file formats and parsers */
let parserConfig = new Map([
    [ FormatType.csv, CsvParser ],
    [ FormatType.json, JsonParser ],
    [ FormatType.xml, XmlParser ],
]);
let formatParsersList = [ ...parserConfig.keys() ];
let parsers = [...parserConfig.values() ];

let dataParser = new DataParser(formatParsersList, new ParserAggregator(parsers));

let concatenatedData = [];
let tableHeadingData = [];

window.addEventListener('load', () => {
    let dataLoadBtn = document.getElementById('data-load');
    dataLoadBtn.addEventListener('click', () => {
        dataParser.loadData()
            .then(data => {

                /* move json format parsed data to the end of data array so its properties would */
                /* override other formats data objects */
                rearrange(data);

                concatenatedData = data.map(item => item.data.users);
                /* concatenate data */
                concatenatedData = concatenatedData.reduce(concatenate, []);
                /* get unique heading titles */
                let uniqueHeadTitles = concatenatedData
                    .reduce((headingHash, headingObj) => {
                        Object.keys(headingObj).forEach(key => {
                            if (!headingHash[key]) {
                                headingHash[key] = key;
                            }
                        });
                        return headingHash;
                    }, {});
                tableHeadingData = Object.keys(uniqueHeadTitles);
                dataLoadBtn.disabled = true;

                /* table layout */
                initTableHeading(tableHeadingData);
                initTableBody(sorter(concatenatedData, 'id'));
                // console.log(concatenatedData);
            });
    });

    function rearrange(data) {
        let jsonFormatData = data.find(item => item.format === FormatType.json);
        data.splice(data.indexOf(jsonFormatData), 1);
        data.push(jsonFormatData);
    }
});

function removeElements(selector) {
    for(let i = selector.length ? selector.length - 1 : -1; i >= 0; i--) {
        if(selector[i] && selector[i].parentElement) {
            selector[i].parentElement.removeChild(selector[i]);
        }
    }
}

function initTableBody(data) {
    let dataTable = document.querySelector('#data-table tbody');
    let tableBody = document.getElementsByClassName('table-body');
    removeElements(tableBody);

    data.forEach(row => {
        let tr = document.createElement('tr');
        tr.classList.add('table-body');
        tableHeadingData.forEach(cell => {
            let td = document.createElement('td');
            td.textContent = row[cell];
            tr.appendChild(td);
        });
        dataTable.appendChild(tr);
    });
}

function initTableHeading(data) {
    let dataTable = document.querySelector('#data-table tbody');

    let tableHeading = document.createElement('tr');
    tableHeading.id = 'table-heading';
    data.forEach(item => {
        let th = document.createElement('th');
        let btn = document.createElement('button');
        btn.classList.add('btn', 'btn-primary');
        btn.textContent = item;
        btn.addEventListener('click', () => {
            let heading = btn.textContent;
            initTableBody(sorter(concatenatedData, heading));
        });
        th.appendChild(btn);
        tableHeading.appendChild(th);
    });
    dataTable.appendChild(tableHeading);
}

function sorter(arr, type) {
    return arr.sort((a, b) => {
        if (a[type] > b[type]) {
            return 1;
        }
        if (a[type] < b[type]) {
            return -1;
        }
        return 0;
    });
}

/* this function concatenates parsed data objects */
function concatenate(result, curr) {
    for (let i = 0; i < curr.length; i++) {
        const obj = curr[i];
        const id = obj.id;
        let res = result.find(item => item.id === id);
        res ? res = assign(res, obj) : result.push(obj);
    }
    return result;

    /* replace object properties from first argument by object properties from second argument */
    function assign(obj1, obj2) {
        const source = Object.keys(obj1) > Object.keys(obj2) ? Object.keys(obj1) : Object.keys(obj2);
        return source.forEach((key) => {
            obj1[key] = obj2[key] ? obj2[key] : obj1[key];
        });
    }
}
