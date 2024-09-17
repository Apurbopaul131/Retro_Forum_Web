const removeOrAddClassById = (elementId, elementClass, isShow) => {
  const targetElement = document.getElementById(elementId);
  if (isShow) {
    targetElement.classList.add(elementClass);
  } else {
    targetElement.classList.remove(elementClass);
  }
};
