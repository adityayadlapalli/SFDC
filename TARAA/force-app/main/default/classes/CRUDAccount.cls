public class CRUDAccount {
    
    @AuraEnabled
    public static List<Account> getAccountList() {
        // Getting the list of contacts from where Id is in accountIds
 
        List<Account> AccountList = [select id , name, phone, industry, rating from account LIMIT 10];
        
        // Returning the Account list
        
        System.debug('value of Account list is :'+AccountList);
        
        return AccountList; 
    }
    @AuraEnabled
    public static void deleteAccount(List<String> recordToDelete)
    {
        system.debug('Account to delete is : '+recordToDelete);
        List<Account> AccountToDelete = [SELECT Id FROM Account WHERE Id in :recordToDelete];
        
        delete AccountToDelete;
        
        // return recordToDelete;
    }
    
    
    @AuraEnabled
    public static List<Contact> updateAccount(List<Contact> newValues)
    {
        system.debug('new values received are : '+newValues);
        update newValues;
        return newValues;
    }
    

}