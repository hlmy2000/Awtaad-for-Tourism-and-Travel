const roomBtns = document.querySelectorAll('.select-room-btn');
const chosenRoomDisplay = document.getElementById('chosenRoomName');
const nightsSlider = document.getElementById('hotelNightsRange');
const nightsCountDisplay = document.getElementById('nightsCountValue');
const hotelTotalPriceDisplay = document.getElementById('hotelTotalPrice');

let activeRoomPrice = 350;

if (roomBtns.length > 0 && nightsSlider && hotelTotalPriceDisplay) {
    function calculateHotelTotal() {
        const nights = parseInt(nightsSlider.value, 10);
        if (nightsCountDisplay) nightsCountDisplay.innerText = nights;
        const totalPrice = nights * activeRoomPrice;
        hotelTotalPriceDisplay.innerText = `$${totalPrice.toLocaleString()}`;
    }

    roomBtns.forEach(btn => {
        const firstButton = roomBtns[0];
        if (firstButton && !firstButton.classList.contains('active-room')) {
            firstButton.classList.add('active-room');
        }

        btn.addEventListener('click', (e) => {
            roomBtns.forEach(b => b.classList.remove('active-room'));
            e.currentTarget.classList.add('active-room');

            const cardElement = e.currentTarget.closest('.hotel-card');
            const roomPrice = cardElement ? parseInt(cardElement.getAttribute('data-price'), 10) : 350;
            const roomName = e.currentTarget.getAttribute('data-name');

            activeRoomPrice = roomPrice;
            if (chosenRoomDisplay) chosenRoomDisplay.innerText = roomName;
            calculateHotelTotal();
        });
    });

    nightsSlider.addEventListener('input', calculateHotelTotal);
    calculateHotelTotal();
}
