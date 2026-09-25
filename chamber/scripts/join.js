document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const modalButtons = document.querySelectorAll(".modal-button");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach((button) => {
    button.addEventListener("click" , () => {
        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click" , () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});

const timestampField = document.getElementById("timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}