public with sharing class contactSearchController {
	@AuraEnabled
    public static list<Contact> retriveContacts(String firstName, String lastName, String phoneNumber, String state, String uhcMemberNumber, String zipCode) {
        String filter = '';
        system.debug('phoneNumber==' + phoneNumber);
        if(String.isNotBlank(firstName)) {
            filter += ' AND firstName LIKE \'%'+ firstName + '%\'';
        } 
        if(String.isNotBlank(lastName)) {
            filter += ' AND LastName LIKE \'%'+ lastName + '%\'';
        }
        if(String.isNotBlank(phoneNumber)) {
            filter += ' AND Phone LIKE \'%'+ phoneNumber + '%\'';
        }
        if(String.isNotBlank(state)) {
            filter += ' AND MailingState LIKE \'%'+ state + '%\'';
        }
        if(String.isNotBlank(zipCode)) {
            filter += ' AND MailingPostalCode LIKE \'%'+ zipCode + '%\'';
        }
        if(String.isNotBlank(uhcMemberNumber)) {
            filter += ' AND UHC_Member_Number__c LIKE \'%'+ uhcMemberNumber + '%\'';
        }
        system.debug('filter==' + filter);
        if(String.isNotBlank(filter) && filter.startsWith(' AND')) {
            filter = filter.removeStart(' AND');
        }
        String query = 'SELECT Id, FirstName, LastName, MailingStreet, MailingState, MailingPostalCode FROM personAccount WHERE ' + filter;
        system.debug('query==' + query);
        list<Contact> lstContacts = Database.query(query);

        /*if(lstContacts.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }*/
        return lstContacts; 
    }
}