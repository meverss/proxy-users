export const ValidateDataType = (formField, user, fullname) => {
  const fields = document.querySelectorAll(`${formField}`);
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
  const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  const validUser = /^[0-9a-zA-Z]{3,16}$/
  const validUserFullName = /^[A-Z a-záéíóúÁÉÍÓÚ]{3,100}$/
  const validPassword = /^(?=.*[0-9])(?=.*[!@#$£%^&*,.;:~])(?=.*[A-Z])[a-zA-Z0-9!@#$£%^&*,.;:~]{6,16}$/
  
  // fields.forEach((field) => {
  //   switch (field.dataset.frminfo) {
  //     case "email":
  //       field.type = "email";
  //       break;
  //     case "password":
  //       field.type = "password";
  //       break;
  //     default:
  //       field.type = "text";
  //       break;
  //   }
  // });

  fields.forEach((e) => {
    const dataType = e.dataset.frminfo

    switch (dataType) {
      case "user":
        e.addEventListener('focusout', () => {
          if (!validUser.test(e.value)) {
            e.classList.add("wrong", "animate__animated", "animate__shakeX")
            e.value = ""
            e.placeholder = "Identificador de usuario inválido"
            setTimeout(() => {
              e.classList.remove("wrong", "animate__animated", "animate__shakeX")
            }, 1000);
            setTimeout(() => {
              e.value = user
            }, 3500)
          }
        })
        break;
      case "fullname":
        e.addEventListener('focusout', () => {
          if (!validUserFullName.test(e.value)) {
            e.classList.add("wrong", "animate__animated", "animate__shakeX");
            e.value = ""
            e.placeholder = "Nombre de usuario inválido"
            setTimeout(() => {
              e.classList.remove("wrong", "animate__animated", "animate__shakeX")
            }, 1000);
            setTimeout(() => {
              e.value = fullname
            }, 3500);
          }
        })
        break;
      case "password":
        e.addEventListener('focusout', () => {
          if (!validPassword.test(e.value)) {
            e.classList.add("wrong", "animate__animated", "animate__shakeX");
            e.value = ""
            e.placeholder = "La contraseña no es segura"
            setTimeout(() => {
              e.classList.remove("wrong", "animate__animated", "animate__shakeX")
            }, 1000);
            setTimeout(() => {
              e.placeholder = '********'
            }, 3500);
          }
        })
        break;
      case "email":
        e.style['textTransform'] = 'lowercase'
        e.addEventListener('focusout', () => {
          if (!validEmail.test(e.value)) {
            e.classList.add("wrong", "animate__animated", "animate__shakeX")
            e.value = ""
            e.style['textTransform'] = 'none'
            e.placeholder = "Enter a valid e-mail address"
            setTimeout(() => {
              e.classList.remove("wrong", "animate__animated", "animate__shakeX")
            }, 1000)
            setTimeout(() => {
              e.style['textTransform'] = 'lowercase'
              e.placeholder = "your@email.here"
            }, 3500)
          }
        })
        break
      case "phone":
        e.addEventListener('focusout', () => {
          if (!validPhone.test(e.value)) {
            e.classList.add("wrong", "animate__animated", "animate__shakeX")
            e.value = ""
            e.placeholder = "Enter a valid phone number"
            setTimeout(() => {
              e.classList.remove("wrong", "animate__animated", "animate__shakeX")
            }, 1000)
            setTimeout(() => {
              e.placeholder = "Where can we call you?"
            }, 3500)
          }
        })
        break
    }
  })
}
