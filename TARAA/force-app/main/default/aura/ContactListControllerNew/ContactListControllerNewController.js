({
    doInit : function(component, event, helper) {
    var action = component.get("c.getContactList");
   
    /*action.setParams({
    contactIds: "0037F00000uhJVXQA2"
    });*/
   
   
    // Callback function to get the response
    action.setCallback(this, function(response) {
    // Getting the response state
    var state = response.getState();
    // Check if response state is success
    if(state === 'SUCCESS') {
    // Getting the list of contacts from response and storing in js variable
    var contactResultsReceived = response.getReturnValue();
    console.log('received contact details are :'+JSON.stringify(contactResultsReceived));
    // Set the list attribute in component with the value returned by function
    component.set("v.contactList",contactResultsReceived);
    }
    else {
    // Show an alert if the state is incomplete or error
    alert('Error in getting data');
    }
    });
   
   
    // Adding the action variable to the global action queue
    $A.enqueueAction(action);
    },
   
    //Select all contacts
    handleSelectAllContact: function(component, event, helper) {
    var getID = component.get("v.contactList");
    var checkvalue = component.find("selectAll").get("v.value"); 
    var checkContact = component.find("checkContact"); 
   
    if(checkvalue == true){
    for(var i=0; i<checkContact.length; i++){
    checkContact[i].set("v.value",true);
    }
    }
    else{ 
    for(var i=0; i<checkContact.length; i++){
    checkContact[i].set("v.value",false);
    }
    }
    },
   
    //Process the selected contacts
    handleSelectedContacts: function(component, event, helper) {
   
    console.log("in handle selected contacts");
   
    var action = component.get("c.deleteContact");
   
    var selectedContacts = [ ];
    var checkvalue = component.find("checkContact");
    console.log('check value : ' + checkvalue);
   
    if(!Array.isArray(checkvalue)){
    if (checkvalue.get("v.value") == true) {
    selectedContacts.push(checkvalue.get("v.text"));
    }
    }else{
    for (var i = 0; i < checkvalue.length; i++) {
    if (checkvalue[i].get("v.value") == true) {
    selectedContacts.push(checkvalue[i].get("v.text"));
    }
    }
    }
    console.log('selectedContacts-' + selectedContacts);
   
    action.setParams({
    recordToDelete: selectedContacts
    });
   
    $A.enqueueAction(action);
   
    }
   
   })
   