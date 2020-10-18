public class ContactListControllerNew {

    @AuraEnabled
    public static List<Contact> getContactList() {
    // Getting the list of contacts from where Id is in accountIds
    // 
    List<Contact> contactList = [SELECT Id,Name, FirstName,LastName, Email, Phone FROM Contact LIMIT 5];
   
    // Returning the contact list
   
    System.debug('value of contact list is :'+contactList);
   
    return contactList; 
    }
   
    @AuraEnabled
    public static List<Contact> updateAccount(List<Contact> newValues)
    {
    system.debug('new values received are : '+newValues);
    update newValues;
    return newValues;
    }
   
    @AuraEnabled
    public static void deleteContact(List<String> recordToDelete)
    {
    system.debug('contact to delete is : '+recordToDelete);
    List<Contact> contactsToDelete = [SELECT Id FROM Contact WHERE Id in :recordToDelete];
   
    delete contactsToDelete;
   
    // return recordToDelete;
    }
   
   }

   