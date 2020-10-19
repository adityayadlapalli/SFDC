public with sharing class AccountRecordsListController {
    @AuraEnabled
    public static List<Account> getAccountList() {
    // Getting the list of Accounts from where Id is in accountIds
    // 
    List<Account> AccountList = [SELECT Id, Name, Active__c, Phone, Industry FROM Account];
   
    // Returning the Account list
   
    System.debug('value of contact list is :'+AccountList);
   
    return AccountList; 
    }
}
