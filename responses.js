function getResponses() {
    // TODO: Collect actual username and pasword from the form
    username = 'ada'
    password = 'adaisawesome'

    // maybe start a loader
    axios({
        // url: 'http://localhost:8081/responses',
        url: 'https://ainform-api-response.herokuapp.com/responses',
        method: 'GET',
        responseType: 'blob',
        headers: {
            Authorization: 'Basic ' + btoa(username + ':' + password)
        }
    }).then((response) => {
        // close any loader
        filename = "responses.xlsx"
        if (response.headers['content-disposition'] != null) {
            filename = response.headers['content-disposition'].replace(/.*filename=(.*xlsx)/g, '$1')
        }
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(err => {
        // close any loader
        console.log(err.message)
        if (err.response != null) {
            statusCode = err.response.status
            console.log(statusCode)
            // status codes
            switch (statusCode) {
                case 401:
                    // 401 Unauthorised (Invalid username or password/ none provided)
                    break;
                case 404:
                    // 404 Location/LC not found
                    break;
                case 500:
                    // 500 Server error
                    break;
                default:
                    // Unknown error occured
                    break;
            }
        }

    });
}

