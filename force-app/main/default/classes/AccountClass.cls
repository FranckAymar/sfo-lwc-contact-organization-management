public with sharing class AccountClass {
   
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchTextClass){
        try {

            if(!String.isEmpty(searchTextClass)){
                String searchText = '%' + searchTextClass + '%';
                return [ select Id, Name from Account where Name like :searchText];

            }
            
            return [ select Id, Name from Account];


        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Contact> getAccountContacts(String accountId){
        try {
            return [SELECT Id, Name FROM Contact WHERE accountId= :accountId];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}