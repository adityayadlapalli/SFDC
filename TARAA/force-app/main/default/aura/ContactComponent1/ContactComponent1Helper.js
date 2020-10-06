({
    // Function to fetch data from server called in initial loading of page
        fecthContacts : function(component, event, helper) {
            console.log('I am in Helper');
        // Assign server method to action variable
        var action = component.get("c.getContactList");
        
            action.setParams({
          contactIds: "0033t0000355VSuAAM"
        });
            
           
        // Callback function to get the response
        action.setCallback(this, function(response) {
            console.log('I am in setCallBack');
            // Getting the response state
            var state = response.getState();
            // Check if response state is success
            if(state === 'SUCCESS') {
                // Getting the list of contacts from response and storing in js variable
                // getReturnValue will get the data from Apex class
                var contactResultsReceived = response.getReturnValue();
                console.log('Values received are :'+ JSON.stringify(contactResultsReceived));
                
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
        }    
})