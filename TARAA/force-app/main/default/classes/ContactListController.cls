public class ContactListController {
        
    @AuraEnabled
    public static List<Contact> getContactList(string contactIds) {
        // Getting the list of contacts from where Id is in accountIds
                List<Contact> contactList = [SELECT Id, Name, Email, Phone FROM Contact where id =:contactIds];
                        // Returning the contact list
                 
        System.debug('value of contact list is :'+contactList);
        
        return contactList; 
    }
}