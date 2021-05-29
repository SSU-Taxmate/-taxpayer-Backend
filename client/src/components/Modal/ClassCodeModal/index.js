import React, { Component } from 'react'
import $ from 'jquery'
import ClipboardJS from 'clipboard';
export default class ClassCodeModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            icon: this.props.icon ? this.props.icon : 'fas fa-smile'
        }
    }
    componentDidMount() {
        $(document).ready(function () {
            new ClipboardJS('.btn');
        });
    }
    render() {
        return (
            <>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target={`#${this.state.id}Modal`}>
                    <i class={this.state.icon}></i>
                </a>
                <div class="modal fade" id={`${this.state.id}Modal`} tabindex="-1" role="dialog" aria-labelledby={`#${this.state.id}ModalLabel`}
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content p-4" >
                            <img src="https://assets.tvo.org/prod/s3fs-public/styles/full_width_1280/public/article-thumbnails/kids%20in%20classroom.JPG?KgEyQTBORydSiHj.xIj8ROjMdJvgPW4r&itok=G4OLcZhp"
                            />

                            <div class="modal-header">
                                <div class="modal-code" id="DisplayCodeModal" > Class : 꿈나무</div>
                            </div>
                            <div class="form-inline">
                                <div class="form-group mb-2">
                                    <strong>참가코드: </strong>
                                </div>
                                <div class="form-group mx-sm-1 mb-2">
                                    <label for="CopyCode" class="sr-only" >참가코드</label>
                                    <input type="text" id="CopyCode" class="form-control" placeholder="Invite Code" />
                                    <button type="button" class="btn btn-info btn-clipboard" data-clipboard-action="copy" data-clipboard-target="#CopyCode">Copy</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
