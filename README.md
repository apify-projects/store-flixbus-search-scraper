# Flixbus Search Scraper

The Flixbus Search Scraper is a tool that allows you to extract essential information from Flixbus search results. With this scraper, you can easily retrieve the following details:

- 🕒 Departure and arrival times
- 💵 Fare prices
- 🚏 Departure and arrival locations
- 📶 Available amenities

## How to Use

To utilize the Flixbus Search Scraper, you have two options:

1. Apify Client: You can use the [Apify Client](https://docs.apify.com/api/client/js/) to interact with the scraper programmatically.

2. API: Alternatively, you can leverage the [API](https://docs.apify.com/academy/api/run-actor-and-retrieve-data-via-api) to integrate the scraper into your own applications.

## Benefits of Using Flixbus Search Scraper

There are several advantages to using the Flixbus Search Scraper:

- 🚀 Access: Since Flixbus no longer provides public APIs without prior application and approval, this scraper allows you to retrieve the data you need without going through the complex approval process.

- ⚡️ Efficiency: By automating the data extraction process, the scraper saves you time and effort. You can obtain Flixbus search results quickly and seamlessly.

- 🛠 Flexibility: With the extracted Flixbus data, you can build powerful applications that combine multiple aggregators like Regiojet, enhancing your users' experience and providing comprehensive travel information.

## Input Schema

The input schema defines the parameters required to configure and customize the Flixbus Search Scraper. Here are the available input properties:

- `website` (string, default: "com"): The top-level domain for the website. Determines the language of the input and output data.

- `from` (string, default: "Berlin"): The departing city for the search.

- `to` (string, default: "Prague"): The arrival city for the search.

- `rideDate` (string): The date of the trip.

- `adult` (integer, default: 1): The number of adults traveling.

- `student` (integer, default: 0): The number of students traveling. Students are required to show a valid Student ID.

- `children_0_5` (integer, default: 0): The number of children aged 0-5 traveling.

- `children_6_17` (integer, default: 0): The number of children aged 6-17 traveling.

- `senior` (integer, default: 0): The number of seniors (older than 65 years old) traveling.

- `bike_slot` (integer, default: 0): The number of bike slots. Note that E-bikes and scooters are not allowed on buses.

- `proxyConfiguration` (object): Proxy configuration options for using Apify Proxy or your custom proxy.

Please ensure to provide the required properties: `website`, `from`, `to`, `rideDate`, and `proxyConfiguration`.
Also note that you need to provide at least one valid passenger or you will it will error out.

## Getting Started

To get started with the Flixbus Search Scraper, follow these steps:

1. Install the Apify Client or utilize the Apify API.

2. Configure the input parameters such as website domain, departure and arrival cities, travel dates, and the number of passengers.

3. Run the scraper and retrieve the extracted Flixbus search results.

4. Process the obtained data and incorporate it into your applications, websites, or services.

## Example

Here's a sample code snippet to demonstrate how to use the Flixbus Search Scraper with the Apify Client:

```javascript
// Import the Apify Client
import {ApifyClient} from 'apify-client';

// Define variables
const TOKEN = "YOUR_APIFY_TOKEN"
const ACTOR_NAME = "celnar.lukas/flixbus-search-scraper"

// Create a new client
const client = new ApifyClient({
  token: TOKEN
});

// Define your input parameters
const input = {
  website: 'com',
  from: 'Berlin',
  to: 'Prague',
  rideDate: '2023-06-19',
  adult: 1,
  student: 0,
  children_0_5: 0,
  children_6_17: 0,
  bike_slot: 0,
  senior: 0,
  proxyConfiguration: {
    useApifyProxy: true,
    apifyProxyCountry: "US" // Make sure to use proxies from a country where cookies policy acceptance isnt required
  },
};

// Starts an actor and waits for it to finish.
const { defaultDatasetId } = await client.actor(ACTOR_NAME).call(input);
// Fetches results from the actor's dataset.
const { items } = await client.dataset(defaultDatasetId).listItems();

// Console log output
console.log(items)
```