function setInputValid({ inputErrorClass, errorClass }, field, errorMessage) {
  field.classList.remove(inputErrorClass);
  errorMessage.classList.remove(errorClass);
}

function setInputInvalid({ inputErrorClass, errorClass }, field, errorMessage) {
  field.classList.add(inputErrorClass);

  errorMessage.textContent = field.validationMessage;
  errorMessage.classList.add(errorClass);
}

function checkInputValidity(rest, form, field) {
  const errorMessage = form.querySelector(`#error-${field.id}`);

  if (field.validity.valid) {
    setInputValid(rest, field, errorMessage);
  } else {
    setInputInvalid(rest, field, errorMessage);
  }
}

function disableSubmitButton(inactiveButtonClass, button) {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
}

function enableSubmitButton(inactiveButtonClass, button) {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonClass);
}

function checkSubmitButtonValidity({ inactiveButtonClass }, form, button) {
  if (form.checkValidity()) {
    enableSubmitButton(inactiveButtonClass, button)
  } else {
    disableSubmitButton(inactiveButtonClass, button)
  }
}

function setEventListeners({ inputSelector, submitButtonSelector, ...rest }, form) {
  const fields = form.querySelectorAll(inputSelector);
  const button = form.querySelector(submitButtonSelector);

  fields.forEach(field => {
    field.addEventListener('input', function() {
      checkInputValidity(rest, form, field, button);
      checkSubmitButtonValidity(rest, form, button);
    });
  });

  checkSubmitButtonValidity(rest, form, button);
}

function enableValidation({ formSelector, ...rest }) {
  const forms = document.querySelectorAll(formSelector);

  for (const form of forms) {
    setEventListeners(rest, form);
  }
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_type_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_visible'
});
