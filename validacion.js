document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    // Campos y mensajes de error
    const nombre = document.getElementById("nombre");
    const fechaNacimiento = document.getElementById("fecha-nacimiento");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const dni = document.getElementById("dni");
    const residencia = document.getElementById("residencia");
    const edad = document.getElementById("edad");
    const nivelEducativo = document.getElementById("nivel-educativo");
    const areaCheckboxes = document.querySelectorAll("input[name='area[]']");
    const comentarios = document.getElementById("comentarios");

    const errorMessages = {
        nombre: "Por favor, ingrese su nombre.",
        fechaNacimiento: "Por favor, ingrese su fecha de nacimiento.",
        telefono: "Por favor, ingrese un teléfono válido.",
        email: "Por favor, ingrese un correo válido.",
        dni: "Por favor, ingrese su DNI.",
        residencia: "Por favor, ingrese su ciudad de residencia.",
        edad: "Por favor, ingrese su edad.",
        nivelEducativo: "Por favor, seleccione su nivel educativo.",
        area: "Por favor, seleccione al menos un área.",
        comentarios: "El comentario debe tener al menos 10 caracteres."
    };

    function showError(input, message) {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = message;
        input.classList.add("error");
    }

    function clearError(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = "";
        input.classList.remove("error");
    }

    function validateField(input, validatorFn) {
        if (!validatorFn(input.value)) {
            showError(input, errorMessages[input.id]);
        } else {
            clearError(input);
        }
    }

    function isAreaSelected() {
        return Array.from(areaCheckboxes).some(checkbox => checkbox.checked);
    }

    nombre.addEventListener("input", () => validateField(nombre, value => value.trim() !== ""));
    email.addEventListener("input", () => validateField(email, value => /\S+@\S+\.\S+/.test(value)));
    telefono.addEventListener("input", () => validateField(telefono, value => value.trim().length >= 7));
    comentarios.addEventListener("input", () => validateField(comentarios, value => value.trim().length >= 10));

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        
        validateField(nombre, value => value.trim() !== "");
        validateField(email, value => /\S+@\S+\.\S+/.test(value));
        validateField(telefono, value => value.trim().length >= 7);
        validateField(dni, value => value.trim() !== "");
        validateField(residencia, value => value.trim() !== "");
        validateField(edad, value => value > 0);
        if (!isAreaSelected()) {
            showError(areaCheckboxes[0], errorMessages.area);
        } else {
            clearError(areaCheckboxes[0]);
        }
        validateField(comentarios, value => value.trim().length >= 10);

        const erroresVisibles = document.querySelectorAll(".error-message:not(:empty)");
        if (erroresVisibles.length === 0) {
            form.submit();
        }
    });
});
