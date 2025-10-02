document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector(".contacts__form");
  const fields = ["name", "surname", "email", "phone"];
  const patterns = {
    email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
    phone: /^(\+46|0)[0-9]{7,12}$/
  };

  form.addEventListener("submit", e => {
    e.preventDefault();

    let isValid = true;
    const userData = {};

    fields.forEach(field => {
      const input = document.getElementById(field);
      const errorEl = document.getElementById(field + "Error");
      errorEl.textContent = "";
      userData[field] = input.value.trim();

      if (!userData[field]) {
        errorEl.textContent = "Detta fält är obligatoriskt";
        if (isValid) input.focus();
        isValid = false;
      } else if (patterns[field] && !patterns[field].test(userData[field])) {
        errorEl.textContent = field === "email"
          ? "Ange en giltig e-postadress (exempel: namn@example.com)"
          : "Ange ett giltigt svenskt telefonnummer (+46 eller 0...).";
        if (isValid) input.focus();
        isValid = false;
      }
    });
    
    const checkbox = document.getElementById("checkbox");
    const checkboxError = document.getElementById("checkboxError");
    checkboxError.textContent = "";

    if (!checkbox.checked) {
      checkboxError.textContent = "Du måste godkänna villkoren.";
      if (isValid) checkbox.focus();
      isValid = false;
    } else {
      userData["checkbox"] = true;
    }


    if (!isValid) return;

    document.getElementById("formSuccess").textContent = "Formuläret skickades framgångsrikt!";

    if (typeof gtag === "function") {
      gtag('event', 'form_submit', {
        'event_category': 'Contact Form',
        'event_label': 'Lead Form Success',
        'value': 1,
        ...userData
      });
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'form_submit',
      'form_name': 'contacts_form',
      'status': 'success',
      ...userData
    });

    form.reset();
  });

  const menuBtn = document.getElementById('menuBtn');
  const menuBtnIcon = document.getElementById('menuBtnIcon');
  const menu = document.getElementById('menu');
  const menuLinks = menu.querySelectorAll('a');

  const toggleMenu = () => {
    const open = menu.classList.toggle('menu--open');
    document.body.style.overflow = open ? 'hidden' : '';
    menuBtnIcon.src = open ? "./assets/svg/close.svg" : "./assets/svg/burger.svg";
  };

  menuBtn.addEventListener('click', toggleMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('menu--open');
      document.body.style.overflow = '';
      menuBtnIcon.src = "./assets/svg/burger.svg";
    });
  });
});
