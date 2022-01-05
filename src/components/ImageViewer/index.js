import React from "react";
import ImageView from "react-mobile-imgview";
import { render, unmountComponentAtNode } from "react-dom";
import "react-mobile-imgview/dist/react-mobile-imgview.css";

class Singleton {
  constructor(component) {
    this.dom = null;
    this.component = component;
    this.instance = null;
  }
  show(option) {
    if (!this.dom) {
      this.dom = document.createElement("div");
      document.body.appendChild(this.dom);
    } else {
      this.dom.classList.remove("hide");
    }
    render(<this.component {...option} />, this.dom);
  }
  close() {
    this.dom.classList.add("hide");

    setTimeout(() => {
      unmountComponentAtNode(this.dom);
    }, 300);
  }
}

const SingleImgView = new Singleton(ImageView);
export default class ImageViewer extends React.Component {
  state = {
    showViewer: false
  };
  componentDidMount() {
    this.props.show && this.props.show(this.show);
  }
  render() {
    const { file = [], preViewAble = true } = this.props;
    let imagelist = file.map(item => {
      return item.startsWith("http") ? item : item;
    });
    return (
      <div>
        {!!this.state.showViewer && (
          <ImageView imagelist={imagelist} close={this.close.bind(this)} />
        )}
        {preViewAble && imagelist.length > 0 && (
          <div
            style={{
              width: 60,
              height: 60
              // margin:"5px 0"
            }}
          >
            <img
              src={imagelist[0]}
              style={{ width: "100%", height: "100%" }}
              onClick={() => this.show()}
              alt=""
            />
          </div>
        )}
      </div>
    );
  }
  show() {
    this.setState({ showViewer: true });
  }
  close() {
    this.setState({ showViewer: false });
  }
}

export const ViewerFn = (imagelist, current = 0) => {
  SingleImgView.show({
    imagelist,
    close: () => {
      SingleImgView.close();
    },
    current
  });
};
