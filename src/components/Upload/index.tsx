import React from "react";
// import { showAlertConfirm } from "@T/common";
import { uploadImgsUrl, headerUrl } from "@/services/common";
import { ImagePicker, Toast } from "antd-mobile";
import { post } from "@/services/request";
import Loading from "@/components/Loading";
import "./index.module.scss";
import { getSignIn } from "@/services/common";
// import {ViewerFn}from "@C/ImageViewer";

const _3M = 1024 * 1024 * 100;
let uploadType = ["image/jpg", "image/png", "image/jpeg"];

interface Istate {
  files: Array<any>;
  length: number;
  isShow: boolean;
}

class Index extends React.Component<any> {
  static defaultProps = {
    length: 1,
    selectable: 1,
    accept: "image/*",
    imgSize: _3M,
    isShow: false,
    filesList: [],
    // templateUrl: "/aaa",
    onChange: (files?: any) => {}
  };
  state: Istate = {
    files: [],
    length: 0,
    isShow: false
  };

  files: any = null;

  componentDidMount() {
    this.props.getList && this.props.getList(this.getValue);
  }
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.files && nextProps.files !== prevState.files) {
      return {
        files: nextProps.files
      };
    }
  }
  uploadMore = (files: any, list: any) => {
    // let maxLength = files.length;
    let minLength = list.length;
    // let addLength = maxLength - minLength;
    let addFileList = files.slice(minLength);
    // console.log(addFileList,111111)
    // console.log(addFileList, 222, minLength);
    addFileList.forEach((item: any) => {
      this.onChange([item], "add");
    });
  };

  onChange = (files: any, operationType: any, index?: any) => {
    const { length } = this.state;
    const list = this.state.files;
    // 判断当前是否超过9张
    // let addList =
    const { onChange } = this.props;
    switch (operationType) {
      case "add":
        if (files.length > 9 || length >= 9 || files.length + length >= 9) {
          Toast.info("不能超过9张图片");
          return;
        }
        // if (files.length - list.length > 1) {
        //   this.uploadMore(files, list);
        //   return;
        // }
        this.setState({ length: length + files.length });
        // let file = files[files.length - 1];

        const result = this.validation(files);

        if (!result) {
          return;
        }

        this.setState({
          isShow: true
        });

        let formData = new FormData();
        console.log(files, "--------");
        const t: any = [];
        files.forEach((v: any) => {
          t.push(v.file);
        });
        // console.log(t)
        formData.append("fileList", t, "fileList");

        // console.log(file, "file")
        post(uploadImgsUrl, formData)
          .then((res: any) => {
            // const temp = this.state.files
            console.log(res);
            // console.log(temp,111111)
            // getSignIn({ path: res[0].url }).then((response: any) => {
            //   temp.push(
            //     {
            //       uri: response[0].url,
            //       name: file.file.name,
            //       id: new Date().getTime(),
            //     }
            //   )
            //   this.setState(
            //     {
            //       files: temp
            //     },
            //     () => {
            //       onChange(temp);
            //     }
            //   );
            // })
          })
          .catch((err: any) => {
            Toast.info("上传失败");
          })
          .finally(() => {
            this.setState({
              isShow: false
            });
          });
        break;
      case "remove":
        this.setState({ length: length - 1 });
        // showAlertConfirm({
        //   title: "确定删除吗？",
        //   okFn: () => {

        //   }
        // });
        this.files = this.state.files;
        this.files.splice(index, 1);
        this.setState(
          {
            files: this.files
          },
          () => {
            onChange(this.files);
          }
        );
        break;
      default:
        break;
    }
  };

  validation = (files: any) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!uploadType.includes(file.file.type)) {
        Toast.info("只允许上传jpg/jpeg/png图片格式", 3);
        return false;
      }
    }
    return true;
  };

  getValue = () => {
    return this.state.files;
  };

  render() {
    let { length, selectable, accept } = this.props;
    let { files } = this.state;
    let filesList = files.map(res => {
      // console.log(res)
      return { url: res.url, res };
    });
    // if (selectable === 1) {
    //   if (files.length === 0 && templateUrl) {
    //     filesList.push({
    //       url: headerUrl + templateUrl
    //     });
    //   }
    // }

    return (
      <React.Fragment>
        <span className={"uploodLists"}>
          <ImagePicker
            files={filesList}
            length={`${length}`}
            multiple={true}
            selectable={files.length < selectable}
            accept={accept}
            // onImageClick={()=>{
            //   ViewerFn(filesList.map(item=>item.url));
            // }}
            onChange={this.onChange}
          />
        </span>
        <Loading isShow={this.state.isShow} />
      </React.Fragment>
    );
  }
}

export default Index;
