const recordMetadata = {
    Name: 'Name',
    Industry: 'Industry',
    Active__c: 'Active__c',
    Rating: 'Rating',
    Phone: 'Phone',
    SLA__c: 'SLA__c',
    
};

export default function fetchDataHelper({ amountOfRecords }) {
    return fetch('https://data-faker.herokuapp.com/collection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            amountOfRecords,
            recordMetadata,
        }),
    }).then(response => response.json());
}
