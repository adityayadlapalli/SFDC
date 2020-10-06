trigger CountContactOnAccount on Contact (after INSERT, after UPDATE, after DELETE ) {
Set <Id> accountIds = new Set <Id>();
List <Account> lstAccountsToUpdate = new List <Account>();
 if(Trigger.isInsert){
    for(Contact con:trigger.new){
        accountIds.add(con.accountID);
    }
}
if(Trigger.isUpdate|| Trigger.isDelete){
    for(Contact con:trigger.old){
        accountIds.add(con.accountID);
    }
}

for(Account acc:[SELECT Id,Name,Number_of_Contacts__c,(select Id from Contacts) from Account where Id IN: accountIds]){
    Account accObj = new Account ();
    accObj.Id = acc.Id;
    accObj.Number_of_Contacts__c= acc.Contacts.size();
    lstAccountsToUpdate.add(accObj);
}

UPDATE lstAccountsToUpdate;
}