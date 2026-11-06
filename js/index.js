const form = document.getElementById("enquiry-form");
const message = document.getElementById("form-message");
let messageTimer = null;
const recipientEmail = "info@apexnetcafe.co.za";

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const product = form.services.value;
    const description = form.feedback.value.trim();

    // Validation
    if (product === "Deselected") {
      showMessage("Please select a product or service.", true);
      form.services.focus();
      return;
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      showMessage("Phone number must be 10 digits.", true);
      form.phone.focus();
      return;
    }

    const subject = encodeURIComponent(`Apex Cafe Enquiry: ${product}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "Not provided"}\n` +
      `Service: ${product}\n\n` +
      `Enquiry Details:\n${description}`
    );

    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // Success response
    showMessage(
      `Thank you, ${name}! Your enquiry about "${product}" has been prepared in your email app and sent to ${recipientEmail}.`,
      false
    );

    form.reset();
  });
}

function showMessage(text, isError) {
  if (!message) return;

  message.textContent = text;
  message.classList.toggle("error", Boolean(isError));
  message.classList.add("show");

  clearTimeout(messageTimer);
  messageTimer = setTimeout(() => {
    message.classList.remove("show");
  }, 4000);
}