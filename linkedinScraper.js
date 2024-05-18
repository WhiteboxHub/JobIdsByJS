
const axios = require('axios');
const cheerio = require('cheerio');
const { scheduleJob } = require('node-schedule');

function createLinkedInScraper(keyword) {
    const jobIdsSet = new Set(); 

    async function scrapeJobs() {
        const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}`;
        try {

            const response = await axios.get(url);
     
            const $ = cheerio.load(response.data); 
        
            const jobIds = [];
        
            $('div[data-job-id]').each((index, element) => {
                const jobId = $(element).attr('data-job-id');
                jobIds.push(jobId);
            });
        
            console.log(jobIds);
        
            return jobIds;
        } catch (error) {
            throw error; 
        }
    }

    function startScheduler() {
        scheduleJob('* * * * *', async () => {
            try {
                const jobIds = await scrapeJobs();
                console.log('Map:', jobIds);
            } catch (error) {
                console.error('Error in scheduled job:', error);
            }
        });

        scrapeJobs()
            .then(jobIds => console.log('Initial job IDs:', jobIds))
            .catch(error => console.error('Error in initial scrape:', error));
    }

    return {
        startScheduler,
    };
}

const linkedInScraper = createLinkedInScraper('ml%20engineer');
linkedInScraper.startScheduler();
