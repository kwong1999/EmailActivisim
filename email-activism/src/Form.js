import React from 'react';
import './style.css';


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

  componentDidMount(){
    /*fetch('http://caihackemailactivism.azurewebsites.net/templates?max=10')
    .then(response => {
      const data = response.json();
    })
    .then(data => alert(data));*/

    var data = '[{"TemplateId":1,"Recipient":"Recip1","SubjectLine":"subj1","Body":"yeehaw","Description":"desc1","Link":"something"},{"TemplateId":2,"Recipient":"elaine","SubjectLine":"wefbwf","Body":"yeehaw2","Description":"desc2","Link":"google.com"}]';
    
    var templates = JSON.parse(data);

    for(var i in templates){
      this.displayData.unshift(<div id="display-data"><pre>To:{templates[i].Recipient}</pre><pre>{templates[i].Description}</pre><a href={templates[i].Link}>Send Email</a></div>);
    }
    this.setState({
      showdata : this.displayData,
      description : ""
    });

  }

  post() {
    var link = "mailto:" + this.state.recipient + "?subject=" + this.state.subject + "&body=" + this.state.emailBody;
    this.displayData.unshift(<div id="display-data"><pre>To: {this.state.recipient}</pre><pre>{this.state.description}</pre><a href={link}>Send Email</a></div>);
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
      <div id="mainContainer">
      <textarea rows="1" cols="50" placeholder="Recipient" value={this.state.recipient} onChange={this.handleChangeRecipient} ></textarea>
      <textarea rows="1" cols="50" placeholder="Subject" value={this.state.subject} onChange={this.handleChangeSubject} ></textarea>
      <textarea rows="3" cols="50" placeholder="Description" value={this.state.description} onChange={this.handleChangeDescription} ></textarea>
      <textarea rows="10" cols="50" placeholder="Body" value={this.state.emailBody} onChange={this.handleChangeEmailBody} ></textarea>
      <div >
      <input  type="submit" className="button" onClick={this.post}   value="Post"/>
      </div>
      <div id="display-data-Container">
      {this.displayData}
      </div>
      </div>
    );
  }
}


export default Form;
