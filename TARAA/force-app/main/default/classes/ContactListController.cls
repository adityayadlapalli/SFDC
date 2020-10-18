// Apex Controller for Contact List Lightning Component
public class ContactListController {

    @AuraEnabled
    public static List<Contact> getContactList() {
    // Getting the list of contacts from where Id is in accountIds
    List<Contact> contactList = [SELECT Id, Name, Email, Phone FROM Contact where ID in ('0037F00000RYACMQA5', '0037F00000RYACNQA5', '0037F00000RYACPQA5')];
    // Returning the contact list
   
    System.debug('value of contact list is :'+contactList);
   
    return contactList; 
    }
   }
   
   