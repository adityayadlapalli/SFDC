public class AccountDetailsController {
   //Testing1 code1 stash     
        //Stash1 check1
   //Testing2 code2 stash     
        //Stash2 check2
    @AuraEnabled
    public static List<account> getaccountDetails() {
     
                List<account> accountList1 = [SELECT Id, Name, Industry, Phone, Rating, Active__c FROM account LIMIT 5 ];
                       
                 
        System.debug('account list is :'+accountList1);
        
        return accountList1; 
    }
}
