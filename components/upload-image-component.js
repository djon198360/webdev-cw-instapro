import { uploadImage } from "../api.js";
import { setError } from "./error.js";

export function renderUploadImageComponent({ element, onImageUrlChange, page = null }) {
  let imageUrl = "";

  const render = () => {
    element.innerHTML = `${page === "ADD_POST" ? `
    ${
      imageUrl
        ? `<div class="upload=image">
        <div class="file-upload-image-conrainer">
          <img class="file-upload-image" src="${imageUrl}">
          <button class="file-upload-remove-button button">Заменить изображение</button>
        </div>
        </div>
        <p>Введите описание изображения</p>
          <textarea name="description" class="textarea" id="comments" cols="70" rows="10"></textarea>
        `
        : `
          <label class="file-upload-label secondary-button">
              <input
                type="file"
                class="file-upload-input"
                style="display:none"
              />
              Выберите изображение
          </label>  
    `
    }
</div> ` :
  `<div class="upload=image">
      ${
        imageUrl
          ? `
          <div class="file-upload-image-conrainer">
            <img class="file-upload-image" src="${imageUrl}">
            <button class="file-upload-remove-button button">Заменить фото</button>
          </div>
          `
          : `
            <label class="file-upload-label secondary-button">
                <input
                  type="file"
                  class="file-upload-input"
                  style="display:none"
                />
                Выберите фото
            </label>
          
            </div>`
      }
 
   ` }
`;

    const fileInputElement = element.querySelector(".file-upload-input");

    fileInputElement?.addEventListener("change", () => {
      const file = fileInputElement.files[0];
      if (file) {
        const lableEl = document.querySelector(".file-upload-label");
        lableEl.setAttribute("disabled", true);
        lableEl.textContent = "Загружаю файл...";
        uploadImage({ file }).then(({ fileUrl }) => {
          imageUrl = fileUrl;
          onImageUrlChange(imageUrl);
          render();
        }).catch((error) => {
          console.warn(error);
          setError(error.message);
          render ();
        })
        ;
      }
    });

    element
      .querySelector(".file-upload-remove-button")
      ?.addEventListener("click", () => {
        imageUrl = "";
        onImageUrlChange(imageUrl);
        render();
      });
  };

  render();
}
