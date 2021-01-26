const Get = (uri, header) => {
    return new Promise((resolve, reject) => {
        fetch(uri, {
            method: 'GET',
            headers: header
        })
            .then((response) => response.json())
            .then((json) => {
                if (json && json.code && json.code === 'TIME_OUT') {
                    reject(json);
                } else {
                    resolve(json);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const Post = (uri, header, data) => {
    return new Promise((resolve, reject) => {
        fetch(uri, {
            method: 'POST',
            headers: header,
            body: data
        })
            .then((response) => response.json())
            .then((json) => {
                if (json && json.code) {
                    resolve(json);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export { Get, Post };
