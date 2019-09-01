const checkResponse = (response: Response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

class Api {
  public getProducts = () => {
    return fetch('https://avito.dump.academy/products')
            .then(checkResponse)
            .then((response) => response.json());
  }

  public getSellers = () => {
    return fetch('https://avito.dump.academy/sellers')
            .then(checkResponse)
            .then((response) => response.json());
  }
}

export const api = new Api();
