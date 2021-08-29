import { LightningElement } from 'lwc';
const defaultData = {
    Name:'',
    Email: '',
    Mobile:''
}

const BASE_URL = 'http://localhost:3002'
export default class App extends LightningElement {
    //local property
    formData = defaultData
    loader = false
    isSubmitted = false

    //getter

    get checkinMsg(){
        return  `Welcome, ${this.formData.Name}. You're checked`
    }

    // method on form change
    formchange(event){
        const {name, value} = event.detail
        this.formData = {...this.formData, [name]:value}
    }
    // method on submit
    checkInHandler(event){
        event.preventDefault()
        this.loader = true
        this.formData={...this.formData,
            "Date":new Date().toLocaleDateString(),
            "Time":new Date().toLocaleTimeString()
        }
        console.log(this.formData)
        fetch(`${BASE_URL}/api/v1/submit`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.formData)
        }).then(response=>response.json())
        .then(result=>{
            if(result.success){
                this.isSubmitted = true
                window.setTimeout(()=>{
                    this.isSubmitted = false
                    this.formData={...defaultData}
                }, 6000)
            }
        })
        .catch(error=>console.error(error))
        .finally(()=>{
            this.loader = false
        })
    }

    //on load hook
    // connectedCallback(){
    //     this.fetchData()
    // }
    // fetchData(){
    //     fetch(BASE_URL)
    //     .then(response=>response.json())
    //     .then(result=>console.log(result))
    //     .catch(error=>console.error(error))
    // }

}
