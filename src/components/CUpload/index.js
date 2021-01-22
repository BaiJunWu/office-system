import React, { Fragment, Component } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import style from './index.less';

class CUpload extends Component {
  static defaultProps = {
    picCount: 1,
    multiple: false,
  };
  state = {
    loading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      if (typeof this.props.value === 'string' && this.props.value !== '') {
        this.handleFileList_Change(this.props);
      }
    }
  }
  // 下载
  handleFileList_Change = (props) => {
    let fileList = [];
    const { value, downFile } = props;
    if (Array.isArray(value)) {
      fileList = value.map((item, index) => ({
        uid: `-${String(index)}`,
        status: 'done',
        url: `${downFile}/${item.attachmentPath}`,
        name: `${item.attachmentName}`,
      }));
    } else {
      fileList = [
        {
          uid: '-1',
          status: 'done',
          url: `${downFile}/${value}`,
        },
      ];
    }
    this.setState({ fileList });
  };
  handleChange = ({ fileList }) => {
    fileList.filter((item) => {
      let status = item.status;
      if (status === 'done') {
        if (item.response && item.response.code === 0) {
          const {
            response: { destinationFileName },
          } = item.response;
          let url = this.props.downFile + '/' + destinationFileName;
          item.url = url;
          item.thumbUrl = url;
          return true;
        } else {
          message.error(`${item.name}上传失败！`);
          return false;
        }
      }
    });
    this.setState(
      {
        fileList: [...fileList],
      },
      () => {
        this.props.onChange && this.props.onChange(this.state.fileList);
      },
    );
  };
  beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif';
    if (!isJpgOrPng) {
      message.error('很抱歉，您只能上传JPG、PNG、GIF格式的图片!');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('很抱歉，您只能上传小于5M的图片!');
      return false;
    }
    return isJpgOrPng && isLt5M;
  };
  handlePreview = async (file) => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });
  render() {
    const { uploadFile, picCount, multiple } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className={style.uploadText}>上传</div>
      </div>
    );
    return (
      <Fragment>
        <Upload
          name="file"
          multiple={multiple} // 是否支持多选
          action={uploadFile} // 上传地址
          listType="picture-card" // 上传列表的内建样式
          fileList={fileList} // 上传的文件列表
          onPreview={this.handlePreview} // 点击预览回调
          beforeUpload={this.beforeUpload} // 上传文件之前的钩子
          onChange={this.handleChange} // 上传文件改变时的状态
        >
          {fileList.length >= picCount ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Fragment>
    );
  }
}

export default CUpload;
