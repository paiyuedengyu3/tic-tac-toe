import React from "react";
let obj = {'backgroundColor' : 'red', 'color': 'yellow'};

class RefP extends React.Component {
  constructor() {
    super();
  }
  handleKey = (field, e) => {
    if (e.keyCode === 13) {
      switch (field) {
        case "lastName":
          this.lastName.focus();
          break;
        case "age":
          this.age.focus();
          break;
        case "submitt":
          this.buttont.focus();
          break;
        default:
          this.firstName.focus();
          break;
      }
    }
  };
  handleButtonFocus = (e) => {
    console.log('buttonFocused');
    console.log(e.target);
    //e.target.setAttribute( 'style' , {backgroundColor: 'red', color: 'yellow'});
    // e.target.style.color =  'red';

    //this.buttont.style = obj;
    console.log(e.target.style.color);
    this.buttont.setAttribute( 'style' , "background-color=red"
    //, color: 'yellow'}
    );
  };
  handleButtonClick = () => {
   // this.buttont.style.color = 'red';
  }
  handleLastNameFocus = () => {
    this.lastName.style.backgroundColor = 'red';
  };
  render() {
    return (
      <div>
        <span>first name</span>
        <input
          type="text"
          ref={ele => (this.firstName = ele)}
          onKeyUp={e => {
            this.handleKey("lastName", e);
          }}
        />
        <span>last name</span>
        <input
          type="text"
          ref={ele => (this.lastName = ele)}
          onKeyUp={e => {
            this.handleKey("age", e);
          }}
          onFocus={this.handleLastNameFocus}
        />
        <span>age</span>
        <input
          type="text"
          ref={ele => (this.age = ele)}
          onKeyUp={e => {
            this.handleKey("submitt", e);
          }}
        />
        <input
          type="button"
          ref={ele => (this.buttont = ele)}
          value="submit"
          onClick={this.handleButtonClick}
          onKeyUp={e => {
            this.handleKey("done", e);
          }}
          onFocus={this.handleButtonFocus}
          
        />
      </div>
    );
  }
}
export default RefP;
//style={{'backgroundColor': 'red'}}