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

  post() {
    var link = "mailto:" + this.state.recipient + "?subject=" + this.state.subject + "&body=" + this.state.emailBody;
   this.displayData.unshift(<div id="display-data"><pre>To:{this.state.recipient}</pre><pre>Description:{this.state.description}</pre><a href={link}>Send Email</a></div>);
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
             <textarea rows="1" cols="50" value={this.state.recipient} onChange={this.handleChangeRecipient} ></textarea>
             <textarea rows="1" cols="50" value={this.state.subject} onChange={this.handleChangeSubject} ></textarea>
             <textarea rows="3" cols="50" value={this.state.description} onChange={this.handleChangeDescription} ></textarea>
             <textarea rows="10" cols="50" value={this.state.emailBody} onChange={this.handleChangeEmailBody} ></textarea>
             <div >
             <input  type="submit" className="button" onClick={this.post}   value="Prepend"/>
             </div>
             <div id="display-data-Container">
             {this.displayData}
             </div>
          </div>
      );
  }
}


export default Form;
