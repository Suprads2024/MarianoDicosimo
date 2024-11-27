// Selección de elementos
const openPopup = document.getElementById('openPopup');
const closePopup = document.getElementById('closePopup');
const popup = document.getElementById('popup');

// Evento para abrir el popup
openPopup.addEventListener('click', () => {
    popup.style.display = 'flex';
});

// Evento para cerrar el popup
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Cerrar el popup si se hace clic fuera del contenido
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});
// Selección del nuevo enlace en el footer
const openPopupFooter = document.getElementById('openPopupFooter');

// Evento para abrir el popup desde el footer
openPopupFooter.addEventListener('click', () => {
    popup.style.display = 'flex';
});