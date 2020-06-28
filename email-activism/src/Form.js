import React from 'react';
import './style.css';

const API = 'http://caihackemailactivism.azurewebsites.net';

class Form extends React.Component {

  constructor() {
    super();

    this.displayData = [];
   
    this.state = {
      showdata : this.displayData,
      recipient : "",
      subject: "",
      emailBody: "",
      description: ""

    }  


    this.post = this.post.bind(this);
    this.handleChangeRecipient = this.handleChangeRecipient.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChangeEmailBody = this.handleChangeEmailBody.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);

  };

  async componentDidMount(){
    let response = await fetch(API + '/templates?max=10');
    let templates = await response.json();
    console.log(templates);

    //var data = '[{"TemplateId":1,"Recipient":"Recip1","SubjectLine":"subj1","Body":"yeehaw","Description":"desc1","Link":"something"},{"TemplateId":2,"Recipient":"elaine","SubjectLine":"wefbwf","Body":"yeehaw2","Description":"desc2","Link":"google.com"}]';
    //var templates = JSON.parse(data);

    for(var i in templates){
      this.displayData.unshift(<div id="display-data"><pre>To:<b>{templates[i].Recipient}</b></pre><pre>{templates[i].Description}</pre><a href={templates[i].Link}><button className="sendEmail">Send Email</button></a></div>);
    }
    this.setState({
      showdata : this.displayData,
      description : ""
    });

  }

  async post() {
    var link = "mailto:" + this.state.recipient + "?subject=" + this.state.subject + "&body=" + this.state.emailBody;

    let response = await fetch(API + '/template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        recipient: this.state.recipient,
        subjectLine: this.state.subject,
        body: this.state.emailBody,
        description: this.state.description,
        link: link
      })
    });

    alert(response.status);

    this.displayData.unshift(<div id="display-data"><pre>To: <b>{this.state.recipient}</b> </pre><pre>{this.state.description}</pre><a href={link}>Send Email</a></div>);
    this.setState({
      showdata : this.displayData,
      description : ""
    });
  }

  handleChangeRecipient(e) {
    let getTextAreaValue = e.target.value;
    this.setState({
      recipient :getTextAreaValue
    });
  }
  handleChangeSubject(e) {
    let getTextAreaValue = e.target.value;
    this.setState({
      subject :getTextAreaValue
    });
  }
  handleChangeEmailBody(e) {
    let getTextAreaValue = e.target.value;
    this.setState({
      emailBody :getTextAreaValue
    });
  }
  handleChangeDescription(e) {
    let getTextAreaValue = e.target.value;
    this.setState({
      description :getTextAreaValue
    });
  }

  render() {
    return (
      <div>
        <header className="header" style={{textAlign: 'center'}}> <div style={{height: '50px'}}></div><span style={{fontSize: 50}}>Make Your Voice Heard</span><div style={{height: '50px'}}></div></header>
      <div id="mainContainer" style={{textAlign: 'center'}}>
      <textarea rows="1" cols="100" placeholder="Recipient" value={this.state.recipient} onChange={this.handleChangeRecipient} ></textarea>
      <textarea rows="1" cols="100" placeholder="Subject" value={this.state.subject} onChange={this.handleChangeSubject} ></textarea>
      <textarea rows="3" cols="100" placeholder="Description" value={this.state.description} onChange={this.handleChangeDescription} ></textarea>
      <textarea rows="10" cols="100" placeholder="Body" value={this.state.emailBody} onChange={this.handleChangeEmailBody} ></textarea>
      <div>
      <input  type="submit" className="button" onClick={this.post} value="Post"/>
      </div>
      <div id="display-data-Container">
      {this.displayData}
      </div>
      </div>
      </div>
    );
  }
}


export default Form;
