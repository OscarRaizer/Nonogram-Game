// Results modal
export default function modalResolve() {
  const modalResolveWrapper = document.createElement("div");
  modalResolveWrapper.classList.add("modal__wrapper");
  document.body.appendChild(modalResolveWrapper);

  const modalResolveInner = document.createElement("div");
  modalResolveInner.classList.add("modal__resolve");
  modalResolveWrapper.appendChild(modalResolveInner);

  const paragraph = document.createElement("p");
  paragraph.classList.add("modal__title");
  paragraph.textContent = "CONGRATULATIONS!";
  modalResolveInner.appendChild(paragraph);

  const modalClose = document.createElement("div");
  modalClose.classList.add("modal__close");
  modalResolveInner.appendChild(modalClose);
  modalClose.innerHTML = "<p>X</p >";

  return {
    modalResolveWrapper,
    modalResolveInner,
    paragraph,
    modalClose,
  };
}
