const configOptions = {
    url: '',
    method: 'GET',
};

export class DataLoaderService {
    getData(formatsList) {
       return Promise.all(formatsList.map(this.fetchRequest))
            .then(data => {
                return data.map(response => response.text());
            })
           .catch(error => console.error(error));
    }

    fetchRequest (format) {
        const url = `${configOptions.url}assets/server-data/data.${format}`;
        console.info(url);
        return fetch(url, configOptions);
    }
}

