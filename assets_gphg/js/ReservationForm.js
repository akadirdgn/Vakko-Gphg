function startCountdown() {
    const timeText = document.getElementById("time");
    const progressCircle = document.querySelector(".circle-progress");
    const resendCodeBtn = $("#resendCodeBtn");

    const radius = 54;
    const circumference = 2 * Math.PI * radius;

    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `0`;

    let totalTime = 60;
    let remainingTime = totalTime;

    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }

    if (resendCodeBtn.length) {
        resendCodeBtn.prop('disabled', true);
    }

    window.countdownInterval = setInterval(() => {
        remainingTime--;

        const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
        const seconds = String(remainingTime % 60).padStart(2, "0");
        timeText.textContent = `${minutes}:${seconds}`;

        const offset = circumference * (1 - remainingTime / totalTime);
        progressCircle.style.strokeDashoffset = `${offset}`;

        if (remainingTime <= 0) {
            clearInterval(window.countdownInterval);
            timeText.textContent = "00:00";
            if (resendCodeBtn.length) {
                resendCodeBtn.prop('disabled', false);
            }
        }
    }, 1000);
}

$(document).ready(function () {
    
    debugger;
    // Gerekli DOM elementlerini seç
    const reservationForm = $("#registerForm"); // Formun ID'si "registerForm"
    const submitBtn = $("#submitBtn"); 

    const step1 = document.getElementById("reservation-scroll-point");
    const step2 = document.getElementById("step-2");
    const step3 = document.getElementById("step-3");
    const step4 = document.getElementById("step-4");
    const backButton = document.getElementById("back-to-info");
    
    const verificationCodeInput = $("#verificationCodeInput");
    const verifyCodeBtn = $("#verifyCodeBtn");
    const resendCodeBtn = $("#resendCodeBtn");

    function isVisible(elem) {
        if (!elem) return false;
        return window.getComputedStyle(elem).display !== "none";
    }
    
    reservationForm.on("submit", function (event) {
        if (!$(this).valid()) {
            console.log("Form validation failed.");
            event.preventDefault();
            return false;
        }

        console.log("Form is valid. Proceeding to Step 2.");

        if (isVisible(step1)) {
            step1.style.display = "none";
            step2.style.display = "block";
            step3.style.display = "none";
            step4.style.display = "none";
            step2.scrollIntoView({ behavior: "smooth" });

            if (submitBtn.length) submitBtn.prop('disabled', true);
            if (verifyCodeBtn.length) verifyCodeBtn.prop('disabled', true);
            if (verificationCodeInput.length) verificationCodeInput.val('');

            startCountdown();
        }

        event.preventDefault();
        return false;
    });

    if (verifyCodeBtn.length) {
        verifyCodeBtn.on("click", function (event) {
            const isValid = verificationCodeInput.valid();

            if (isValid && verificationCodeInput.val().length === 5) {
                console.log("Verification code valid. Proceeding to Step 3.");

                step1.style.display = "none";
                step2.style.display = "none";
                step3.style.display = "block";
                step4.style.display = "none";
                step3.scrollIntoView({ behavior: "smooth" });

                if (window.countdownInterval) {
                    clearInterval(window.countdownInterval);
                }

                if (submitBtn.length) submitBtn.prop('disabled', false);

                setTimeout(() => {
                    console.log("Moving to Step 4.");
                    step3.style.display = "none";
                    step4.style.display = "block";
                }, 3000);
            } else {
                console.log("Verification code invalid or incomplete.");
            }

            event.preventDefault();
        });
    }

    if (resendCodeBtn.length) {
        resendCodeBtn.on("click", function (event) {
            console.log("Resend code clicked.");
            startCountdown();
            if (verificationCodeInput.length) verificationCodeInput.val('');
            if (verifyCodeBtn.length) verifyCodeBtn.prop('disabled', true);
            event.preventDefault();
        });
    }

    if (verificationCodeInput.length && verifyCodeBtn.length) {
        verificationCodeInput.on("input", function () {
            verifyCodeBtn.prop('disabled', $(this).val().length !== 5);
        });
    }

    if (backButton) {
        backButton.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Back button clicked. Reloading.");
            location.reload();
        });
    }

    $("a[href='#']").on("click", function (event) {
        event.preventDefault();
    });

    step1.style.display = "block";
    step2.style.display = "none";
    step3.style.display = "none";
    step4.style.display = "none";

    if (verifyCodeBtn.length) verifyCodeBtn.prop('disabled', true);
    if (resendCodeBtn.length) resendCodeBtn.prop('disabled', true);
});


