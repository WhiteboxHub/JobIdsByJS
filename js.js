// const cheerio = require('cheerio');


// const html = `<div data-job-id="3926188026" class="display-flex job-card-container relative job-card-list job-card-container--clickable job-card-list--underline-title-on-hover jobs-search-results-list__list-item--active-v2 jobs-search-two-pane__job-card-container--viewport-tracking-0" aria-current="page" data-view-name="job-card">…</div>
// <div data-job-id="1234567890" class="display-flex job-card-container relative job-card-list job-card-container--clickable job-card-list--underline-title-on-hover jobs-search-results-list__list-item--active-v2 jobs-search-two-pane__job-card-container--viewport-tracking-0" aria-current="page" data-view-name="job-card">…</div>
// <div data-job-id="9876543210" class="display-flex job-card-container relative job-card-list job-card-container--clickable job-card-list--underline-title-on-hover jobs-search-results-list__list-item--active-v2 jobs-search-two-pane__job-card-container--viewport-tracking-0" aria-current="page" data-view-name="job-card">…</div>`;


// const $ = cheerio.load(html);


// const jobIds = [];
// $('[data-job-id]').each((index, element) => {
//     const jobId = $(element).attr('data-job-id');
//     jobIds.push(jobId);
// });

// console.log(jobIds); 
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchData() {
    try {
        const response = await axios.get('https://www.linkedin.com/jobs/search/?keywords=mlengineer');

        // Check if the request was successful
        if (response.status !== 200) {
            throw new Error('Failed to fetch HTML body');
        }

        const htmlBody = response.data;
        const $ = cheerio.load(htmlBody);

        // Select elements with the data-job-id attribute
        const jobElements = $('[data-job-id]');
        console.log(jobElements);

        // Extract job IDs from the selected elements
        const jobIds = jobElements.map((index, element) => $(element).attr('data-job-id')).get();

        console.log('Job IDs:', jobIds);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();



// async function extractDivsWithJobId(htmlBody) {
//     const $ = cheerio.load(htmlBody);
//     const divsWithJobId = $('[data-job-id]');
//     console.log(divsWithJobId);
//     return divsWithJobId.toArray(); // Convert Cheerio object to an array of DOM elements
// }

// // (async () => {
// //     const htmlBody = await fetchData();
// //     if (htmlBody) {
// //         const divs = await extractDivsWithJobId(htmlBody);
// //         console.log(divs); // Array of div elements with data-job-id attribute
// //     } else {
// //         console.log('Failed to fetch HTML body.');
// //     }
// // })();
