// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = "djon198360";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;
import { setError } from "./components/error.js";


export function getPosts({ token }) {
  const errorDiv = document.querySelector(".app_error");
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      if (response.status < 200 && response.status === null) {
        setError(errorDiv,'Не интернета');
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
       
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const errorDiv = document.querySelector(".app_error");
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    if (response.status === 413 || response.status === 400) {
    setError(errorDiv,"Файл не явлется изображением");
      throw new Error("Файл не явлется изображением");
    }
    return response.json();
  });
}


export function addPost({ token, description, imageUrl}) {
  return fetch(postsHost , {
    method: "POST",
    body: JSON.stringify({
      description,
      imageUrl,
    }),
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 400) {
      setError(errorDiv,"Не заполнено описание");
      throw new Error();
    }
    return response.json();
  });
}

export function delPost(data) {
  return fetch(postsHost +"/"+data.id, {
    method: "DELETE",
    headers: {
      Authorization: data.token,
    },
  }).then((response) => {
    if (response.status === 201) {
      setError(errorDiv,"Удалено");
      throw new Error();
    }
    return response.json();
  });
}

export function getUserPost({ id ,token}) {
  return fetch(postsHost + "/user-posts/"+ id, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Нет такого пользователя");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function getLike({ id,token,like}) {
 (like === "true") ? like ="dislike": like="like";
  return fetch(postsHost + "/"+id +"/"+like, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  })    .then((response) => {
    if (response.status === 401) {
     setError(errorDiv,'Нет авторизации');
    //  throw new Error("Нет авторизации");
    }

    return response.json();
  })
  .then((data) => {
    return data.post;
  });
}
