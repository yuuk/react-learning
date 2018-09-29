import React, { Component } from "react";
import FileUpload from 'rc-upload';
import { Icon, Button } from 'antd';
import styles from "../css/index.less";

const kb2mb = (kb) => {
	return parseInt(kb / 1024 / 1000);
}

const mb2kb = (mb) => {
	return parseInt(1024 * 1000 * mb);
}

class Upload extends Component {
  
  static defaultProps = {
		maxSize: mb2kb(2), // 文件上限大小
		maxFile: 2, // 最大上传个数
	}

	state = {
    uploading: false,
    fileList: [],
  };

	beforeUpload = (file) => {
		const { maxSize } = this.props;
		const { size } = file;
		if (size > maxSize) {
			window.console.error(`文件大小不能大于${kb2mb(maxSize)}M`);
			return false;
		}
	}

	onStart = (file) => {
		this.setState({ uploading: true });
	}

	onProgress = (step, file) => {
		// console.log('onProgress', step, file);
	}

	onSuccess = (file) => {
		const { fileList } = this.state;
		fileList.push(file);
		this.setState({
			fileList: [...fileList],
			uploading: false,
		});
	}

	onError = (err) => {
		window.console.error('onError', err);
	}

	// 下载文件
	handleDownload = (file) => {
		window.console.log(file);
	}

	// 删除文件
	handleDelete = (file) => {
		const { fileList } = this.state;
		const { fileId } = file;
		const index = fileList.findIndex(file => {
			return file.fileId === fileId;
		});
		fileList.splice(index, 1);
		this.setState({
			fileList: [...fileList],
		});
	}

	uploadProps = {
    action: 'http://localhost:8888/api/upload/',
		beforeUpload: this.beforeUpload,
		onStart: this.onStart,
		onProgress: this.onProgress,
		onSuccess: this.onSuccess,
		onError: this.onError,
  };

  render() {
		const { fileList, uploading } = this.state;
		const { maxFile, children, ...props } = this.props;
    return (
			<div>
				{ fileList.length > 0 &&
					fileList.map((file, index) => {
						window.console.log(file);
						return (
							<div key={index} className={styles.file}>
								<span className={styles.fileIcon}><Icon type="file" /></span>
								{file.filename}
								<div className={styles.actions}>
									<span
										className={styles.actionIcon}
										onClick={() => {this.handleDownload(file)}}
									>
										<Icon type="download" />
									</span>
									<span
										className={styles.actionIcon}
										onClick={() => {this.handleDelete(file)}}
									>
										<Icon type="delete" />
									</span>
								</div>
							</div>
						)
					})
				}
        { 
					fileList.length < maxFile && 
					<FileUpload {...this.uploadProps} {...props}>
						{
							typeof children === 'function' ? children(uploading) : children
						}
					</FileUpload>
				}
      </div>
    );
  }
}

export default Upload;


