import { LightningElement } from 'lwc';
const defaultData = {
    Name:'',
    Email: '',
    Mobile:''
}
export default class App extends LightningElement {
    //local property
    formData = defaultData

    // method on form change
    formchange(event){
        const {name, value} = event.detail
        this.formData = {...this.formData, [name]:value}
    }
    // method on submit
    checkInHandler(event){
        event.preventDefault()
        console.log(this.formData)
    }
}
