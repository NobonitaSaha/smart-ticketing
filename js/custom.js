document.addEventListener("DOMContentLoaded", function() {
    const selectedSeatsContainer = document.getElementById("selected-seat");
    const selectedClassContainer = document.getElementById("selected-class");
    const selectedTotalContainer = document.getElementById("selected-total");
    const seatForm = document.getElementById("seat-form");
    const personNameSpan = document.getElementById("person-name");
    const seatClassSelect = document.getElementById("seat-class");
    const totalPrice = document.getElementById("total-price");
    const grandTotalPrice = document.getElementById("grand-price");
    const couponInput = document.getElementById("coupon-input");
    const applyBtn = document.getElementById("apply-btn");
    const couponApplyDiv = document.querySelector(".cupon-apply");
    const remainingSeatsSpan = document.getElementById("remaining-seats");

    let selectedCount = 0;
    let totalPriceValue = 0;
    let couponApplied = false;

    function updateTotalPrice() {
        totalPrice.textContent = ` BDT ${totalPriceValue}`;
    }

    function updateGrandTotalPrice() {
        grandTotalPrice.textContent = ` BDT ${totalPriceValue}`;
    }

    // Handle Applying Coupon
    applyBtn.addEventListener("click", function() {
        const couponCode = couponInput.value.trim();
        let discountPercentage = 0;

        if (couponCode.toUpperCase() === "NEW15" || couponCode === "Couple 20") {
            if (couponCode === "Couple 20") {
                discountPercentage = 20;
            } else if (couponCode.toUpperCase() === "NEW15") {
                discountPercentage = 15;
            }

            if (!couponApplied) {
                const discountAmount = (totalPriceValue * discountPercentage) / 100;
                totalPriceValue -= discountAmount;
                updateTotalPrice();
                updateGrandTotalPrice();
                couponApplied = true;
                applyBtn.disabled = true; 
                couponInput.style.display = "none"; 
                couponApplyDiv.style.display = "none"; 
            }
        } else {
            alert("Invalid coupon code. Please enter a valid coupon code.");
        }
    });
    function updateRemainingSeats() {
        const remainingSeats = 40 - selectedCount;
        remainingSeatsSpan.textContent = remainingSeats;
    }

    function selectSeat(event) {
        const seat = event.target;
        if (!seat.classList.contains("selected")) {
            if (selectedCount < 4) {
                seat.classList.add("selected");
                const seatNumber = seat.textContent;
                const seatClass = seatClassSelect.getAttribute('data-value');
                const seatPrice = 550;

                const seatDiv = document.createElement("div");
                seatDiv.textContent = seatNumber;
                selectedSeatsContainer.appendChild(seatDiv);

                const classDiv = document.createElement("div");
                classDiv.textContent = seatClass;
                selectedClassContainer.appendChild(classDiv);

                const totalDiv = document.createElement("div");
                totalDiv.textContent = `${seatPrice}`;
                selectedTotalContainer.appendChild(totalDiv);

                selectedCount++;
                totalPriceValue += seatPrice;
                updateTotalPrice();
                updateGrandTotalPrice();
            } else {
                alert("You can only select a maximum of 4 seats.");
            }
        } else {
            seat.classList.remove("selected");
            const seatPrice = 550;
            const seatIndex = Array.from(seat.parentNode.children).indexOf(seat);

            selectedCount--;
            totalPriceValue -= seatPrice;
            updateTotalPrice();
            updateGrandTotalPrice();
        }
        updateRemainingSeats(); // Update remaining seats count
    }

    const staticSeats = document.querySelectorAll("#available-seats .seat");
    staticSeats.forEach(seat => {
        seat.addEventListener("click", selectSeat);
    });

    updateRemainingSeats(); // Initialize remaining seats count
});