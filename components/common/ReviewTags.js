import React from 'react'
import { Camera, PhotoCameraSharp, PhotoCameraTwoTone, PhotoCamera, Add, Remove, Close, AddCircleOutlineOutlined, AddCircleRounded, CancelRounded, CheckCircleOutlineRounded } from "@material-ui/icons";
export default function ReviewTags(props) {
    const { showInput, showInputField, tags } = props
    return (
        <div style={{
            marginTop: "10px",
        }}>
            {tags.map(rec => <React.Fragment><div style={{
                display: "inline",
                backgroundColor: "#F9867E",
                height: "24px",
                fontSize: "13px",
                color: "white",
                borderRadius: "15px",
                padding: "5px",
            }}>
                {rec.name} <span style={{ marginLeft: "5px" }}>X</span>
            </div>
            
            </React.Fragment>
            )}
            {!showInput && < div
                style={{

                    marginTop: "10px",
                    display: "inline",
                    marginLeft: "10px",

                }}
            >
                <span
                    onClick={showInputField}
                    style={{
                        width: "30px",
                        height: "30px",
                        verticalAlign: "top",
                    }}>
                    <AddCircleRounded />
                </span>
            </div>}
            {showInput && <React.Fragment><input type="text"
                style={{
                    border: "1px solid #F9867E",
                    height: "24px",
                    fontSize: "13px",
                    width: "57px",
                    borderRadius: "15px",
                    padding: "5px",
                }}
            /> <div style={{
                display: "inline",
                marginTop: "20px",
                verticalAlign: "top",
            }}>
                    <CheckCircleOutlineRounded />
                    <CancelRounded />
                </div>
            </React.Fragment>}
        </div>
    )
}