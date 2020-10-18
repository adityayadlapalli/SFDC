({
    // Function called on initial page loading to get contact list from server
    getContactsList : function(component, event, helper) {
    // Helper function - fetchContacts called for interaction with server
    helper.fetchContacts(component, event, helper);
    }
   
   })