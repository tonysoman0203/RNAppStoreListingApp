export default class APIRequest{

  static POST(url, headers, params) {
    return fetch(url, {
      method: "POST",
      headers: headers,
      body: params})
      .then((response) => {
        console.log('get response:',response);
        return response.json()
      })
      .then((responseData) => {
        if (responseData) {
          return responseData;
        }
      })
      .catch((error) => {console.log(error)})
  }

  static GET(url, headers) {
    return fetch(url, {
      method: "GET",
      headers: headers})
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          return responseData;
        }
      })
      .catch((error) => {console.log(error)})
  }

}
