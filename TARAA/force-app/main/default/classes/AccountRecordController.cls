public class AccountRecordController {
	@AuraEnabled
    public static List<Account> getAccList () {
        List<account> LstAccount = [select id , name, phone, industry, rating from account LIMIT 10];
        System.debug(' Account records are :'+LstAccount);
        return LstAccount;
    }
}