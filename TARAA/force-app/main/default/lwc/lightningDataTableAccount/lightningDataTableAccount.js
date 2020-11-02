import { LightningElement } from 'lwc';
import fetchDataHelper from '@salesforce/apex/AccountDetailsController.getaccountDetails';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry',},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Rating', fieldName: 'Rating' },
    { label: 'Active', fieldName: 'Active__c' },
    { label: 'SLA', fieldName: 'SLA__c' },
];

export default class LightningDataTableAccount extends LightningElement {

    data = [];
    columns = columns;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
        const data = await fetchDataHelper({ amountOfRecords: 100 });
        this.data = data;
    }
}