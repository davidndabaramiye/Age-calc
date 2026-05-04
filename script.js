const birthdateInput = document.getElementById('birthdate');
const ageForm = document.getElementById('ageForm');
const resultSection = document.getElementById('result');
const ageText = document.getElementById('ageText');
const messageText = document.getElementById('messageText');

function calculateAge(birthdate) {
  const now = new Date();
  const dob = new Date(birthdate);

  if (!(dob instanceof Date) || Number.isNaN(dob.getTime())) {
    return null;
  }

  if (dob > now) {
    return 'future';
  }

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

function getFunMessage(age) {
  if (age === 'future') {
    return 'Whoa! Time travel is not supported yet. Pick a birthday from the past.';
  }

  if (age.years === 0 && age.months === 0) {
    return 'A brand new star has arrived — enjoy every tiny day!';
  }

  if (age.years === 0) {
    return 'You are a little explorer in your first year of adventure.';
  }

  if (age.years < 10) {
    return 'You are young, curious, and full of wonder!';
  }

  if (age.years < 18) {
    return 'Teenage years: loud, fun, and full of possibility!';
  }

  if (age.years < 30) {
    return 'Prime time! Keep chasing dreams and collecting memories.';
  }

  if (age.years < 60) {
    return 'Age is just a number — you are shining bright!';
  }

  if (age.years < 100) {
    return 'Legend level unlocked! You have stories to tell.';
  }

  return 'Wow — you are a living legend with a lifetime of wisdom. ✨';
}

function formatAge(age) {
  const parts = [];
  if (age.years) {
    parts.push(`${age.years} year${age.years === 1 ? '' : 's'}`);
  }
  if (age.months) {
    parts.push(`${age.months} month${age.months === 1 ? '' : 's'}`);
  }
  if (age.days || parts.length === 0) {
    parts.push(`${age.days} day${age.days === 1 ? '' : 's'}`);
  }
  return parts.join(', ');
}

function showResult(age) {
  if (!age) {
    ageText.textContent = 'Oops! Please select a valid birthday before I can calculate your age.';
    messageText.textContent = 'Try again with a real date from the past.';
  } else if (age === 'future') {
    ageText.textContent = 'Future birthday detected!';
    messageText.textContent = getFunMessage(age);
  } else {
    ageText.textContent = `You are ${formatAge(age)} old.`;
    messageText.textContent = getFunMessage(age);
  }

  resultSection.classList.remove('hidden');
}

ageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const birthdate = birthdateInput.value;
  const age = calculateAge(birthdate);
  showResult(age);
});

birthdateInput.addEventListener('focus', () => {
  if (resultSection && !resultSection.classList.contains('hidden')) {
    resultSection.classList.add('hidden');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  birthdateInput.focus();
});
