import React, { Component } from "react";
import PropTypes from 'prop-types';
import FileUpload from 'rc-upload';
import { Icon, message } from 'antd';
import styles from "../css/index.less";

const kb2mb = (kb) => {
	return parseInt(kb / 1024 / 1000);
}

const mb2kb = (mb) => {
	return parseInt(1024 * 1000 * mb);
}

class Upload extends Component {

	static propTypes = {
		maxSize: PropTypes.number,
		maxFile: PropTypes.number,
		defaultValue: PropTypes.array,
		onChange: PropTypes.func,
  };
  
  static defaultProps = {
		action: 'http://localhost:8888/api/upload/',
		prefixCls: 'hcm-upload',
		maxSize: mb2kb(2), // 文件上限大小
		maxFile: 2, // 最大上传个数
		defaultValue: [], // 默认文件
		onChange: () => {}, // 文件变化回调函数
	}

	state = {
    uploading: false, // 上传状态
    uploadedFiles: this.props.defaultValue, // 已经上传的文件列表
  };

	beforeUpload = (file, fileList) => {
		const { uploadedFiles } = this.state;
		const { maxSize, maxFile } = this.props;
		const { size } = file;
		// 检查文件数量
		if (fileList.length + uploadedFiles.length > maxFile) {
			return false;
		}
		// 检查文件体积
		if (size > maxSize) {
			message.error(`文件大小不能大于${kb2mb(maxSize)}M`);
			return false;
		}
	}

	onStart = (file) => {
		this.setState({ uploading: true });
	}

	onProgress = (step, file) => {
		// window.console.log(step, file);
	}

	onSuccess = (file) => {
		const { uploadedFiles } = this.state;
		const { onChange } = this.props;
		uploadedFiles.push(file);
		this.setState({
			uploadedFiles: [...uploadedFiles],
			uploading: false,
		});
		onChange(uploadedFiles);
	}

	onError = (err) => {
		this.setState({ uploading: false });
		message.error('onError', err);
	}

	// 下载文件
	handleDownload = (file) => {
		window.console.log(file);
	}

	// 删除文件
	handleDelete = (file) => {
		const { uploadedFiles } = this.state;
		const { onChange } = this.props;
		const { fileId } = file;
		const index = uploadedFiles.findIndex(file => {
			return file.fileId === fileId;
		});
		uploadedFiles.splice(index, 1);
		this.setState({
			uploadedFiles: [...uploadedFiles],
		});
		onChange(uploadedFiles);
	}

	uploadCallbacks = {
		beforeUpload: this.beforeUpload,
		onStart: this.onStart,
		onProgress: this.onProgress,
		onSuccess: this.onSuccess,
		onError: this.onError,
	}

  render() {
		const { uploadedFiles, uploading } = this.state;
		const { maxFile, children, ...props } = this.props;
    return (
			<div>
				{ uploadedFiles.length > 0 &&
					uploadedFiles.map((file, index) => {
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
					uploadedFiles.length < maxFile && 
					<FileUpload
						{...props}
						{...this.uploadCallbacks}
					>
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
