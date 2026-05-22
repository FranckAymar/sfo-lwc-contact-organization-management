import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountClass.getAccounts'; 
import { MessageContext, publish } from 'lightning/messageService';
import Comrevo from '@salesforce/messageChannel/Comrevo__c';


export default class AccountChild2 extends LightningElement {

    @api searchTextChild2;

    columns = [
        {
            label: 'Id',
            fieldName: 'Id'
        },
        {
            label: 'Name',
            fieldName: 'Name'
        },
        {
            label: 'Actions',
            fieldName: 'Actions',
            type: 'button',
            typeAttributes: {
                label: 'View contacts',
                value: 'view_contacts'
            }
        }
    ]

    currentId;
    currentName;

    @wire(MessageContext) messageContext;


    handleRowAction(event){

        if(event.detail.action.value === 'view_contacts'){

            this.currentId = event.detail.row.Id;
            this.currentName = event.detail.row.Name;

            const payload = {accountId: this.currentId, accountName: this.currentName};

            publish(this.messageContext, Comrevo, payload)
        } 
    }

    @wire(getAccounts, { searchTextClass: '$searchTextChild2'}) accountRecords; 
}