const header = document.getElementById('header-left');
const app = document.getElementById('widget-body');

const container = document.createElement('div');
container.setAttribute('class', 'container');

var itemsPerPage = 5;


app.appendChild(container);

// const refreshDataInterval = setInterval(getData, 1000 * 3 * 3);

var request = new XMLHttpRequest();
request.open('GET', 'https://www.mocky.io/v2/58fda6ce0f0000c40908b8c8', true);
request.onload = function() {
	// accessing JSON
	var data = JSON.parse(this.response);

	// test for error response
	if (request.status >= 200 && request.status < 400) {

		const news = data.news;
		var totalPages = Math.ceil(news.length / itemsPerPage);

		insertPagination(totalPages);

		let pageNumber = 1;

		const changePagesInterval = setInterval(function() {
			listContent(pageNumber > totalPages ? pageNumber = 1 : pageNumber++, news);
		}, 15000);


		document.getElementById('page1').addEventListener('click', function() {
			listContent(1, news);
		});
		document.getElementById('page2').addEventListener('click', function() {
			listContent(2, news);
		});
		document.getElementById('page3').addEventListener('click', function() {
			listContent(3, news);
		});

	} else { // list error
		const errorMessage = document.createElement('p');
		errorMessage.setAttribute('class', 'error-msg');
		errorMessage.textContent = 'There was a problem with the connection';
	}

}

request.send();


function listContent(pageNumber, news) {
	removeElements('.card');

	// remove current-page class from previous buttons
	var els = document.getElementsByClassName('current-page');
	if(els[0]) removeClass(els, 'current-page');

	// add current-page class to current button
	document.getElementById('page'+ pageNumber).classList.add('current-page');

	for (let i = 0; i < itemsPerPage; i++) {
			var articleToGrab = (pageNumber - 1) * itemsPerPage + i;

			const card = document.createElement('div');
			card.setAttribute('class', 'card');

			const h3 = document.createElement('h3');
			h3.setAttribute('class', 'card-title');
			h3.textContent = news[articleToGrab].title;

			const p = document.createElement('p');
			p.setAttribute('class', 'card-description');
			news[articleToGrab].details = news[articleToGrab].details.substring(0, 100);
			p.textContent = news[articleToGrab].details;

			container.appendChild(card);
			card.appendChild(h3);
			card.appendChild(p);	
		}
}

function insertPagination(totalPages) {

	removeElements('.page-btn');

	for (let i = 1; i <= totalPages; i++) {

			const page = document.createElement('button');
			page.setAttribute('class', 'page-btn page-' + i);
			page.setAttribute('id', 'page' + i);
			header.appendChild(page);

		}

}

function removeElements(className) {
	const clearNewsList = (elms) => elms.forEach(el => el.remove());
	clearNewsList(document.querySelectorAll(className));
}

function removeClass(els, className) {

	els[0].classList.remove(className);
	if(els[0]) removeClass();

}