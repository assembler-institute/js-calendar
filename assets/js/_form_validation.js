const validation = {};

export function formValidation(e, validateAll) {
  const inputsRequired = document.querySelectorAll("input[required]");

  // prevent default message
  document.addEventListener(
    "invalid",
    (function () {
      return function (e) {
        e.preventDefault();
      };
    })(),
    true
  );

  // inject span with validation message
  const showSpanMessage = function (all, input) {
    // if (all) {
    //   inputsRequired.forEach((element) => {
    //     if (element.nextSibling.localName !== "span") {
    //       const span = document.createElement("span");
    //       span.id = element.name;
    //       span.textContent = element.title;
    //       span.classList.add("title__error", "off");
    //       element.insertAdjacentElement("afterend", span);
    //     }
    //   });
    //   return;
    // }

    if (input) {
      if (input.nextSibling.localName !== "span") {
        const span = document.createElement("span");
        span.id = input.name;
        span.textContent = input.title;
        span.classList.add("title__error", "off");
        input.insertAdjacentElement("afterend", span);
      }
    }
  };

  // validate focused input
  const inputValidation = function (e) {
    let input = e.target;
    const span = document.getElementById(input.name);

    if (span) span.classList.replace("on", "off");

    if (!input.validity.valid) {
      showSpanMessage(false, input);
      document.getElementById(input.name).classList.replace("off", "on");
    }
  };

  // validate all form required input
  const formValidation = function (e) {
    inputsRequired.forEach((element) => {
      const span = document.getElementById(element.name);
      if (span) span.classList.replace("on", "off");

      if (!element.validity.valid) {
        showSpanMessage(false, element);
        document.getElementById(element.name).classList.replace("off", "on");
      }
    });
  };

  // choose validation
  if (validateAll) {
    formValidation(e);
    let result = document.querySelector("span.on");
    return result;
  }
  inputValidation(e);
}
