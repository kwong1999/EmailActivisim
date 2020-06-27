import React from 'react';
import './style.css';


class Form extends React.Component {

    constructor() {
      super();

      this.displayData = [];

      this.state = {
        showdata : this.displayData,
        postVal : ""
      }

      this.prependData = this.prependData.bind(this);
      this.handleChange = this.handleChange.bind(this);

    };

  prependData() {
   this.displayData.unshift(<div id="display-data"><pre>{this.state.postVal}</pre><a href="mailto:email@example.com?subject=testsubject">Send Email</a></div>);
   this.setState({
      showdata : this.displayData,
      postVal : ""
   });
 }

 handleChange(e) {
      let getTextAreaValue = e.target.value;
      this.setState({
        postVal :getTextAreaValue
      });
}

  render() {
    return (
          <div id="mainContainer">
             <textarea rows="4" cols="50" value={this.state.postVal} onChange={this.handleChange} ></textarea>
             <div >
             <input  type="submit" className="button" onClick={this.prependData}   value="Prepend"/>
             </div>
             <div id="display-data-Container">
             {this.displayData}
             </div>
          </div>
      );
  }
}


export default Form;