$('#monthSelect').on('change', function () {
    const selectedMonth = $(this).val();

    if (selectedMonth !== null && selectedMonth !== "0") {
        $('#eventDropdown').prop('disabled', false);
        $('#eventDropdown').find('option:gt(0)').remove(); // ilk seçenek kalýr

        $('#slotDropdown').prop('disabled', true).find('option:gt(0)').remove();
        $('#timeListContainer').prop('disabled', true).find('option:gt(0)').remove();

        $.ajax({
            url: '/Register/GetEventsByMonth',
            type: 'POST',
            data: { month: selectedMonth },
            success: function (response) {
                if (response.success) {
                    $.each(response.data, function (index, event) {
                        $('#eventDropdown').append('<option value="' + event.Id + '">' + event.Name + '</option>');
                    });
                } else {
                    alert('Etkinlikler yüklenirken bir hata oluþtu: ' + response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error('API çaðrýsý baþarýsýz oldu:', error);
                alert('Sunucuya baðlanýrken bir hata oluþtu.');
            }
        });
    } else {
        $('#eventDropdown').prop('disabled', true).find('option:gt(0)').remove();
        $('#slotDropdown').prop('disabled', true).find('option:gt(0)').remove();
        $('#timeListContainer').prop('disabled', true).find('option:gt(0)').remove();
    }
});


$('#eventDropdown').on('change', function () {
    const selectedEventId = $(this).val();

    if (selectedEventId) {
        const slotDropdown = $('#slotDropdown');
        slotDropdown.prop('disabled', false).find('option:gt(0)').remove();
        $('#timeListContainer').prop('disabled', true).find('option:gt(0)').remove();

        $.ajax({
            url: '/Register/GetSlotsByEventId',
            type: 'POST',
            data: { eventId: selectedEventId },
            success: function (response) {
                if (response.success) {
                    $.each(response.data, function (index, slotName) {
                        slotDropdown.append('<option value="' + slotName + '">' + slotName + '</option>');
                    });
                } else {
                    alert('Slotlar yüklenirken bir hata oluþtu: ' + response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error('API çaðrýsý baþarýsýz oldu:', error);
                alert('Sunucuya baðlanýrken bir hata oluþtu.');
            }
        });
    } else {
        $('#slotDropdown').prop('disabled', true).find('option:gt(0)').remove();
        $('#timeListContainer').prop('disabled', true).find('option:gt(0)').remove();
    }
});

$('#slotDropdown').on('change', function () {
    const selectedSlot = $(this).val();
    const selectedEventId = $('#eventDropdown').val();

    if (selectedSlot) {
        const timeListContainer = $('#timeListContainer');
        timeListContainer.prop('disabled', false).find('option:gt(0)').remove();

        $.ajax({
            url: '/Register/GetAvailableTimes',
            type: 'POST',
            data: { eventId: selectedEventId, slot: selectedSlot },
            success: function (response) {
                if (response.success) {
                    $.each(response.data, function (index, time) {
                        timeListContainer.append('<option value="' + time + '">' + time + '</option>');
                    });
                } else {
                    alert('Saatler yüklenirken bir hata oluþtu: ' + response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error('API çaðrýsý baþarýsýz oldu:', error);
                alert('Sunucuya baðlanýrken bir hata oluþtu.');
            }
        });
    } else {
        $('#timeListContainer').prop('disabled', true).find('option:gt(0)').remove();
    }
});

$(document).ready(function () {
    // "verifyCodeBtn" butonuna týklama olayý ekliyoruz
    $("#verifyCodeBtn").click(function (event) {
        // Formun normal submit iþlemini engelle
        event.preventDefault();
        debugger;
        // 1. Doðrulama kodunu alýyoruz
        var verificationCode = $("#verificationCodeInput").val();

        // 2. Ýlk formdaki tüm verileri alýyoruz
        var modelData = {
            FirstName: $('input[name="FirstName"]').val(),
            LastName: $('input[name="LastName"]').val(),
            Gsm: $('input[name="Gsm"]').val(),
            Email: $('input[name="Email"]').val(),
            Date: $('#monthSelect').val(), // HTML'deki ID'ye göre alýyoruz
            EventId: $('#eventDropdown').val(),
            Slot: $('#slotDropdown').val(),
            Time: $('#timeListContainer').val(),
            Consent: $('#consent').prop('checked'),
            AllowEmail: $('.channels input').eq(0).is(':checked'),
            AllowSms: $('.channels input').eq(1).is(':checked'),
            AllowCall: $('.channels input').eq(2).is(':checked'),
            AllowWhatsapp: $('.channels input').eq(3).is(':checked')
        };

        var postData = {
            code: verificationCode,
            model: modelData
        };

        $.ajax({
            url: "/Register/VerifyCode",
            type: "POST",
            data: JSON.stringify(postData), // JSON olarak gönder
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    $("#step-2").hide();
                    $("#step-3").show();
                } else {
                    alert(response.message);
                }
            },
            error: function (xhr, status, error) {
                alert("Bir hata oluþtu: " + error);
            }
        });
    });
});





