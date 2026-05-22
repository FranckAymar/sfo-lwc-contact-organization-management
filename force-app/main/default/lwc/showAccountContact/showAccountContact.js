import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import Comrevo from '@salesforce/messageChannel/Comrevo__c';

export default class ShowAccountContact extends LightningElement {

  subscription=null;

    @wire (MessageContext) messageContext;
    accountId;
    accountName;

    connectedCallback()
    {
        this.handleSubscribe();
    }

    disconnectedCallback()
    {
        this.handleUnsubscribe();
    }

    handleSubscribe()
    {
        if(!this.subscription)
        {
            this.subscription=subscribe(this.messageContext, Comrevo ,
                (parameter)=> 
                {
                    this.accountId=parameter.accountId;
                    this.accountName=parameter.accountName;
                }
                );
        }

    }

    handleUnsubscribe()
    {
        unsubscribe(this.subscription);
        this.subscription=null;
    }
}