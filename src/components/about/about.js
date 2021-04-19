import React, { Component } from 'react'

function iframe() {
    return {
        __html: '<iframe src="./Folder/File.html" width="540" height="450"></iframe>'
    }
}

export class about extends Component {
    render() {
        return (
            <div>
                <h1>about</h1>
                __html: '<div src="./Folder/File.html" width="540" height="450"></div>'
            </div>
        )
    }
}

export default about
