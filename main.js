import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form event listener 
searchForm.addEventListener('submit', e => {
    // Get Search Term
    const searchTerm = searchInput.value
    // Get Sort 
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // Get Limit 
    const searchLimit = document.getElementById('limit').value;
    
    // Check Input 
    if(searchTerm === '') {
        //Show message
        showMessage('Please add a search term', 'alert-danger');
    }

    // Clear Input
    searchInput.value = '';

    //Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        // Loop throught posts
        let output = '<div class="card-columns">';
        results.forEach(post => {
            // Check for image 
            const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
            output += `
            <div class="card">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <a href="${post.url}" class="btn btn-primary">Read More</a>
                    <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                    <span class="badge badge-dark">Score: ${post.score}</span>
                </div>
            </div>`;
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });

    e.preventDefault();
});

//Show message 
function showMessage(message, className){
    // Create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add Text
    div.appendChild(document.createTextNode(message));
    // Get the parent container
    const searchContainer = document.getElementById('search-container');
    // Get search
    const search = document.getElementById('search');
    //Insert message
    searchContainer.insertBefore(div, search);

    //Time out alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// truncate text 

function truncateText(text, limit) {
    const shortened = text.indexOf('', limit);
    if(shortened == -1) return text;
    return text.substring(0, shortened);
}