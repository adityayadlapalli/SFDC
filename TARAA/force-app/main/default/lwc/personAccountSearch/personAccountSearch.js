import { LightningElement, track } from 'lwc';
import getContactList from '@salesforce/apex/PersonAccountSearchController.retrivePersonAccounts';
//import getStatePicklist from '@salesforce/apex/contactSearchController.getStatePicklist';

const COLUMNS = [{

    label: 'First name',

    fieldName: 'FirstName',

    type: 'url',

    typeAttributes: {label: { fieldName: 'FirstName' }, target: '_blank'}

}, {

    label: 'Last name',

    fieldName: 'LastName',

    type: 'text'

}, {

    label: 'Address',

    fieldName: 'PersonMailingStreet',

    type: 'text',

}, {

    label: 'State',

    fieldName: 'PersonMailingState',

    type: 'text',

}, {

    label: 'Zipcode',

    fieldName: 'PersonMailingPostalCode',

    type: 'text',

}, {

    label: 'AARP Member ID',

    fieldName: 'Membership_number__pc',

    type: 'text',

}, {

    label: 'DOB',

    fieldName: 'PersonBirthdate',

    type: 'Date',

}];
export default class personAccountSearch extends LightningElement {
    @track itemsperpage = 1;
    @track pagenumber = 0;
    @track allData;
    @track disablePrevious = false;
    @track disableNext = false;

    @track firstName;
    @track lastName
    @track phoneNumber;
    @track state;
    @track uhcMemberNumber;
    @track zipCode;
    @track errorMsg;
    @track columns = COLUMNS;
    @track contactList;
    //@track statePicklistOptions;
    @track birthDate;
    @track filterObject={};
    @track isRendered=false;
    @track searchCombinations = {1:[{"label":"UHC Member #","name":"uhcMemberNumber"}],
        2:[{"label":"Phone #","name":"phoneNumber"}],
        3:[{"label":"First Name","name":"firstName"},{"label":"Last Name","name":"lastName"},{"label":"State","name":"state"}],
        4:[{"label":"First Name","name":"firstName"},{"label":"Last Name","name":"lastName"},{"label":"Zip Code","name":"zipCode"}],
        5:[{"label":"First Name","name":"firstName"},{"label":"Last Name","name":"lastName"},{"label":"Date of birth","name":"birthDate"}],
        6:[{"label":"Last Name","name":"lastName"},{"label":"Date of birth","name":"birthDate"}]
    };

    get statePicklistOptions() {
        return [
        { label: 'New York', value: 'New York' },
        { label: 'Alabama', value: 'Alabama' },
        { label: 'Arizona', value: 'Arizona' },
        { label: 'New Jersey', value: 'New Jersey' },
        { label: 'New Mexico', value: 'New Mexico' },
        { label: 'Texas', value: 'Texas' },
        ];
    }

    connectedCallback() {
        this.isRendered = true;
        /*getStatePicklist().then(result => {
            
            this.statePicklistOptions = result;
            
            this.isRendered = true;
        })
        .catch(error => {
            this.isRendered = true;
            if(error) {
                this.contactList = [];
                this.errorMsg = error.body.message;
            }
        }) */
    }

    handleChange(event) {
        let searchFieldName = event.target.name;
        let searchFieldValue = event.target.value;
        if(searchFieldName === 'firstName') {
            this.filterObject.firstName = searchFieldValue;
        } else if(searchFieldName === 'lastName') {
            this.filterObject.lastName = searchFieldValue;
        } else if(searchFieldName === 'phoneNumber') {
            this.filterObject.phoneNumber = searchFieldValue;
        } else if(searchFieldName === 'state') {
            this.filterObject.state = searchFieldValue;
        } else if(searchFieldName === 'uhcMemberNumber') {
            this.filterObject.uhcMemberNumber = searchFieldValue;
        } else if(searchFieldName === 'zipCode') {
            this.filterObject.zipCode = searchFieldValue;
        } else if(searchFieldName === 'birthDate') {
            this.filterObject.birthDate = searchFieldValue;
        }
    }

    handleReset() {
        this.filterObject = {};
    }

    handleSearch(event) {
        this.errorMsg = null;
        let hasValues = false;
        //var allfieldsMap = {'firstName':true,'lastName':true,'phoneNumber','state','uhcMemberNumber','zipCode','birthDate'};
        for(let cobminationKey in this.searchCombinations){
            let validCombination = 0;
            for(let combination of this.searchCombinations[cobminationKey]){
                //alert(combination.name+' == '+combination.label);
                if(this.filterObject[combination.name]) {
                    validCombination++;
                }            
            }

            if (validCombination === this.searchCombinations[cobminationKey].length) {
                hasValues = true;
                break;
            }           
        }

        if(hasValues){
            getContactList({ 'firstName' : this.filterObject.firstName, 'lastName': this.filterObject.lastName, 'phoneNumber': this.filterObject.phoneNumber, 'state': this.filterObject.state, 'uhcMemberNumber': this.filterObject.uhcMemberNumber, 'zipCode': this.filterObject.zipCode, 'dob': this.filterObject.birthDate })
            .then(result => {
                this.allData = result;
                this.pagenumber--; // on load set one position back so that first page data will be loaded
                this.handleNext();
                this.errorMsg = undefined;
            })
            .catch(error => {
                if(error) {
                    this.contactList = [];
                    this.errorMsg = error;
                }
            }) 
        }
        else {
            this.errorMsg = "Valid search combinarion are as below";
            for (let cobminationKey in this.searchCombinations) {
                this.errorMsg = this.errorMsg + "\r\n" + cobminationKey + ") ";
                for (let combination of this.searchCombinations[cobminationKey]) {
                    this.errorMsg = this.errorMsg + combination.label + ",";
                }
                let lastChar = this.errorMsg.slice(-1);
                if (lastChar == ',') {
                    this.errorMsg = this.errorMsg.slice(0, -1);
                }
            }

        }
    }
    handlePrevious() {
        if (this.pagenumber !== 0) {
            this.pagenumber--;
            let startIndex = this.pagenumber * this.itemsperpage;
            let lastIndex = startIndex + this.itemsperpage;
            this.contactList = this.allData.slice(startIndex, lastIndex);
        }
    }

    handleNext() {
        if (
            ( (this.pagenumber * this.itemsperpage) + this.itemsperpage) <
            this.allData.length
            ) 
        {
            this.pagenumber++;
            let startIndex = this.pagenumber * this.itemsperpage;
            let lastIndex = startIndex + this.itemsperpage;
            this.contactList = this.allData.slice(startIndex, lastIndex);
        }
    }
}