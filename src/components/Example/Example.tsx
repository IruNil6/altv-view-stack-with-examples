import React from "react";

import Path from "../../constants/enums/Path";
import ButtonProps from "../../constants/pages/interfaces/ButtonProps";
import ButtonType from "../../constants/pages/enums/ButtonType";
import EmitWebView from "../../constants/events/EmitWebView";
import EventManager from "../../EventManager";
import WebViewType from "../../constants/enums/WebViewType";
import Button from "../../constants/pages/Button";

import ExampleState from "./interfaces/ExampleState";

import './css/example.less';

class Example extends React.Component<any, ExampleState>{
  private testButtons: ButtonProps[];

  constructor(props: any) {
    super(props);

    this.state = {
      show: true,
      path: Path.Example,
      testText: "Some Text Here",
    }

    this.testButtons = [
      { text: "КАКОЙ-ТО ТЕКСТ", type: ButtonType.Main },
    ]
  }


  componentDidMount() {
    EventManager.AddHandler(EmitWebView.Example, (value: any) => {
      switch (value.type) {
        case WebViewType.Show:
          return this.setState({ show: true });
        case WebViewType.Hide:
          return this.setState({ show: false });
        case WebViewType.UpdateValues:
          return this.setState({ testText: "New Text after handler" });
      }
    });
  }

  componentWillUnmount() {
    EventManager.RemoveHandler(EmitWebView.Example);
  }

  private OnButtonClickEvent(event: any): void {
    const button = event.target as HTMLElement;

    console.log("Button Works");
    console.log(button);
  }

  render() {
    if (!this.state.show) return null;
    return (
      <React.Fragment>
        <section className="example">
          <div className="button-menu">
            {this.testButtons.map((value: ButtonProps, index: number) => {
              return (<Button text={value.text} type={value.type} onPress={this.OnButtonClickEvent.bind(this)} key={index} index={index} />)
            })}
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default Example;