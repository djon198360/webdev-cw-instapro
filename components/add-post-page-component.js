import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";


export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
      <div class="form-inputs">
      <h3 class="form-title">Добавить пост</h3>
          <div class="upload-image-container"></div>
          <div class="form-error"></div>

          <button class="button" id="add-button">Добавить пост</button>
          </div>
    </div>
  `;
    appEl.innerHTML = appHtml;
    const uploadImageContainer = appEl.querySelector(".upload-image-container");
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });
    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
        page :  "ADD_POST",
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  render();
}
