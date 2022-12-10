const other_amount = document.querySelector('.donate-form__other-amount input');
const points = document.querySelectorAll('input[name="amount"]');

document.querySelector('input[name="amount"][value="100"]').checked = true;
other_amount.value = 100;

document
  .querySelector('.donate-range__inputs')
  .addEventListener('click', function (e) {
    if (e.target.tagName === 'INPUT') {
      other_amount.value = e.target.value;
    }
  });

other_amount.addEventListener('input', function (e) {
  if (e.target.value) {
    if (
      document.querySelector(`input[name="amount"][value="${e.target.value}"]`)
    ) {
      document.querySelector(
        `input[name="amount"][value="${e.target.value}"]`,
      ).checked = true;
    } else {
      for (var i = 0; i < points.length; i++) points[i].checked = false;
    }
  }
});
