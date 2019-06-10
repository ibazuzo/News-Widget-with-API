const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

var articlesPerPage = 5;


app.appendChild(container);


var request = new XMLHttpRequest();
request.open('GET', 'http://www.mocky.io/v2/58fda6ce0f0000c40908b8c8', true);
request.onload = function() {
	// accessing JSON
	var data = JSON.parse(this.response);

	// test for error response
	if (request.status >= 200 && request.status < 400) {

		var articlesTotalNumber = data.news.length;

		insertPagination(articlesTotalNumber);

		let pageNumber = 1;

		var timer = setInterval(function() {
			listNews(pageNumber > (articlesTotalNumber / articlesPerPage) ? pageNumber = 1 : pageNumber++, data);
		}, 2000);

		document.getElementById('page1').addEventListener('click', function() {
			listNews(1, data);
		});
		document.getElementById('page2').addEventListener('click', function() {
			listNews(2, data);
		});
		document.getElementById('page3').addEventListener('click', function() {
			listNews(3, data);
		});
		// cum pot face asta sa afiseze in functie de nr de pagini?

	} else {
		const errorMessage = document.createElement('p');
		errorMessage.setAttribute('class', 'error-msg');
		errorMessage.textContent = 'There was a problem with the connection';
	}

}

request.send();

function listNews(pageNumber, data) {
	const clearNewsList = (elms) => elms.forEach(el => el.remove());
	clearNewsList(document.querySelectorAll('.card'));

	// remove current-page class from previous buttons
	var els = document.getElementsByClassName('current-page');
	if(els[0]) removeClass(els, 'current-page');

	// add current-page class to current button
	document.getElementById('page'+ pageNumber).classList.add('current-page');

	for (let i = 0; i < articlesPerPage; i++) {
		console.log('i: ' + i, '| pageNumber: ' + pageNumber);
			var articleToGrab = (pageNumber - 1) * articlesPerPage + i;

			const card = document.createElement('div');
			card.setAttribute('class', 'card');

			const h2 = document.createElement('h2');
			h2.setAttribute('class', 'card-title');
			h2.textContent = data.news[articleToGrab].title;

			const p = document.createElement('p');
			p.setAttribute('class', 'card-description');
			data.news[articleToGrab].details = data.news[articleToGrab].details.substring(0, 100);
			p.textContent = data.news[articleToGrab].details;

			container.appendChild(card);
			card.appendChild(h2);
			card.appendChild(p);	
		}
}

function insertPagination(articlesTotalNumber) {

	var noOfPages = articlesTotalNumber / articlesPerPage;

	for (let i = 1; i <= noOfPages; i++) {

			const page = document.createElement('button');
			page.setAttribute('class', 'page-' + i);
			page.setAttribute('id', 'page' + i);
			page.textContent = 'Pagina' + i;
			container.appendChild(page);

		}

}

function removeClass(els, className) {

	els[0].classList.remove(className);
	if(els[0]) removeClass();

}