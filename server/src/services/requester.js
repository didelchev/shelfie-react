const request = (method, url, data) => {
  let options = {};

  if (method != "GET") {
    options = {
      method,
      header: {
        "content-type": "application/json",
      },
    };
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

const get = (url, data) => request("GET", url, data);
const post = (url, data) => request("POST", url, data);
const del = (url, data) => request("DELETE", url, data);
const put = (url, data) => request("PUT", url, data);
const patch = (url, data) => request("PATCH", url, data);

export {
    get,
    post,
    del,
    put,
    patch
}


