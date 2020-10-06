public class AccountDetailsController {
   //Tseting code stash     
    @AuraEnabled
    public static List<account> getaccountDetails() {
     
                List<account> accountList1 = [SELECT Id, Name, Industry, Phone, Rating, Active__c FROM account LIMIT 5 ];
                       
                 
        System.debug('account list is :'+accountList1);
        
        return accountList1; 
    }
}
