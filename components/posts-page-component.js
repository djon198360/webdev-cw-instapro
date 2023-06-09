import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = posts.map((comment,likes) => {
   return  `<li class="post">
                    <div class="post-header" data-user-id="${comment.user.id}">
                        <img src="${comment.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${comment.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${comment.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${comment.id}" class="like-button">
                        <img src="./assets/images/like-active.svg">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${comment.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${comment.user.name}</span>
                      ${comment.description}
                    </p>
                    <p class="post-date">
                      ${comment.createdAt}
                    </p>
                  </li>
                `;
              }).join("");
  appEl.innerHTML = `<div class="page-container">
  <div class="header-container"></div>
  <ul class="posts">${appHtml} </ul>
  </div>`;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
