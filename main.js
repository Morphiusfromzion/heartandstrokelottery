// Multi-step form logic for payment.html

let currentStep = 1;
const steps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.step');

function showStep(step) {
    steps.forEach((el, idx) => {
        el.classList.toggle('active', idx === step - 1);
    });
    progressSteps.forEach((el, idx) => {
        el.classList.remove('active', 'completed');
        if (idx < step - 1) {
            el.classList.add('completed');
        } else if (idx === step - 1) {
            el.classList.add('active');
        }
    });
    currentStep = step;
}

window.nextStep = function() {
    const personalForm = document.getElementById('personal-form');
    if (currentStep === 1 && !personalForm.checkValidity()) {
        personalForm.reportValidity();
        return;
    }
    showStep(currentStep + 1);
};

window.prevStep = function() {
    showStep(currentStep - 1);
};

window.processPayment = function() {
    const paymentForm = document.getElementById('payment-form');
    if (!paymentForm.checkValidity()) {
        paymentForm.reportValidity();
        return;
    }
    showStep(3);
};

window.startOver = function() {
    document.getElementById('personal-form').reset();
    document.getElementById('payment-form').reset();
    showStep(1);
};

// Initialize first step on page load
document.addEventListener('DOMContentLoaded', () => {
    showStep(1);
});
