import { API_BASE_URL } from "./api-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  let headers = new Headers({
    "Content-Type": "application/json",
  });

  if (accessToken && accessToken != null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    //Get method
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      console.log(error.status);
      if (error.status === 403) {
        window.location.href = "login"; //코드403 받으면 login 페이지로 던짐
      }
      return Promise.reject(error);
    });
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    console.log("response: " + response);

    if (response.token) {
      localStorage.setItem("ACCESS_TOKEN", response.token);
      window.location.href = "/";
    }
  });
}

export function signout() {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = "/login";
}

export function signup(userDTO) {
  return call("/signup", "POST", userDTO);
}
