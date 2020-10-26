const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const spinner = document.getElementById('loader');

//Events
window.addEventListener('DOMContentLoaded', showQuote);
newQuoteBtn.addEventListener('click', showQuote);
twitterBtn.addEventListener('click', tweetQuote);

//Show spinner
function spinnerLoading(){
    spinner.hidden = false;
    quoteContainer.hidden = true;
}

//Remove spinner
function loadComplete(){
    if(!spinner.hidden){
        quoteContainer.hidden = false;
        spinner.hidden = true;
    }
}

async function getQuote(){
    spinnerLoading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data);
    return data;
}

async function showQuote(){
    try{
        const quote = await getQuote();

        quote.quoteAuthor === '' ? authorText.innerText = 'Unknown' : authorText.innerText = quote.quoteAuthor;

        quote.quoteText.length > 40 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');

        quoteText.innerText = quote.quoteText;

        loadComplete();
    }
    catch(error){
        // showQuote();
        console.log('Ups ... no quote', error);
    }
}

//Tweet quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}