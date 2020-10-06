// Apex Controller for Contact List Lightning Component
public class ContactListController1 {
        
    @AuraEnabled
    public static List<Contact> getContactList() {
        // Getting the list of contacts from where Id is in accountIds
                List<Contact> contactList = [SELECT Id, Name, Email, Phone FROM Contact LIMIT 10];
                        // Returning the contact list
                 
        System.debug('value of contact list is :'+contactList);
        
        return contactList; 
    }
}