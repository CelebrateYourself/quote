const PORT = window.PORT;
const API_URL = `http://localhost:${PORT}/api`;

const $author = document.querySelector('.author');
const $quote = document.querySelector('.quote-text');
const $button = document.querySelector('.reload');

const fetchData = () => {
  fetch(API_URL)
    .then(req => req.json())
    .then(data => {
      const { quoteAuthor, quoteText } = data
      $author.textContent = quoteAuthor || 'неизвестен';
      $quote.textContent = quoteText;
    })
}

$button.addEventListener('click', fetchData);
window.addEventListener('load', fetchData);